
<template>
  <DefaultLayout>
    <div id="register-container">

      <div class="registration-form">
        <h2>Cadastro de Propriedade</h2>
        <div class="form-group">
          <label for="property-address">
            <span>
              <IconPin :color_icon="['#ee0000', 'white']" />
            </span>
            <span>Endereço:</span>
          </label>
          <input type="search" placeholder="Insira seu endereço" aria-label="Search" aria-describedby="button-addon2"
            ref="addressInput" for="property-address">
        </div>

        <div id="map-register-property"></div>

        <div id="upload-images-wrapper">
          <button @click="triggerFileInput">Carregar Fotos</button>
          <input class="hiddenFileInput" type="file" ref="fileInput" accept="image/*" multiple @change="handleFiles">

          <div class="upload-container">
            <div v-for="(file, index) in files" :key="index" class="image-preview">
              <img :src="file.url" alt="Uploaded Image" class="thumbnail">
              <input type="text" v-model="file.description" placeholder="Adicione uma descrição">
              <button class="remove-photo-button" @click="removeFile(index)">Remover</button>
            </div>
          </div>
        </div>

        <div v-if="address.street">
          <strong>Rua:</strong> {{ address.street }}<br>
        </div>

        <div v-if="address.number">
          <strong>Número:</strong> {{ address.number }}<br>
        </div>

        <div v-if="address.neighborhood">
          <strong>Bairro:</strong> {{ address.neighborhood }}<br>
        </div>

        <div v-if="address.city">
          <strong>Cidade:</strong> {{ address.city }}<br>
        </div>

        <div v-if="address.country">
          <strong>País:</strong> {{ address.country }}<br>
        </div>

        <div v-if="address.latitude && address.longitude">
          <strong>Latitude:</strong> {{ address.latitude }}<br>
          <strong>Longitude:</strong> {{ address.longitude }}<br>
        </div>
      </div>


    </div>


  </DefaultLayout>
</template>

<script>
/* global google */
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import IconPin from "@/components/icons/IconPin.vue";
import { onMounted, ref } from 'vue';
import googlePlaces from '../composables/googlePlaces';
import L from 'leaflet';

export default {
  components: {
    IconPin,
    DefaultLayout
  },
  setup() {



    // Image Loading Logic -------
    const fileInput = ref(null);
    const files = ref([]);

    function triggerFileInput() {
      console.log("triggerFileInput chamado!");
      fileInput.value.click();
    }

    function handleFiles(event) {
      const fileList = event.target.files;  // Use o objeto de evento diretamente
      for (let i = 0; i < fileList.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(fileList[i]);
        reader.onload = (e) => {
          files.value.push({ url: e.target.result, description: '' });
        };
      }
    }

    function removeFile(index) {
      files.value.splice(index, 1);
    }



    const addressInput = ref(null);
    const link = "https://maps.googleapis.com/maps/api/js?key=AIzaSyChxPVeTxWpkmvuFNgez4o5fSi8UFjR8HU&libraries=places";
    let app_map = null;

    const address = ref({
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      country: "",
      latitude: 0,
      longitude: 0
    });





    function initMap() {
      console.log("Starting Map...")
      const centerOfIlhabela = [-23.7787, -45.3581];
      app_map = L.map('map-register-property', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true }).setView(centerOfIlhabela, 12);
      L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiem93eWUiLCJhIjoiY2xqeDAwM2F5MDFoMDNlcGx3c2RqZ3ZldyJ9.BgqylKNWVF6Io-dSx4o54Q', {
        maxZoom: 19
      }).addTo(app_map);

      app_map.invalidateSize();
    }





    function processAddressDetails(place) {
      let street = "";
      let number = "";
      let neighborhood = "";
      let city = "";
      let country = "";
      let latitude = place.geometry.location.lat();
      let longitude = place.geometry.location.lng();
      let marker = null; // Isso será usado para armazenar o marcador





      for (let i = 0; i < place.address_components.length; i++) {
        const component = place.address_components[i];
        switch (component.types[0]) {
          case 'street_number':
            number = component.long_name;
            break;
          case 'route':
            street = component.long_name;
            break;
          case 'sublocality':
            neighborhood = component.long_name;
            break;
          case 'locality':
            city = component.long_name;
            break;
          case 'country':
            country = component.long_name;
            break;
        }
      }


      // Aqui atualizamos o objeto address
      address.value = {
        street,
        number,
        neighborhood,
        city,
        country,
        latitude,
        longitude,

      };




      console.log(street, number, neighborhood, city, country, latitude, longitude);

      // Create a PIN in the property location and fly to that place
      if (marker) {
        app_map.removeLayer(marker);
      }
      marker = L.marker([latitude, longitude]).addTo(app_map);
      app_map.setView([latitude, longitude], 12);

    }


    onMounted(async () => {

      initMap();

      try {
        await googlePlaces(link);
        new google.maps.places.Autocomplete(addressInput.value);

        const autocomplete = new google.maps.places.Autocomplete(addressInput.value);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
          const place = autocomplete.getPlace();
          processAddressDetails(place);
        });

      } catch (error) {
        console.error("Erro ao carregar o script do Google Places.");
      }
    });

    return {
      address,
      fileInput,
      files,
      addressInput,
      triggerFileInput,
      handleFiles,
      removeFile
    }
  }
}
</script>


<style>
#register-container {
  margin-top: 4em;
  width: 50%;
  padding: 1em;
}

.registration-form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
}


.form-group {
  margin-bottom: 15px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  border: none;
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  background-color: rgb(242, 242, 242);
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}


.form-group input.input-error {
  border: 1px solid rgb(152, 57, 57);
  background-color: #ffd8d8;
  color: #572524;
}

.form-group input.input-success {
  border: 1px solid rgb(129, 157, 89);
  background-color: #d7eac1;
  color: #0e3107;
}

.error-text {
  color: rgb(123, 28, 28);
}

.success-text {
  color: rgb(37, 130, 37);
}


.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Estilo para a mensagem de sucesso */
.success-message {
  color: rgb(37, 130, 37);
  text-align: center;
  margin: 20px 0;
}



.progress-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 0.5em;
  margin-bottom: 1em;
}

.progress-bar {
  height: 20px;
  background-color: #808080;
  border-radius: 1em;
  transition: width 0.5s;
  /* Efeito crescente */
}

.progress-complete {
  background-color: rgb(115, 207, 138);
}

button:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}


#map-register-property {
  position: relative;
  width: 100%;
  height: 30em;
  background-color: rgb(185, 185, 185);
  border-radius: 0.6em 0.6em 0.6em 0.6em;
}


@media (max-width: 767px) {
  #register-container {
    width: 90%;
  }
}


#upload-images-wrapper {
  border: none;
  margin-top: 1em;
  width: 100%;
}

.upload-container {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.thumbnail {
  max-width: 200px;
  max-height: 200px;
  border-radius: 0.5em;
  object-fit: cover;
}

.image-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;
}


.remove-photo-button {
  padding: 10px 15px;
  background-color: #df5555;
  color: white;
  border-radius: 0.5em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-photo-button:hover {
  background-color: #ba4747;
}


.hiddenFileInput {
  display: none;
}
</style>