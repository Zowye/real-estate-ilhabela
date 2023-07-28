<template>
  <DefaultLayout>
    <div id="home-page-container">
      <div>
        <div>Valor de minPricex: {{ minPrice }}</div>
        <!-- <div>SelectedHouse: {{ selected_house.price }}</div> -->
      </div>
      <AppFilter />
      <div id="container_map_active">
        <div class="half">
          <CardsList :show_featured_card="false" :cardWidth="'300px'" />

        </div>
        <div id="map">
        </div>
      </div>

      <AppFilter />
    </div>

  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardsList from '@/components/CardsList.vue';
import AppFilter from '@/components/AppFilter.vue';
import L from 'leaflet';

// Import MarkerCluster styles and the library
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import data from '@/data.json';

export default {
  data() {
    return {
      app_map: null,
      items: [],
    }
  },
  components: {
    DefaultLayout,
    CardsList,
    AppFilter
  },
  computed: {
    minPrice() {
      return this.$store.state.minPrice;
    },
    selected_house() {
      return this.$store.state.house_info;
    }
  },
  watch: {
    selected_house(newVal) {

      console.log("newVal", newVal)
      // certificando-se de que newVal e newVal.point existem
      if (newVal && newVal.point) {
        console.log("newVal is gettinggg...", newVal)
        const location = newVal.point;

        // se a nova casa selecionada tiver uma localização, desloque o mapa para essa localização
        if (location) {
          const new_loc = [location.lat, location.lon];
          this.app_map.flyTo(new_loc, 18);
        }
      }
    }
  },
  methods: {
    initMap() {
      if (!this.mapReady) { // só inicializa o mapa se ele ainda não estiver pronto
        const centerOfIlhabela = [-23.7787, -45.3581];
        this.app_map = L.map('map').setView(centerOfIlhabela, 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(this.app_map);
        this.mapReady = true; // sinaliza que o mapa está pronto
      }
    }
  },
  mounted() {


    this.initMap();


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.app_map);

    const markers = L.markerClusterGroup();

    const myIcon = L.icon({
      iconUrl: "/houseicon.svg", // Replace this with the path to your SVG file
      iconSize: [28, 38], // Icon size
      iconAnchor: [22, 22], // The point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // The point from which the popup should open relative to the iconAnchor
    });


    let uniqueData = Object.values(data.reduce((acc, cur) => {
      acc[cur.id] = cur;
      return acc;
    }, {}));

    this.items = uniqueData
      .forEach((house) => {

        const location = house["point"];

        if (location) {
          const lat_lon = [location['lat'], location['lon']];
          const marker = L.marker(lat_lon, { icon: myIcon }); // Use o seu ícone personalizado


          markers.addLayer(marker);
        }
      });

      this.app_map.addLayer(markers);




  }
};
</script>

<style scoped>
#map {
  position: -webkit-sticky;
  position: sticky;
  top: 1%;
  right: 0;
  display: flex;
  height: 98vh;
  width: 50%;
  background-color: rgb(185, 185, 185);
  border-radius: 1em 0em 0em 1em;
  margin-top: 1em;
}

.half {
  width: 50%;
}

* {
  user-select: none;
}

#container_map_active {
  display: flex;
  flex-direction: row;
}

#home-page-container {
  margin-top: 100px;
  justify-content: center;
}

.price-display {
  margin-top: 21px;
}
</style>