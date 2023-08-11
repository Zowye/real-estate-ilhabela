<template>
  <div class="popup-content">
    <div id="image_container_map_card">
      <img :src="processedMediaUrls[0]" alt="Descrição da imagem">
    </div>
    <div id="info_container_map_card">
      <h2>Casa no {{ localHouse.neighborhood }}</h2>

      <div class="house_infos">
        <ul>
          <li>
            <div><b>Área</b></div>
            <div>120m²</div>
          </li>
          <li>
            <div><b>Vagas</b></div>
            <div>2</div>
          </li>
          <li>
            <div><b>Quartos</b></div>
            <div>3</div>
          </li>
        </ul>

        <div class="map_card_price">R$ {{ formatedPrice[0] }} {{ formatedPrice[1] }}</div>
      </div>
      <div class="address_card">
        <IconPin :color_icon="['#bb1111', 'white']" />
        <p>Lorem Ipsum, 1245, Porto Grande</p>
      </div>
      <button class="btn-check-more">VER MAIS</button>
    </div>

  </div>
</template>

<script>

import IconPin from "@/components/icons/IconPin.vue";
export default {
  methods: {
    formatPrice(price) {
      const suffixes = ["", "mil", "milhão", "milhões", "bilhão", "bilhões", "trilhão", "trilhões"]; // Sufixos para unidades, milhares, milhões, bilhões, trilhões
      let index = 0;

      while (price >= 1000 && index < suffixes.length - 1) {
        price /= 1000;
        index++;
      }

      const formattedPrice = price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
      const suffix = index > 1 && price >= 2 ? suffixes[index].replace("hão", "hões") : suffixes[index];

      return [formattedPrice, suffix];
    },
  },
  components: {
    IconPin,
  },
  props: ['house'],
  data() {
    return {
      localHouse: this.house
    };
  },
  computed: {
    formatedPrice() {
      return this.formatPrice(this.localHouse['pricingInfos'][0]['price'])
    },
    processedMediaUrls() {
      return this.localHouse.medias.map(
        media => media.url
          .replace("{action}", "fit-in")
          .replace("{width}", "870")
          .replace("{height}", "653")
      ).filter(url => !url.includes('youtube') && !url.includes('youtu'))
    }
  }
}
</script>


<style scoped>
.popup-content {
  background-color: rgb(255, 255, 255);
  border-radius: 1em;
  display: flex;
  flex-direction: row;
  height: 20em;
}

.address_card {
  display: flex;
  /* margin-top: 0em; */
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

#image_container_map_card,
#info_container_map_card {
  flex: 1;
  /* Makes each container take up equal space */
  box-sizing: border-box;
}

#image_container_map_card {
  margin-right: 1em;

}

#image_container_map_card img {
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  width: 20em;
  object-fit: cover;
  height: 20em;
}

#info_container_map_card {
  padding: 1em;
}

.house_infos ul {
  align-items: start;
  list-style: none;
  display: flex;
  gap: 1em;
  margin-top: 1em;
  margin-left: 0;
  padding-left: 0;
}

.house_infos li {
  background-color: rgba(242, 242, 242, 0.839);
  padding: 0.5em 1em;
  border-radius: 0.5em;
  /* Cantos arredondados */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.02);
  color: rgb(0, 0, 0);
  font-weight: 500;
  transition: all 0.3s;
  justify-content: center;
  align-items: center;
}

.house_infos li:hover {
  background-color: #ececec;
}

.map_card_price {
  font-weight: 600;
  color: black;
  font-size: 1.5em;
}


.btn-check-more {
  width: 100%;
  cursor: pointer;
  color: white;
  border-radius: 0.2em;
  border: none;
  background-color: var(--cor-base);
  padding: 0.75em;
  transition: all 200ms;
}

.btn-check-more:hover {
  color: black;
  background-color: #ececec;
}
</style>