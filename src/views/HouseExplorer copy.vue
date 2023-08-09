<template>
    <DefaultLayout>
        <div id="wrapper_house_explorer">
            <div id="breadcrumbs" class="breadcrumbs-container">
                <a @click="goToHome">Home</a> <span class="icon"><i class="fas fa-chevron-right"
                        style="font-size:10px; color: black; margin-left: 2em; margin-right: 1em;"></i></span> House
                Explorer


            </div>

            <div id="main_row">

                <div id="info_wrapper">
                    <div id="map"></div>

                    <div id="main_info" v-if="card">
                        <div class="image_overlay" ref="touchArea"></div>
                        <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>

                        <div class="image_content">

                            <div class="house_infos">
                                <ul>
                                    <li class="limegreen">Novo</li>
                                    <li class="yellow">Postado em: 12/06/2023</li>
                                    <li class="orange">Trending</li>
                                    <li class="white">Apartamento</li>
                                </ul>
                            </div>
                            <div class="same_line">
                                <div id="title">Casa no {{ card.getProperty.neighborhood }}</div>
                                <div class="price_house_explorer"> R$ {{ card.formattedPrice }} {{ card.suffix }}</div>
                            </div>
                            <div id="topInfos" class="inner_cardcard_padding">
                                <IconPin :color_icon="['black', 'white']" />
                                <span id="address">{{ card.getProperty.street }}, {{ card.getProperty.streetNumber }}</span>
                            </div>

                        </div>
                        <div :class="overlayClass"></div>
                        <img :src="card_images[currentIndex]" class="gallery-image" loading="lazy" alt="Property Image"
                            @click="changeCurrentIndex(index)" @load="onImageLoaded" />
                    </div>
                    <div v-else>
                        Carregando dados...
                    </div>
                </div>
                <div id="gallary">
                    <div class="gallary_overlay"></div>

                    <div class="gallary_container">
                        <div v-for="(image, index) in card_images" :key="index" ref="image"
                            @click="changeCurrentIndex(index)">
                            <img :src="image" alt="Property Image" />
                        </div>
                    </div>
                </div>

                <div id="extra_info">
                    <div id="y">

                        <div>
                            <div id="icons_blocks_wrapper">
                                <div class="rh_ultra_prop_card__meta">
                                    <div class="icon_and_info_wrapper">
                                        <div class="icon-label">
                                            Bedrooms </div>
                                        <div class="bottom_content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" class="icon">

                                                <path
                                                    d="M19.4 2c0.1 0 0.2 0 0.3 0l0.2 2H15l0-2c0.2 0 0.3 0 0.6 0H19.4M8.4 2C8.7 2 8.9 2 9 2l0 1.8C8.7 3.9 8.4 4 8.1 4h-4l0.2-2c0.1 0 0.2 0 0.3 0H8.4M20.1 10c0.3 0 0.6 0.1 0.7 0.2L22 21.3c0 0 0 0.1 0 0.1 0 0.2 0 0.3-0.1 0.3 -0.1 0.1-0.3 0.2-0.6 0.2H2.6c-0.3 0-0.5-0.1-0.6-0.2C2 21.7 2 21.7 2 21.5c0 0 0-0.1 0-0.1l1.2-11.1C3.3 10.1 3.6 10 3.9 10H20.1M19.4 0h-3.9C14.5 0 13 0.1 13 1l0 3.5C12.8 5.3 13.7 6 14.9 6h5.2c1.2 0 2.1-0.7 1.9-1.5l-0.4-3.1C21.5 0.6 20.5 0 19.4 0L19.4 0zM8.4 0H4.6C3.5 0 2.5 0.6 2.4 1.3L2 4.5C1.9 5.3 2.7 6 3.9 6h4.2c1.2 0 3.1-0.7 2.9-1.5L11 1C11 0.1 9.5 0 8.4 0L8.4 0zM20.1 8H3.9C2.6 8 1.4 8.8 1.3 9.8L0 21.1C-0.2 22.7 0.9 24 2.6 24h18.7c1.7 0 2.9-1.3 2.6-2.9L22.7 9.8C22.6 8.8 21.4 8 20.1 8L20.1 8z">
                                                </path>
                                            </svg>
                                            <span>3</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="vertical_separator"></div>

                                <div class="rh_ultra_prop_card__meta">
                                    <div class="icon_and_info_wrapper">
                                        <div class="icon-label">
                                            Saunas </div>
                                        <div class="bottom_content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" class="icon">

                                                <path
                                                    d="M9 10l0.7 0.1c1.2 0.2 2.2 0.9 2.8 1.9H5.5c0.6-1 1.6-1.7 2.8-1.9L9 10M16 0c-4.4 0-8 3.6-8 8 0 0 0 0.1 0 0.1C5.2 8.6 3 11 3 14h12c0-3-2.2-5.4-5-5.9V8c0-3.3 2.7-6 6-6 3.3 0 6 2.7 6 6v16h2V8C24 3.6 20.4 0 16 0L16 0zM14.3 15.6c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.7 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.7-0.9C15.1 15.8 14.7 15.6 14.3 15.6L14.3 15.6zM3.7 15.6c-0.4 0-0.8 0.3-0.9 0.7l-0.7 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.7-0.9c0.2-0.5-0.1-1.1-0.6-1.3C3.9 15.6 3.8 15.6 3.7 15.6L3.7 15.6zM9 16c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 16.5 9.6 16 9 16L9 16zM16.3 20.2c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.3 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.3-0.9C17.1 20.5 16.7 20.2 16.3 20.2L16.3 20.2zM1.7 20.2c-0.4 0-0.8 0.3-0.9 0.7l-0.3 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.3-0.9c0.2-0.5-0.1-1.1-0.6-1.3C1.9 20.3 1.8 20.2 1.7 20.2L1.7 20.2zM9 21c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 21.5 9.6 21 9 21L9 21z">
                                                </path>
                                            </svg>
                                            <span>2</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="vertical_separator"></div>


                                <div class="rh_ultra_prop_card__meta">
                                    <div class="icon_and_info_wrapper">
                                        <div class="icon-label">
                                            Bathrooms </div>
                                        <div class="bottom_content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" class="icon">

                                                <path
                                                    d="M9 10l0.7 0.1c1.2 0.2 2.2 0.9 2.8 1.9H5.5c0.6-1 1.6-1.7 2.8-1.9L9 10M16 0c-4.4 0-8 3.6-8 8 0 0 0 0.1 0 0.1C5.2 8.6 3 11 3 14h12c0-3-2.2-5.4-5-5.9V8c0-3.3 2.7-6 6-6 3.3 0 6 2.7 6 6v16h2V8C24 3.6 20.4 0 16 0L16 0zM14.3 15.6c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.7 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.7-0.9C15.1 15.8 14.7 15.6 14.3 15.6L14.3 15.6zM3.7 15.6c-0.4 0-0.8 0.3-0.9 0.7l-0.7 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.7-0.9c0.2-0.5-0.1-1.1-0.6-1.3C3.9 15.6 3.8 15.6 3.7 15.6L3.7 15.6zM9 16c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 16.5 9.6 16 9 16L9 16zM16.3 20.2c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.3 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.3-0.9C17.1 20.5 16.7 20.2 16.3 20.2L16.3 20.2zM1.7 20.2c-0.4 0-0.8 0.3-0.9 0.7l-0.3 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.3-0.9c0.2-0.5-0.1-1.1-0.6-1.3C1.9 20.3 1.8 20.2 1.7 20.2L1.7 20.2zM9 21c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 21.5 9.6 21 9 21L9 21z">
                                                </path>
                                            </svg>
                                            <span>2</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="vertical_separator"></div>


                                <div class="rh_ultra_prop_card__meta">
                                    <div class="icon_and_info_wrapper">
                                        <div class="icon-label">
                                            Area </div>
                                        <div class="bottom_content">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" class="icon">
                                                <path class="ultra-meta rh-ultra-dark"
                                                    d="M19.2 2L22 4.8v0.3L19.2 8l-1.4-2.9L17.7 5l0.1-0.1L19.2 2M5 17.7l0.1 0.1L8 19.2 5.2 22H4.8L2 19.2l2.9-1.4L5 17.7M20 0h-2l-2 4H4v12l-4 2v2l4 4h2l4-4v-2l-4-2V6h10l2 4h2l4-4V4L20 0 20 0zM24 10h-2v2h2V10L24 10zM24 14h-2v2h2V14L24 14zM24 18h-2v2h2V18L24 18zM24 22h-2v2h2V22L24 22zM20 22h-2v2h2V22L20 22zM16 22h-2v2h2V22L16 22zM12 22h-2v2h2V22L12 22z">
                                                </path>
                                            </svg>
                                            <span>2</span>
                                        </div>

                                    </div>
                                </div>

                                <div class="vertical_separator"></div>

                                <div class="rh_ultra_prop_card__meta">
                                    <div class="icon_and_info_wrapper">
                                        <div class="icon-label">
                                            Vagas
                                        </div>
                                        <div class="bottom_content">
                                            <img src="@/assets/images/garage.svg" alt="Garage Icon" style="width: 24px;"
                                                class="icon" />
                                            <!-- Definir a largura do SVG aqui -->
                                            <span>2</span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <h1>Descrição</h1>
                        <div id="description">Lorem ipsum dolor sit amet, consectetur adipisicing corporis, quae, nemo sunt
                            commodi error optio
                            rem
                            magni ipsam. Ea pariatur sed provident? Ducimus, placeat, rem voluptas iure corrupti et quae
                            doloremque
                            sapiente voluptatem quos at dolores repellat pariatur voluptatum recusandae?</div>
                        <!-- <div class="amenities" v-if="amenities">
                            <CardAmenities :amenities="card.amenities" />
                        </div> -->

                        <!-- <div>
                            <h1>Property Details</h1>
                            <table class="property-table">
                                <tr class="row-light">
                                    <td><strong>Distancia até Praia do Curral</strong></td>
                                    <td>{{ dist_curral }} metros</td>
                                </tr>
                                <tr class="row-dark">
                                    <td><strong>Price:</strong></td>
                                    <td>R$ {{ card.formattedPrice }} {{ card.suffix }}</td>
                                </tr>
                                <tr class="row-light">
                                    <td><strong>Address:</strong></td>
                                    <td>{{ card.street }}, {{ card.streetNumber }}, {{ card.neighborhood }}, {{ card.city
                                    }}, {{
    card.state }}, {{ card.country }}</td>
                                </tr>
                                <tr class="row-dark">
                                    <td><strong>Zip Code:</strong></td>
                                    <td>{{ card.zipCode }}</td>
                                </tr>
                                <tr class="row-light">
                                    <td><strong>Usable Area:</strong></td>
                                    <td>{{ card.usableAreas[0] }} sqm</td>
                                </tr>
                                <tr class="row-dark">
                                    <td><strong>Yearly IPTU:</strong></td>
                                    <td>R$ {{ card.pricingInfos[0].yearlyIptu }}</td>
                                </tr>
                                <tr class="row-light">
                                    <td><strong>Monthly Condo Fee:</strong></td>
                                    <td>R$ {{ card.pricingInfos[0].monthlyCondoFee }}</td>
                                </tr>
                                <tr class="row-dark">
                                    <td><strong>Usage Types:</strong></td>
                                    <td>{{ card.usageTypes.join(', ') }}</td>
                                </tr>
                                <tr class="row-light">
                                    <td><strong>Unit Types:</strong></td>
                                    <td>{{ card.unitTypes.join(', ') }}</td>
                                </tr>
                            </table>

                        </div> -->

                    </div>

                </div>

            </div>

        </div>

    </DefaultLayout>
