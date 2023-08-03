<template>
  <DefaultLayout>
    <div id="home-page-container">
      <div>
        <div>Valor de minPricex: {{ minPrice }}</div>
        <div>Valor de maxPricezx: {{ maxPrice }}</div>
      </div>
      <AppFilter />
      <div id="container_map_active">
        <div class="half">
          <CardsList :show_featured_card="false" />
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
    maxPrice() {
      return this.$store.state.maxPrice;
    }
  },
  mounted() {


    const centerOfIlhabela = [-23.7787, -45.3581];
    const app_map = L.map('map').setView(centerOfIlhabela, 12);
    // const startIndex = Math.floor(Math.random() * (data.length - 20 + 1));
    // const endIndex = startIndex + 20;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(app_map);

    const markers = L.markerClusterGroup();

    const myIcon = L.icon({
      iconUrl: 'icons8-home-144.svg', // Replace this with the path to your SVG file
      iconSize: [38, 38], // Icon size
      iconAnchor: [22, 22], // The point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // The point from which the popup should open relative to the iconAnchor
    });

    this.items = data
      .map((house) => {

        const location = house["point"];

        if (location) {
          const lat_lon = [location['lat'], location['lon']];
          const marker = L.marker(lat_lon, { icon: myIcon }); // Use o seu ícone personalizado


          markers.addLayer(marker);
        }
      });

    app_map.addLayer(markers);




  }
};
</script>

<style scoped>
#map {
  position: -webkit-sticky;
  position: sticky;
  top: 10%;
  right: 1em;
  display: flex;
  height: 60vh;
  width: 25%;
  background-color: rgb(185, 185, 185);
  border-radius: 1em;
  margin-top: 1em;
}

.half {
  width: 75%;
}

* {
  user-select: none;
}

#container_map_active {
  display: flex;
  flex-direction: row;
}

#home-page-container {
  justify-content: center;
}

.price-display {
  margin-top: 21px;
}
</style>