<template>
  <DefaultLayout>
    <div :class="[activeMap ? 'bg-no-map' : 'bg-map']" id="home-page-container">
      <div id="slider-home" v-show="!activeMap">
        <!-- <div class="separator"></div> -->

        <!-- <div class="slider-title2">Ouse Sonhar</div> -->
        <!-- <div class="slider-title1">Nidus Real Estate</div> -->
        <!-- <button class="btn"> VENHA FAZER PARTE</button> -->
      </div>

      <AppFilter v-show="!activeMap" />

      <div id="container-cardlist-and-map">
        <div class="card-list-container" :class="{ 'half-width': activeMap }">


          <div :class="{ 'top-avoider': activeMap }">
            <AppFilter v-show="activeMap" />
            <CardsListSpecial v-if="activeMap" :show_featured_card="false" />
            <CardsList v-else />
          </div>
        </div>

        <div v-show="activeMap" id="map-home-page"></div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import CardsListSpecial from '@/components/CardsListSpecial.vue';
import CardsList from '@/components/CardsList.vue';
import AppFilter from '@/components/AppFilter.vue';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { mapState, mapActions } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

import data from '@/data.json';

import { h, render } from 'vue';
import PopupComponent from '@/components/MapCard.vue'; // Seu componente



export default {
  data() {
    return {
      app_map: null,
      isExtraFiltersVisible: true,
      mapReady: false,
      VisibleMarkers: [],
      visibleData: []
    };
  },
  computed: {
    ...mapState(['activeMap'])
  },
  methods: {
    ...mapActions(['setVisibleMarkersData']), // mapeando a action
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
    renderVueComponentToString(component, propsData) {
      const container = document.createElement('div');
      const vnode = h(component, propsData);
      render(vnode, container);
      return container.innerHTML;
    },
    createCustomIcon(price) {
      return L.divIcon({
        className: 'custom-icon',
        html: `
            <div class="marker-price-label">R$ ${this.formatPrice(price)[0]} ${this.formatPrice(price)[1]}</div>
            <img src="/houseicon.svg" width="28" height="38" />
        `,
        iconSize: [28, 38],
        iconAnchor: [14, 38], // metade da largura e altura total para centralizar
        popupAnchor: [0, -38] // alinha o popup na parte superior do ícone
      });
    },
    fixMediaInfo(media_info) {
      const media = media_info.map(
        media => media.url
          .replace("{action}", "fit-in")
          .replace("{width}", "870")
          .replace("{height}", "653")
      )
        .filter(url => !url.includes('youtube') && !url.includes('youtu'));

      return media[0];
    },
    fixAddressInfo(street, streetNumber, neighborhood) {
      streetNumber = streetNumber === null || streetNumber === undefined || streetNumber === "" ? "s/n" : streetNumber;
      street = street === null || street === undefined || street === "" ? "Sem Endereço" : street.replace("Avenida", "Av.").replace("Alameda", "Al.");
      neighborhood = neighborhood === null || neighborhood === undefined || neighborhood === "" ? "Sem Endereço" : neighborhood;
      return [street, streetNumber, neighborhood]
    },

    initMap() {
      console.log("Starting Map...")
      if (!this.mapReady) {
        const centerOfIlhabela = [-23.7787, -45.3581];
        this.app_map = L.map('map-home-page', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true }).setView(centerOfIlhabela, 12);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiem93eWUiLCJhIjoiY2xqeDAwM2F5MDFoMDNlcGx3c2RqZ3ZldyJ9.BgqylKNWVF6Io-dSx4o54Q', {
          maxZoom: 19
        }).addTo(this.app_map);
        this.mapReady = true;

        this.app_map.invalidateSize();

        const markers = L.markerClusterGroup();

        let uniqueData = Object.values(data.reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {}));

        // For each one of the houses, do it...
        uniqueData.forEach((house) => {
          const location = house["point"];
          if (location) {
            const lat_lon = [location['lat'], location['lon']];
            const customIcon = this.createCustomIcon(house.pricingInfos[0]['price']);
            const marker = L.marker(lat_lon, { icon: customIcon });

            // Função para mostrar o popup
            const displayPopup = () => {
              const propsForPopup = {
                house: house,
              };

              const popupContent = this.renderVueComponentToString(PopupComponent, propsForPopup);
              marker.bindPopup(popupContent).openPopup();
              this.app_map.setView(lat_lon, this.app_map.getZoom());

            };


            marker.on('click', displayPopup);

            // Reconfigure o ouvinte de clique quando o popup for fechado
            marker.on('popupclose', () => {
              marker.off('click', displayPopup); // Remova o ouvinte de clique anterior
              marker.on('click', displayPopup);  // Reconfigure o ouvinte de clique
            });

            this.VisibleMarkers.push({
              marker: marker,
              data: house
            });

            markers.addLayer(marker);
          }
        });

        this.app_map.addLayer(markers);

        // Get the initial visible markers data
        const initialVisibleData = this.getVisibleMarkersData();
        this.setVisibleMarkersData(initialVisibleData);

        // Everytime user moves the map, the Listener to get visible markers is called...
        this.app_map.on('moveend', () => {
          const visibleData = this.getVisibleMarkersData();
          this.setVisibleMarkersData(visibleData);
        });
      }
    },
    getVisibleMarkersData() {
      const bounds = this.app_map.getBounds();
      console.log()
      return this.VisibleMarkers.filter(m => bounds.contains(m.marker.getLatLng())).map(m => m.data);
    },
    toggleExtraFilters() {
      this.isExtraFiltersVisible = !this.isExtraFiltersVisible;
    }
  },
  components: {
    DefaultLayout,
    CardsListSpecial,
    CardsList,
    AppFilter
  },
  watch: {
    activeMap(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          // Certifique-se de que o elemento com id 'map' existe
          if (document.getElementById('map-home-page')) {

            this.initMap();
          }
        });
      }



    }
  },
  mounted() {
    if (this.activeMap && !this.mapReady) {
      this.initMap();
    }
  },
  beforeUnmount() {
    if (this.app_map) {
      this.app_map.remove();
    }
  }

};
</script>