</template>
<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
// import data from '@/data.json';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import IconPin from "@/components/icons/IconPin.vue";
import Hammer from 'hammerjs';
import 'leaflet-routing-machine';
// import CardAmenities from '@/components/CardAmenities.vue';
import axios from 'axios';



export default {

    mounted() {





        this.startSlideshow();
        this.startProgressBar();

        var map = L.map('map').setView([-23.7781, -45.3587], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);


        try {

            if (this.card && this.card.point) {
                let lat = this.card.point.lat; // latitude
                let lon = this.card.point.lon; // longitude

                this.createMarkerAndRoute(lat, lon, map);

                // inicia no zoom 10
                map.setView([lat, lon], 10);

                // após um tempo (2 segundos neste exemplo), faz o zoom suave até o zoom 16
                setTimeout(function () {
                    map.flyTo([lat, lon], 13, {
                        duration: 2
                    });
                }, 800);
            } else {
                // Latitude and/or longitude is null, use default coordinates (centre of Ilhabela)
                let defaultLat = -23.7781;
                let defaultLon = -45.3587;
                let marker = L.marker([defaultLat, defaultLon]).addTo(map);

                marker.bindPopup('Localização aproximada').openPopup();

                this.createMarkerAndRoute(defaultLat, defaultLon, map);



                // Removed the second marker addition
                // L.marker([defaultLat, defaultLon]).addTo(map).openPopup();

                map.setView([defaultLat, defaultLon], 10);

                setTimeout(function () {
                    map.flyTo([defaultLat, defaultLon], 13, {
                        duration: 2
                    });
                }, 800);

                console.error("Latitude and/or longitude is null, default coordinates used.");
            }

        } catch (error) {
            console.error(error);
            // Aqui você pode adicionar código para lidar com o erro, por exemplo mostrando uma mensagem ao usuário
        }

    },
    methods: {
        createHammer() {
            this.hammer = new Hammer(this.$refs.touchArea);
            this.hammer.on('swipeleft', this.swipeLeft);
            this.hammer.on('swiperight', this.swipeRight);
        },
        onImageLoaded() {
            // Quando a imagem é carregada, ative o efeito flash
            this.isFlashing = true;

            // Aguarde um pouco (igual ao tempo da animação, 1s no exemplo) e desative o efeito flash
            setTimeout(() => {
                this.isFlashing = false;
            }, 1000);
        },
        createMarkerAndRoute(lat, lon, map) {
            let marker = L.marker([lat, lon]).addTo(map);

            let popupContent = 'Localização Aproximada';
            let latCurral = -23.866154643306626;
            let lonCurral = -45.43172210701251;

            marker.bindPopup(popupContent).openPopup();

            marker.on('click', function () {
                let control = L.Routing.control({
                    waypoints: [
                        L.latLng(lat, lon),
                        L.latLng(latCurral, lonCurral)  // Coordenadas da Praia do Curral
                    ],
                    routeWhileDragging: false,
                    show: false
                }).addTo(map);

                map.fitBounds(control.getWaypoints().map(function (wp) { return wp.latLng; }));
            });

            map.setView([lat, lon], 10);

            setTimeout(function () {
                map.flyTo([lat, lon], 13, {
                    duration: 2
                });
            }, 800);




            let point1 = L.latLng(latCurral, lonCurral);
            let point2 = L.latLng(lat, lon);

            let distance = point1.distanceTo(point2);
            this.dist_curral = distance.toFixed(0)
            console.log(`A distância até a praia do curral é de ${distance} metros`)
        },


        swipeLeft() {
            if (this.currentIndex < this.card_images.length - 1) {
                this.changeCurrentIndex(this.currentIndex + 1);
            }
        },
        swipeRight() {
            if (this.currentIndex > 0) {
                this.changeCurrentIndex(this.currentIndex - 1);
            }
        },
        // changeCurrentIndex(index) {
        //     this.currentIndex = index;
        //     this.$refs.image[index].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
        //     this.startProgressBar(); // Reinicia a barra de progresso sempre que a imagem é alterada manualmente
        // },
        changeCurrentIndex(index) {
            this.currentIndex = index;
            let imgElement = this.$refs.image[index];
            let parentElement = imgElement.parentElement;

            let scrollLeft = imgElement.offsetLeft - (parentElement.offsetWidth / 2) + (imgElement.offsetWidth / 2);
            parentElement.scroll({
                left: scrollLeft,
                behavior: 'smooth'
            });

            this.startSlideshow(); // Reinicia a barra de progresso sempre que a imagem é alterada manualmente
        },
        goToHome() {
            this.$router.push({ path: '/' });
        },
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
        getImageClass(index) {
            const pattern = ['', '', '', '', '', ''];
            return 'image_container ' + pattern[index % pattern.length];
        },
        startSlideshow() {
            if (this.intervalIdSlideshow) {
                clearInterval(this.intervalIdSlideshow); // Clear previous interval
            }

            if (this.intervalIdProgressBar) {
                clearInterval(this.intervalIdProgressBar); // Clear previous interval
                this.startProgressBar()
            }

            this.intervalIdSlideshow = setInterval(() => {
                this.currentIndex++;

                this.startProgressBar();
                if (this.currentIndex >= this.card_images.length) {
                    this.currentIndex = 0;
                }
            }, 4000);
        },
        startProgressBar() {
            this.progressBarWidth = 100;
            const decrement = 100 / (4 * 60); // Divide by 4 seconds and 60 frames per second
            const frameRate = 1000 / 60; // 60 FPS
            if (this.intervalIdProgressBar) {
                clearInterval(this.intervalIdProgressBar); // Clear previous interval
            }


            this.intervalIdProgressBar = setInterval(() => {
                this.progressBarWidth -= decrement;
                if (this.progressBarWidth <= 0) {
                    clearInterval(this.intervalIdProgressBar);
                    this.progressBarWidth = 100;
                }
            }, frameRate);
        },





    },
    computed: {
        overlayClass() {
            return this.isFlashing ? 'overlay flash' : 'overlay';
        },
    },
    beforeUnmount() {
        this.hammer.off('swipeleft', this.swipeLeft);
        this.hammer.off('swiperight', this.swipeRight);

        if (this.intervalIdSlideshow) {
            clearInterval(this.intervalIdSlideshow);
        }
        if (this.intervalIdProgressBar) {
            clearInterval(this.intervalIdProgressBar);
        }
    },
    components: {
        DefaultLayout,
        IconPin,
        // CardAmenities
    },
    data() {
        return {
            card_images: [],
            card: null,
            currentIndex: 0,
            progressBarWidth: 100,
            intervalIdSlideshow: null,
            intervalIdProgressBar: null,
            dist_curral: null,
            isFlashing: false,
        };
    },
    created() {
        window.scrollTo(0, 0);

        // this.card = data.find(item => item.id === this.$route.params.id);





        const GET_PROPERTY_QUERY = `
        query {
          getProperty(id: 24494) {
            id
            street
            streetnumber
            neighborhood
            medias {
              id
              url
            }
          }
        }
      `;

        // Enviando a requisição com Axios
        axios({
            url: 'http://localhost:4000/graphql', // substitua pelo URL do seu endpoint GraphQL
            method: 'post',
            data: {
                query: GET_PROPERTY_QUERY
            }
        }).then((result) => {
            this.card = result.data.data;

            this.card_images = this.card.getProperty.medias.slice(0, 50).map(
                media => media.url
                    .replace("{action}", "fit-in")
                    .replace("{width}", "870")
                    .replace("{height}", "653")
            ).filter(url => !url.includes('youtube') && !url.includes('youtu'));



            // Aguarde a próxima atualização do DOM
            this.$nextTick(() => {
                this.createHammer();
            });


            // Fixing Pricing Information
            let [formattedPrice, suffix] = this.formatPrice(this.card.pricingInfos[0].price)
            this.card.formattedPrice = formattedPrice;
            this.card.suffix = suffix;



        }).catch((error) => {
            console.error("Error fetching data:", error);
        });























    }

};

