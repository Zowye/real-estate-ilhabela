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
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardsListSpecial from '@/components/CardsListSpecial.vue';
import CardsList from '@/components/CardsList.vue';
import AppFilter from '@/components/AppFilter.vue';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import { mapState, mapActions } from 'vuex';

import data from '@/data.json';


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

    initMap() {
      if (!this.mapReady) {
        const centerOfIlhabela = [-23.7787, -45.3581];
        this.app_map = L.map('map-home-page', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true }).setView(centerOfIlhabela, 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(this.app_map);
        this.mapReady = true;

        this.app_map.invalidateSize();

        const markers = L.markerClusterGroup();
        const myIcon = L.icon({
          iconUrl: "/houseicon.svg",
          iconSize: [28, 38],
          iconAnchor: [22, 22],
          popupAnchor: [-3, -76]
        });

        let uniqueData = Object.values(data.reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {}));

        this.items = uniqueData.forEach((house) => {
          const location = house["point"];
          if (location) {
            const lat_lon = [location['lat'], location['lon']];
            const marker = L.marker(lat_lon, { icon: myIcon });
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



            // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //   maxZoom: 19
            // }).addTo(this.app_map);

            // const markers = L.markerClusterGroup();

            // const myIcon = L.icon({
            //   iconUrl: "/houseicon.svg", // Replace this with the path to your SVG file
            //   iconSize: [28, 38], // Icon size
            //   iconAnchor: [22, 22], // The point of the icon which will correspond to marker's location
            //   popupAnchor: [-3, -76] // The point from which the popup should open relative to the iconAnchor
            // });


            // let uniqueData = Object.values(data.reduce((acc, cur) => {
            //   acc[cur.id] = cur;
            //   return acc;
            // }, {}));

            // this.items = uniqueData.forEach((house) => {
            //   const location = house["point"];
            //   if (location) {
            //     const lat_lon = [location['lat'], location['lon']];
            //     const marker = L.marker(lat_lon, { icon: myIcon });
            //     this.VisibleMarkers.push({
            //       marker: marker,
            //       data: house
            //     });
            //     markers.addLayer(marker);
            //   }
            // });

            // this.app_map.addLayer(markers);


          }
        });
      }



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
  margin-top: 4em;
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
