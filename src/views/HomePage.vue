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
          <CardsList />
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


export default {
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
    },
  },
  mounted() {
    const centerOfIlhabela = [-23.7787, -45.3581];
    const map = L.map('map').setView(centerOfIlhabela, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    const markers = L.markerClusterGroup();

    const myIcon = L.icon({
      iconUrl: 'icons8-home-144.svg', // Replace this with the path to your SVG file
      iconSize: [38, 38], // Icon size
      iconAnchor: [22, 22], // The point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // The point from which the popup should open relative to the iconAnchor
    });

    fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(data => {
                data = data.slice(20, 40);

                data.map((item) => {
                    try {

                        const lat = item['point']['lat'];
                        const lon = item['point']['lon'];

                        const location = [lat, lon]

                        console.log(">>>>> ", location);

                        const marker = L.marker(location, { icon: myIcon }); // Use o seu ícone personalizado

                        marker.on('click', function () {
                            L.Routing.control({
                                waypoints: [
                                    L.latLng(location),
                                    L.latLng(centerOfIlhabela)
                                ],
                                router: new L.Routing.osrmv1({
                                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                                }),
                                routeWhileDragging: true
                            }).addTo(map);
                        });

                        markers.addLayer(marker);





                        // card.addEventListener('click', function () {
                        //     // Obtenha as coordenadas do card

                        //     // Atualize a vista do mapa para as coordenadas do card
                        //     map.setView(location, 20);
                        // });




                    } catch (e) {
                        console.log(e)
                    }

                });
            })
            .catch(function () {
                console.log("An error occurred while fetching the JSON data.");
            });

  },

};
</script>

<style>
#map {
  position: -webkit-sticky;
  position: sticky;
  top: 10%;
  right: 1em;
  display: flex;
  height: 60vh;
  width: 40%;
  background-color: rgb(185, 185, 185);
  border-radius: 1em;
}

.half {
  width: 60%;
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