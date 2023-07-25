<template>
  <DefaultLayout>
    <div id="home-page-container">
      <CardFeatured :featured_data="card_featured" />
      <!-- <h2>Bem-vindo</h2> -->
      <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis necessitatibus commodi alias?</p> -->
      <div class="card-list">
        <!-- Loop pelos dados do arquivo data.json -->
        <div v-for="card in items" :key="card.id" class="card">
          <CardPhotoViewer :images="card.card_images" :status_level="card.status_level" />
          <div class="cardInfos">
            <CardStars :rating="card.stars_count" />
            <div class="card_title">{{ card.title }}</div>
            <div id="topInfos" class="inner_cardcard_padding">
              <IconPin :width="16" :height="16" />
              <div class="card_address"> {{ card.street }}, {{ card.streetNumber }} <div class="neigh">{{
                card.neighborhood }}</div>
              </div>
            </div>


            <div id="bottomInfos" class="inner_card_padding">

              <CardCommonInfo />

              <p><span class="monetary"><span class="currency_name">R$</span> </span><span
                  class="monetary_value_number">{{ card.formattedPrice }}</span>
                <span class="monetary_value_string">{{ card.suffix }}</span>
              </p>
              <!-- <p class="description">{{ card.description }}</p> -->

              <div class="button-group">

                <!-- <button class="ver-mais-button">Ver Mais</button> -->
                <!-- <a href="#" class="whatsapp-button">
                    <i class="fab fa-whatsapp"></i>
                  </a> -->
              </div>
              <!-- <CardAmenities :amenities="card.amenities" /> -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardPhotoViewer from '@/components/CardPhotoViewer.vue';
// import CardAmenities from '@/components/CardAmenities.vue';
import CardCommonInfo from '@/components/CardCommonInfo.vue';
import IconPin from "@/components/icons/IconPin.vue";
import CardStars from "@/components/CardStars.vue";

import data from '@/data.json';

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


    gerarTituloAleatorio() {
      const string1 = ["Luxuosa", "Linda", "Aconchegante", "Belíssimo", "Confortável", "Novíssimo", "Luxuosa"];
      const string2 = ["Flat", "Casa", "Sítio", "Apartamento"];
      const randomIndex1 = Math.floor(Math.random() * string1.length);
      const randomIndex2 = Math.floor(Math.random() * string2.length);
      const randomString1 = string1[randomIndex1];
      const randomString2 = string2[randomIndex2];
      return `${randomString1} ${randomString2}`;
    },
    getRandomStatusLevel() {
      const string1 = ["Antigo", "Em Alta", "Novo"];
      const randomIndex1 = Math.floor(Math.random() * string1.length);
      const randomString1 = string1[randomIndex1];
      return `${randomString1}`;
    }


  },
  components: {
    DefaultLayout,
    CardPhotoViewer,
    CardFeatured,
    CardCommonInfo,
    IconPin,
    CardStars
  },
  data() {
    return {
      items: [],
      card_featured: {
        medias: [], // lista de strings
        price: '', // string
        description: '' // string
      }
    };
  },
  created() {
    // Defining Card Featured:
    // const FEATURED_INDEX = 15;
    // this.card_featured.medias = data[FEATURED_INDEX].medias;
    // this.card_featured.price = data[FEATURED_INDEX].pricingInfos[0].price;
    // this.card_featured.description = data[FEATURED_INDEX].description;


    const startIndex = Math.floor(Math.random() * (data.length - 20 + 1));
    const endIndex = startIndex + 20;


    this.items = data
      .slice(startIndex, endIndex)
      .map(item => {

        const card_images = item.medias.map(
          media => media.url
            .replace("{action}", "fit-in")
            .replace("{width}", "870")
            .replace("{height}", "653")
        )
          .filter(url => !url.includes('youtube') && !url.includes('youtu'));

        // Fixing Pricing Information
        let [formattedPrice, suffix] = this.formatPrice(item.pricingInfos[0].price)
        item.formattedPrice = formattedPrice;
        item.suffix = suffix;


        item.status_level = this.getRandomStatusLevel();


        // Fixing amenities items
        item.amenities = item.amenities.map((a) => {
          return a.replace("_", " ")
        })

        if (item && item.amenities && item.amenities.length > 0 && item.amenities.length > 8) {
          item.amenities = item.amenities.slice(0, 7);
          item.amenities.push("... VER MAIS")
        } else {
          item.amenities = ["Sem Itens"]
        }


        item.stars_count = Math.floor(Math.random() * 11);


        item.title = this.gerarTituloAleatorio();
        item.streetNumber = item.streetNumber === null || item.streetNumber === undefined || item.streetNumber === "" ? "s/n" : item.streetNumber;
        item.street = item.street === null || item.street === undefined || item.street === "" ? "Sem Endereço" : item.street.replace("Avenida", "Av.").replace("Alameda", "Al.");
        item.neighborhood = item.neighborhood === null || item.neighborhood === undefined || item.neighborhood === "" ? "Sem Endereço" : item.neighborhood;

        // Fixing the mal-formation of the description, e.g: uppercase, \n, etc 
        item.description = item.description
          ? item.description
            .replace(/\n/g, "")
            .replace(/<\/?br\/?>/g, "")
            .replace(/<?b\/?>/g, "")
            .toLowerCase()
            .replace(/(^|[.!?]\s+)(\w)/g, function (match, p1, p2) {
              return p1 + p2.toUpperCase();
            })
            .replace(/([.!?]\s+)(\p{Ll})/gu, function (match, p1, p2) {
              return p1 + p2.toUpperCase();
            })
            .replace(/!+/g, "!")

          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, iste obcaecati.";


        if (item.description.length > 120) {
          item.description_full = item.description;
          item.description = item.description.slice(0, 120) + " (...) "
        }
        item.price = item.pricingInfos[0].price

        return { ...item, card_images: card_images };
      });



    const most_expansive_house = this.items.reduce((prev, current) => {
      const prevPrice = parseFloat(prev.price);
      const currentPrice = parseFloat(current.price);
      return (currentPrice > prevPrice) ? current : prev;
    }, this.items[0]);




    this.card_featured = most_expansive_house;
  }
};
</script>