</script>

<style>
@media screen and (max-width: 768px) {
    html {
        font-size: 10px;
    }
}
</style>

<style scoped>
/* @import '~@fortawesome/fontawesome-free/css/all.min.css'; */

#map {
    height: auto;
    min-height: 35em;
    width: 100%;
    box-sizing: border-box;
    margin-top: 1em;
    flex: 1 0 24%;
    padding: 1em;
    border-radius: 0.7em;
}

#info_wrapper {
    display: flex;
    flex-direction: row;
    gap: 1em;
    position: relative;
    flex-wrap: wrap;
}

#main_info {
    margin-top: 1em;
    box-sizing: border-box;
    /* padding: 1em; */
    border-radius: 0.5em;
    flex-direction: column;
    flex: 1 0 75%;
    height: 35em;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
    position: relative;
}

#topInfos {
    justify-content: flex-start;
    margin-top: 1em;
    align-items: center;
    display: flex;
}


#extra_info {
    margin-top: 1em;
    padding: 1em;
}


.image_content {
    display: flex;
    flex-direction: column;
    bottom: 1em;
    left: 2em;
    z-index: 1;
    color: #fff;
    position: absolute;
    padding: 10px;
}

#title {
    font-size: 2.7em;
    font-weight: 700;
    bottom: 0;
    left: 0;
    z-index: 2;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    background: transparent;
    margin-top: -0.3em;
}