<style scoped>
.top-avoider {
  margin-top: 0em;
}

::v-deep .marker-price-label {
  color: white;
  background-color: black;
  white-space: nowrap;
  display: inline-block;
  font-weight: 300;
  border-radius: 1em;
  padding: 0.2em 0.5em;
}


::v-deep .small-media-popup-marker img {
  max-width: 15em;
  border-radius: 0.5em;
  max-height: 15em;
  height: auto;
  margin-right: 10px;
}

::v-deep .btn-marker-pop {
  background-color: white;
  color: var(--cor-base);
  border: 1px solid var(--cor-base);
  text-decoration: none;
  border-radius: 0.5em;
  padding: 0.5em 0.5em;
}


::v-deep .marker-info-container {
  display: flex;
  min-height: max-content;
  flex-direction: column;
  justify-content: space-around;
}

::v-deep .marker-address {
  font-size: 1em;
  white-space: break-spaces;
  font-weight: 300;
}

::v-deep .leaflet-popup-content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
  border-radius: 0;
  background: none;
  box-shadow: none;
}

::v-deep .leaflet-popup-content {
  min-width: max-content;
  white-space: nowrap;
  padding: 0em;
}

::v-deep .neigh {
  display: inline-block;
  font-weight: 200;
  margin-bottom: 0.5em;
  padding: 0.35em 0.85em;
  color: white;
  border-radius: 1.5em;
  font-size: 0.90em;
  background-color: var(--cor-base);
}

::v-deep .flex-row {
  display: flex;
  flex-direction: row;
}

::v-deep #title {
  font-size: 2em;
  font-weight: 700;
  bottom: 0;
  left: 0;
  z-index: 2;
  color: black;
  background: transparent;
  margin-top: -0.3em;
}

#container-cardlist-and-map {
  width: 100%;
  display: flex;
  flex-direction: row;
}


#map-home-page {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  right: 0;
  width: 50%;
  height: 100vh;
  background-color: rgb(185, 185, 185);
  border-radius: 0.6em 0.6em 0.6em 0.6em;
}

.card-list-container {
  width: 100%;
  display: block;
}

.half-width {
  width: 50%;
}

/* CardsList { */
/* display: block; */
/* This allows it to take up the remaining space */
/* } */


* {
  user-select: none;
}

#slider-home {
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-top: 8em;
  justify-content: end;
  height: 4em;
}

.separator {
  margin-top: 1em;
  height: 0.5em;
  width: 4em;
  background-color: white;
}

.slider-title1 {
  color: rgb(0, 0, 0);
  text-shadow: 0px 9px 22px rgba(0, 0, 0, 0.65);
  font-family: 'Poiret One', cursive;
  font-size: 3em;
}

.slider-title2 {
  text-shadow: 0px 9px 32px rgba(0, 0, 0, 0.45);
  font-family: 'The Nautigal', cursive;
  font-size: 6em;
  color: white;
}

.btn {
  width: 18em;
  cursor: pointer;
  color: black;
  border-radius: 0.2em;
  border: none;
  background-color: white;
  padding: 1.5em 3.5em;
  transition: all 200ms;
}

.btn:hover {
  background-color: var(--cor-base);
  color: white;
}

#home-page-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* Sem o background-image */
.bg-map::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 25em;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}

/* Com o background-image */
.bg-map::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 25em;
  z-index: -1;
  background-image: var(--bg-theme);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}

/* #main_wrapper {
  display: flex;
  background-color: red;
  flex-direction: row;
  width: 100%;
} */

#extra_filters {
  background-color: antiquewhite;
  border-radius: 0.5em;
  width: 20%;
  flex: 0 0 20%;
  /* Flex grow, flex shrink, flex-basis */
}
</style>