<style>

*{
  user-select: none ;
}
#home-page-container {
  margin-top: 100px;
  justify-content: center;
}



/* Estilos para os cards */
.card-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  cursor: pointer;
  position: relative;
  background-color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
  margin: 20px;
  width: 400px;
  border-radius: 1.2em;
  overflow: hidden;
}



.card img {
  width: 100%;
  border-radius: 1.2em;
  height: 250px;
  background: linear-gradient(rgba(235, 46, 46, 0), rgba(255, 255, 255, 0.4));
  object-fit: cover;
}


.cardInfos {
  display: flex;
  flex-direction: column;
  padding: 1.4em;
}



#topInfos {
  justify-content: flex-start;
  align-items: center;
  display: flex;
  /* border-bottom-left-radius: 0.8em;
    border-bottom-right-radius: 0.8em; */

}

#bottomInfos {
  background-color: white;
}

.card_title {
  font-family: var(--font-text);
  color: var(--cor-text-base);
  line-height: 1em;
  margin-bottom: 0.7em;
  font-weight: 600;
  font-size: 1.35em;
}


.card_address {
  font-family: var(--font-text);
  line-height: 1em;
  font-size: 0.95em;
  color: var(--cor-text-subbase);
  font-weight: 100;
  margin-left: 0.55em;
  font-weight: 400;
}

.bold {
  font-weight: 500;
}

.neigh {
  font-weight: 600;
  margin-top: 0.2em;
}


.monetary,
.monetary_value_number,
.monetary_value_string {
  font-family: var(--font-text);
  font-size: 1.4em;
  font-weight: 700;
}

.monetary_value_string {
  margin-left: 3px;

}

.currency_name {
  margin-right: 0.2em;
  font-weight: 300;
  font-size: 0.6em;
}


.description {
  font-family: 'Ysabeau Office', sans-serif;
  font-size: 1.2em;
}

.button-group {
  display: flex;
  margin-bottom: 1em;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.ver-mais-button {
  flex-grow: 1;
  background-color: var(--cor-pastel);
  color: var(--cor-fonte);
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-right: 10px;
  font-size: 1em;
  cursor: pointer;
}

.whatsapp-button {
  display: inline-block;
  width: 23px;
  height: 23px;
  color: #44d579;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.3em;
}
</style>