#aditional_info {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    margin-top: 1em;
    flex: 1 0 24%;
    padding: 1em;
    border-radius: 0.7em;
    /* background: linear-gradient(45deg, navy, dodgerblue); */

    background-color: rgb(73, 71, 71);
}


.same_line {
    display: flex;
    flex-direction: row;
    align-items: center;
}


.image_overlay {

    border-radius: 0.6em;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    /* Cobrir toda a largura da imagem */
    height: 100%;
    /* Cobrir toda a altura da imagem */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
    z-index: 1;
    /* Colocar abaixo do texto, mas acima da imagem */
}

.gallary_overlay {
    user-select: none;
    pointer-events: none;
    /* Adicionar esta linha */
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9));
}


#description {
    font-size: 1.2em;
    color: rgb(78, 78, 78);
    line-height: 1.3em;
    font-weight: 100;

}


#price_label {
    color: var(--nice-green);
    margin-bottom: -0.2em;
    text-align: center;
    font-family: var(--font-text);
    font-weight: 300;
    font-size: 1.0em;
}


.price_container {
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.price_house_explorer {
    margin-left: 1em;
    color: black;
    padding: 0.2em 1em;
    border-radius: 2em;
    background-color: #fff;
    font-weight: 700;
    font-size: 1.5em;
}


.currency {
    font-size: 0.8em;
    font-family: 'Oswald', sans-serif;
    font-weight: 100;
}

.price_value {
    line-height: 1em;
    font-size: 1.5em;
    font-family: 'Oswald', sans-serif;
    font-weight: 500;
}

.price_suffix {
    font-size: 1em;
    font-family: 'Oswald', sans-serif;
    font-weight: 300;
}



#icons_blocks_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 1em;
    border-radius: 1em;
    flex-wrap: wrap;
    background-color: rgb(255, 255, 255);
    gap: 0.5em;
}

.separator {
    width: 2em;
    height: 0.8em;
    background-color: var(--nice-green);
    margin: 20px auto;
    /* Isso centraliza o separador e dá um pouco de espaço acima e abaixo */
}

.vertical_separator {
    width: 1px;
    height: 4em;
    background: linear-gradient(to bottom, rgba(224, 224, 224, 0), rgba(224, 224, 224, 1), rgba(224, 224, 224, 0));
}


.separator2 {
    width: 6em;
    height: 0.1em;
    background-color: white;
    margin: 20px auto;
}

.icon-label {
    display: flex;
    flex-direction: row;
    color: var(--cor-texto-base);
    align-items: center;
    font-weight: 700;
    margin-bottom: 0.4em;
}


.icon_and_info_wrapper {
    color: var(--cor-base);
    justify-content: flex-start;
    width: 5em;
    align-items: flex-start;
    padding: 0.8em;
    border-radius: 0.4em;
}

.icon {
    margin-right: 0.3em;
    color: rgb(255, 255, 255);
}

.bottom_content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}


#main_row {
    width: 100%;
    border-radius: 2em;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    z-index: 1;
}

#breadcrumbs {
    border-radius: 2em;
    display: flex;
    justify-content: center;
    align-content: center;
    font-family: 'Montserrat', sans-serif;
    background-color: rgb(255, 255, 255);
    font-weight: 300;
    color: var(--cor-texto-base);
    padding: 0.4em 0.9em;
    margin-bottom: 1em;
    align-self: flex-start;
}

.breadcrumbs-container {
    display: flex;
    align-items: center;
    margin-right: 1em;
}


#wrapper_house_explorer {
    margin-top: 140px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    width: 65%;
    border-radius: 0.4em;
}

.gallary_container {
    margin-top: 1em;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
    background-color: var(--card-background);
    border-radius: 1em;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    min-width: 100%;
    padding: 10px;
}

#gallary {
    position: relative;
}

.gallary_container::-webkit-scrollbar {
    display: none;
}

.image_container {
    margin-right: 10px;
    /* Se você quiser algum espaço entre as imagens */
}

.gallary_container img {
    border-radius: 0.5em;
    margin-left: 0.5em;
    cursor: pointer;
    width: 8em;
    height: 8em;
}

.image_container {
    position: relative;
    width: 100%;
    height: 100%;
}

.gallery-image {
    border-radius: 0.5em;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-wide {
    grid-column: span 2;
}

.image-tall {
    grid-row: span 2;
}

.progress-bar {
    height: 7px;
    background-color: #fff;
    filter: brightness(200%);
    /* Tornando a cor/imagem duas vezes mais brilhante */
    /* A cor que preferir para a barra de progresso */
    position: absolute;
    top: 0;
}









.property-table {
    width: 100%;
    border-collapse: collapse;
    color: var(--cor-text-base)
}

.property-table tr {

    /* Cor de fundo para as linhas */
}

.property-table tr.row-light {
    background-color: var(--table-light-line);
    /* Cor de fundo para as linhas pares */
}

.property-table tr.row-dark {
    background-color: var(--table-dark-line);
    /* Cor de fundo para as linhas ímpares */
}

.property-table td {
    padding: 8px;
}

.property-table td strong {
    font-weight: bold;
}


.house_infos {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    margin-left: -2em;
}



.house_infos li {
    border-radius: 1.05em;
    list-style: none;
    padding: 0.3em 0.8em;
    display: inline-block;
    font-size: 0.9em;
    margin-right: 1em;
    box-shadow: 0 2px 8px rgba(195, 195, 195, 0.205);
}

.orange {
    background-color: rgb(255, 140, 0);
    color: white;
}

.white {
    background-color: rgb(0, 0, 0);
    color: white;
}

.limegreen {
    background-color: rgb(156, 205, 50);
    color: rgb(255, 255, 255);
}

.yellow {
    background-color: rgb(248, 186, 29);
    color: white;
}


#big-image {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--cor-base);
    border-radius: 1em;
    padding: 1em;
    margin-top: 1em;

}


#big-image img {
    border-radius: 1em;
}


.card_address {
    font-size: 1.2rem;
}


.neigh {
    display: inline-block;
    font-weight: 200;
    margin-top: 0.5em;
    padding: 0.35em 0.85em;
    color: white;
    border-radius: 1.5em;
    margin-bottom: 1.0em;
    font-size: 1.50em;
    background-color: var(--cor-base);
}



/* Ajusta para tela mobile */
@media screen and (max-width: 768px) {
    #wrapper_house_explorer {
        width: 90%;
    }

    #main_info,
    #aditional_info {
        flex: 1 0 100%;
    }

    .display_on_mobile {
        display: block;
    }

    .not_display_on_mobile {
        display: none;
    }
}




/* Estilo base para a overlay */
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0);
    opacity: 0;
    transition: opacity 0.7s ease-out;
}

/* Quando ativar a classe flash, faz o efeito */
.flash {
    opacity: 1;
    /* Vai para totalmente visível */
    animation: fadeOut 1s ease-out forwards;
    /* Animação que desaparece */
}

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}
</style>