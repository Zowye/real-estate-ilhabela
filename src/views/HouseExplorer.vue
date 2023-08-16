<template>
    <div v-if="FullScreenSlideShowActive" class="full-screen-slideshow-overlay">
        <button @click="nextImage()" class="btn-next"><i class="fa fa-greater-than"></i></button>
        <button @click="FullScreenSlideShowActive = false" class="btn-close"><i class="fa fa-window-close"
                aria-hidden="true"></i>
        </button>
        <button @click="previousImage()" class="btn-previous"><i class="fa fa-less-than"></i></button>

        <div class="full-screen-slideshow-content">
            <div class="slide-show-main-image-container">
                <div class="image-container">
                    <img :src="card_images[currentIndex]" loading="lazy" alt="Property Image" @load="onImageLoaded" />

                </div>
                <div class="slide-show-subtitles"> {{ photo_subtitles[currentIndex] }}</div>
                <div class="image-overlay">
                    {{ currentIndex + 1 }} de {{ card_images.length }}
                </div>
            </div>
        </div>

        <div id="gallary-full-screen">
            <div class="gallary_overlay-full-screen"></div>

            <div class="gallary_container_full_screen">
                <div v-for="(image, index) in card_images" :key="index" ref="image" @click="changeCurrentIndex(index)">
                    <img :src="image" alt="Property Image" />
                </div>
            </div>
        </div>
    </div>
    <DefaultLayout>


        <div id="wrapper_house_explorer">
            <div id="breadcrumbs" class="breadcrumbs-container">
                <a @click="goToHome">Home</a> <span class="icon"><i class="fas fa-chevron-right"
                        style="font-size:10px; color: black; margin-left: 2em; margin-right: 1em;"></i></span> House
                Explorer


            </div>

            <div id="main_row">

                <div id="info_wrapper default_section">
                    <div id="main_info_x">
                        <button class="slide-show-button" @click="FullScreenSlideShowActive = true">FULL SCREEN
                            SLIDESHOW</button>
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
                                <div id="title">Casa no {{ card.neighborhood }}</div>
                                <div class="price_house_explorer"> R$ {{ card.formattedPrice }} {{ card.suffix }}</div>
                            </div>
                            <div id="topInfos" class="inner_cardcard_padding">
                                <IconPin :color_icon="['black', 'white']" />
                                <span id="address">{{ card.street }}, {{ card.streetNumber }}</span>
                            </div>

                        </div>
                        <div :class="overlayClass"></div>

                        <div class="gallery-image-container_x" v-if="imageDetails.length > 7">
                            <div :class="overlayClass"></div>
                            <div class="image-wrapper" v-for="(image, index) in galleryImages" :key="index">
                                <img :src="image" loading="lazy" alt="Property Image"
                                    @click="FullScreenSlideShowActive = true" />
                            </div>
                            <div class="photos-size">{{ card_images.length }} imagens</div>
                        </div>
                    </div>
                </div>
                <!-- <div id="gallary">
                    <div class="gallary_overlay"></div>

                    <div class="gallary_container">
                        <div v-for="(image, index) in card_images" :key="index" ref="image"
                            @click="changeCurrentIndex(index)">
                            <img :src="image" alt="Property Image" />
                        </div>
                    </div>
                </div> -->


                <div id="middle_section">
                    <div class="extra_info shadow">

                        <HouseBasicInfo />

                        <div id="description">
                            <h2>Descrição</h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipisicing corporis, quae, nemo sunt
                                commodi error optio
                                rem magni ipsam. Ea pariatur sed provident? Ducimus, placeat, rem voluptas iure corrupti et
                                quae
                                doloremque
                                sapiente voluptatem quos at dolores repellat pariatur voluptatum recusandae? Lorem ipsum,
                                dolor sit amet consectetur adipisicing elit. Veritatis, libero.</p>
                        </div>






                        <div>


                        </div>
                        <div id="map">
                            <div id="beach-buttons">
                                <button v-for="beach in beaches_map" :key="beach.name"
                                    @click="flyToBeach(beach.lat, beach.lon)">
                                    {{ beach.name }}
                                </button>
                            </div>
                        </div>
                        <div class="default-section-style full-width">
                            <h2>Features</h2>
                            <CardAmenitiesLarge :amenities="card.amenities" />
                        </div>
                    </div>


                    <div class="publisher_info shadow default-section-style">
                        <div class="publisher-container">
                            <img :src="require('@/assets/images/avatar-mock.jpg')" alt="Foto do Publisher"
                                class="publisher-photo">
                            <h2 class="publisher-name">Nome do Publisher</h2>
                            <p class="publisher-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Molestias, aspernatur exercitationem inventore quae dolorum sed excepturi.</p>

                            <p class="publisher-time">2 anos na plataforma</p>
                            <div class="publisher-actions">
                                <button class="action-button whatsapp">WhatsApp</button>
                                <button class="action-button email">Email</button>
                                <button class="action-button contato">Contato</button>
                            </div>
                        </div>
                        <div class="default-separator"></div>

                        <h2>Distâncias</h2>
                        <div class="beaches-container">
                            <div v-for="beach in beaches" :key="beach.name" class="beach-item">
                                <spam class="beach-name">{{ beach.name }}</spam>


                                <div class="beach-bar-container">

                                    <div class="beach-bar-behind">

                                        <div :style="{ width: beach.widthPercentage + '%' }" class="beach-bar">
                                            <spam class="beach-distance"> {{ beach.widthPercentage }} km</spam>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <CardListWithContext :neigh="card.neighborhood" />
        </div>

    </DefaultLayout>
</template>
<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import data from '@/data.json';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import IconPin from "@/components/icons/IconPin.vue";
import Hammer from 'hammerjs';
import 'leaflet-routing-machine';
import HouseBasicInfo from '@/components/HouseBasicInfo.vue';
import CardListWithContext from '@/components/CardListWithContext.vue';
import CardAmenitiesLarge from '@/components/CardAmenitiesLarge.vue';

export default {


    mounted() {

        this.loadImageDetails();

        window.addEventListener("keydown", this.handleKeydown);
        this.hammer = new Hammer(this.$refs.touchArea);
        this.hammer.on('swipeleft', this.swipeLeft);
        this.hammer.on('swiperight', this.swipeRight);
        this.startSlideshow();
        this.startProgressBar();

        this.map = L.map('map', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true }).setView([-23.7781, -45.3587], 11);

        var map = this.map;

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiem93eWUiLCJhIjoiY2xqeDAwM2F5MDFoMDNlcGx3c2RqZ3ZldyJ9.BgqylKNWVF6Io-dSx4o54Q', {
            maxZoom: 19,
        }).addTo(map);

        try {

            if (this.card && this.card.point) {
                let lat = this.card.point.lat; // latitude
                let lon = this.card.point.lon; // longitude


                // inicia no zoom 10
                map.setView([lat, lon], 10);

                // após um tempo (2 segundos neste exemplo), faz o zoom suave até o zoom 16
                setTimeout(function () {
                    map.flyTo([lat, lon], 13, {
                        duration: 2
                    });
                }, 800);

                this.coords = [lat, lon]
            } else {
                // Latitude and/or longitude is null, use default coordinates (centre of Ilhabela)
                let defaultLat = -23.7781;
                let defaultLon = -45.3587;
                let marker = L.marker([defaultLat, defaultLon]).addTo(map);

                marker.bindPopup('Localização aproximada').openPopup();


                this.coords = [defaultLat, defaultLon]

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
    watch: {
        FullScreenSlideShowActive(newVal) { // "newVal" ou "isActive" é simplesmente o novo valor de "FullScreenSlideShowActive"
            if (newVal) { // Se "FullScreenSlideShowActive" for verdadeiro
                document.body.style.overflow = 'hidden'; // Impede a rolagem do conteúdo do corpo
            } else {
                document.body.style.overflow = ''; // Retorna o comportamento padrão de rolagem
            }
        }
    },
    methods: {
        nextImage() {
            if (this.currentIndex == this.card_images.length - 1) {
                this.currentIndex = 0;
            }
            this.currentIndex++;
        },
        previousImage() {
            if (this.currentIndex == 0) {
                this.currentIndex = 0;
            }
            this.currentIndex--;
        },
        loadImageDetails() {
            const imageUrls = this.card.medias.slice(0, 20).map(
                media => media.url
                    .replace("{action}", "fit-in")
                    .replace("{width}", "870")
                    .replace("{height}", "653")
            ).filter(url => !url.includes('youtube') && !url.includes('youtu'));

            this.imageDetails = []; // Inicializar ou reiniciar

            imageUrls.forEach(url => {
                const img = new Image();
                img.src = url;

                img.onload = () => {
                    const width = img.width;
                    const height = img.height;
                    const aspectRatio = width > height ? "landscape" : "portrait";
                    const imageDetail = {
                        "image-format": `${height} x ${width}`,
                        "aspect-ratio": aspectRatio,
                        media: url
                    };

                    // Adicionar o detalhe da imagem diretamente no array
                    this.imageDetails.push(imageDetail);
                };

                img.onerror = (err) => {
                    console.error("Error loading the image: ", err);
                };
            });
        },
        flyToBeach(lat, lon) {
            this.createMarkerAndRoute(this.coords[0], this.coords[1], lat, lon, this.map);
        },
        generateRandomLorem() {
            const loremArray = [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Vivamus lacinia odio vitae vestibulum.",
                "Donec in efficitur leo, sed lacinia risus.",
                "Maecenas non purus quis tellus pellentesque tincidunt.",
                "Nulla facilisi. Proin mollis, ante vitae hendrerit vestibulum.",
                "In nec eleifend ex, pellentesque dapibus sapien."
            ];
            const randomIndex = Math.floor(Math.random() * loremArray.length);
            return loremArray[randomIndex];
        },

        create_photo_subtitles() {
            let SZ = this.card_images.length;
            for (let i = 0; i < SZ; i++) {
                this.photo_subtitles.push(this.generateRandomLorem());
            }
        },
        handleKeydown(event) {
            if (event.key === "Escape" || event.keyCode === 27) {
                this.FullScreenSlideShowActive = false;
            }
        },
        generateBeaches() {
            const beachNames = [
                "Praia do Bonete",
                "Praia de Castelhanos",
                "Praia do Curral",
                "Praia da Feiticeira",
                "Praia Grande",
                "Praia do Jabaquara",
                "Praia da Armação",
                "Praia do Pinto",
                "Praia da Fome",
                "Praia do Saco da Capela"
            ];

            this.beaches = beachNames.map(beach => ({
                name: beach,
                widthPercentage: Math.floor(Math.random() * 101)
            }));
        },
        onImageLoaded() {
            // Quando a imagem é carregada, ative o efeito flash
            this.isFlashing = true;

            // Aguarde um pouco (igual ao tempo da animação, 1s no exemplo) e desative o efeito flash
            setTimeout(() => {
                this.isFlashing = false;
            }, 1000);
        },
        createMarkerAndRoute(lat, lon, latPOI, lonPOI, map) {
            // Se existe uma rota anterior, remova-a
            if (this.currentRoute) {
                this.map.removeControl(this.currentRoute);
            }

            // Se existe um marcador de POI anterior, remova-o
            if (this.poiMarker) {
                this.map.removeLayer(this.poiMarker);
            }

            this.poiMarker = L.marker([latPOI, lonPOI]).addTo(map);
            let popupContent = 'Localização Aproximada';
            this.poiMarker.bindPopup(popupContent).openPopup();

            // Restante do código...
            this.currentRoute = L.Routing.control({
                waypoints: [
                    L.latLng(lat, lon),
                    L.latLng(latPOI, lonPOI)  // Coordenadas da Praia
                ],
                routeWhileDragging: false,
                show: false,
                lineOptions: {
                    styles: [
                        { color: 'black', opacity: 1, weight: 2, dashArray: '5,10' }
                    ]
                }
            }).addTo(map);

            // Restante do código...
            map.fitBounds(this.currentRoute.getWaypoints().map(function (wp) { return wp.latLng; }));
            map.setView([lat, lon], 10);
            setTimeout(function () {
                map.flyTo([lat, lon], 12, {
                    duration: 1
                });
            }, 800);

            let point1 = L.latLng(latPOI, lonPOI);
            let point2 = L.latLng(lat, lon);
            let distance = point1.distanceTo(point2);
            this.dist_curral = distance.toFixed(0);
        },

        swipeLeft() {
            if (this.currentIndex + 8 < this.imageDetails.length) {
                this.currentIndex += 8;
            } else {
                this.currentIndex = 0; // resetar para o começo se não houver mais 8 imagens restantes
            }
        },
        swipeRight() {
            if (this.currentIndex - 8 > 0) {
                this.currentIndex -= 8;
            } else {
                this.currentIndex = 0; // resetar para o começo se não houver mais 8 imagens restantes
            }
        },
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
            console.log("Called Progress Bar");
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
        galleryImages() {
            if (!this.imageDetails) return [];

            let images = [];
            for (let i = 0; i < 8; i++) {
                let index = (this.currentIndex + i) % this.imageDetails.length;
                images.push(this.imageDetails[index].media);
            }
            return images;
        },
        overlayClass() {
            return this.isFlashing ? 'overlay flash' : 'overlay';
        },
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleKeydown);

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
        HouseBasicInfo,
        CardAmenitiesLarge,
        CardListWithContext
    },
    data() {
        return {
            map: null,
            card_images: [],
            imageDetails: [],
            card: null,
            currentIndex: 0,
            progressBarWidth: 100,
            intervalIdSlideshow: null,
            intervalIdProgressBar: null,
            dist_curral: null,
            isFlashing: false,
            beaches: [],
            FullScreenSlideShowActive: false,
            photo_subtitles: [],
            coords: null,
            beachMarker: null,
            currentRoute: null,
            beaches_map: [
                { name: 'Praia do Veloso', lat: -23.87050416336501, lon: -45.43526673576338 },
                { name: 'Praia do Curral', lat: -23.867829645530886, lon: -45.432361003955855 },
                { name: 'Praia de Siriúba', lat: -23.754469120621565, lon: -45.34964520269949 },
                { name: 'Praia Grande', lat: -23.857863247135793, lon: -45.41661985020065 },
                { name: 'Praia da Feiticeira', lat: -23.845364733291042, lon: -45.40884735084273 }
            ]

        };
    },
    created() {


        this.generateBeaches();

        window.scrollTo(0, 0);

        this.card = data.find(item => item.id === this.$route.params.id);

        if (this.card) {
            this.card_images = this.card.medias.slice(0, 100).map(
                media => media.url
                    .replace("{action}", "fit-in")
                    .replace("{width}", "870")
                    .replace("{height}", "653")
            ).filter(url => !url.includes('youtube') && !url.includes('youtu'));

            console.log(this.card_images)

            // Fixing Pricing Information
            let [formattedPrice, suffix] = this.formatPrice(this.card.pricingInfos[0].price)
            this.card.formattedPrice = formattedPrice;
            this.card.suffix = suffix;
        }

        this.create_photo_subtitles();

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
    position: relative;
    /* Set parent to be a reference for positioning of children */

}

#beach-buttons {
    position: absolute;
    top: 50%;
    left: 10px;
    z-index: 1000;
    padding: 0.5em;
    border-radius: 0.5em;
    transform: translateY(-50%);
}

#beach-buttons button {
    cursor: pointer;
    display: block;
    padding: 1em;
    border: none;
    border-radius: 0.5em;
    margin: 5px 0;
}


.full-width {
    width: 100%;
}

#middle_section {
    margin-top: 1em;
    display: flex;
    flex-direction: row;
}













.slide-show-button {
    cursor: pointer;
    top: 1em;
    right: 1em;
    background-color: #000000;
    border: none;
    z-index: 3;
    padding: 1em;
    color: white;
    border-radius: 0.5em;
    position: absolute;
}


#info_wrapper {
    display: flex;
    flex-direction: row;
    gap: 1em;
    position: relative;
    flex-wrap: wrap;
}


#topInfos {
    justify-content: flex-start;
    margin-top: 1em;
    align-items: center;
    display: flex;
}


.extra_info {
    display: flex;
    flex-direction: column;
    align-items: first baseline;
    justify-content: start;
    background-color: #fff;
    border-radius: 0.5em;
    margin-right: 1em;
    padding: 1em;
}


.image_content {
    display: flex;
    flex-direction: column;
    bottom: 1em;
    left: 2em;
    color: #fff;
    position: absolute;
    padding: 10px;
    z-index: 3;
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

.houses_tittle {
    font-size: 1.4em;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: black;
    margin-bottom: 0.7em;
    margin-top: 1.9em;
}


#aditional_info {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    margin-top: 1em;
    flex: 1 0 24%;
    padding: 1em;
    border-radius: 0.7em;
    background-color: rgb(73, 71, 71);
}


.same_line {
    display: flex;
    flex-direction: row;
    align-items: center;
}


.image_overlay {
    user-select: none;
    border-radius: 0.6em;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45%;
    background: linear-gradient(to top,
            rgb(0, 0, 0),
            rgba(0, 0, 0, 0.114),
            transparent);
    z-index: 2;
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




.icon-label {
    display: flex;
    flex-direction: row;
    color: var(--cor-texto-base);
    align-items: center;
    font-weight: 700;
    margin-bottom: 0.4em;
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


#gallary-full-screen {
    top: 0;
    width: 90%;
    overflow: hidden;
    position: absolute;
}


.gallary_container_full_screen {
    margin-top: 1em;
    box-sizing: border-box;
    border-radius: 1em;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
    overflow: hidden;
    padding: 10px;
}

.gallary_container_full_screen img {
    border-radius: 0.5em;
    margin-left: 0.5em;
    cursor: pointer;
    object-fit: contain;
    width: 6em;
    height: 6em;
}

.gallary_overlay-full-screen {
    position: absolute;
    user-select: none;
    pointer-events: none;
    right: 0;
    width: 100px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.9));
}

.gallary_container::-webkit-scrollbar {
    display: none;
}

.image_container {
    margin-right: 10px;
}





#main_info_x {
    margin-top: 1em;
    box-sizing: border-box;
    /* padding: 1em; */
    border-radius: 0.5em;
    flex-direction: column;
    flex: 1 0 75%;
    max-height: 36em;
    height: 36em;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
    position: relative;
    /* overflow: hidden; */
}

.gallery-image-container_x {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 2px;
    height: 36em;
    width: 100%;
}

.image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
}

.image-wrapper:nth-child(2) {
    grid-area: 1 / 1 / span 2 / span 2;
}

.image-wrapper:nth-child(3) {
    grid-area: 1 / 3 / span 1 / span 1;
}

.image-wrapper:nth-child(4) {
    grid-area: 2 / 3 / span 1 / span 1;
}

.image-wrapper:nth-of-type(5) {
    grid-area: 2 / 4 / span 1 / span 1;
}

.image-wrapper:nth-of-type(6) {
    grid-area: 2 / 5 / span 1 / span 1;
}

.image-wrapper:nth-of-type(7) {
    grid-area: 2 / 5 / span 1 / span 1;
}




img[aspect-ratio="portrait"]:nth-of-type(1) {
    grid-area: 2 / 4 / span 2 / span 1;
}




.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: slideImage 10s forwards;
    position: absolute;
    top: 0;
    /* Começa movendo a imagem para cima para que ela não seja vista */
}

@keyframes slideImage {
    to {
        transform: scale(1.14);
        /* Move a imagem de volta à sua posição original */
    }
}

.image-wide {
    grid-column: span 2;
}

.image-tall {
    grid-row: span 2;
}

.progress-bar {
    height: 10px;
    background-color: #ffffff84;
    filter: brightness(200%);
    /* Tornando a cor/imagem duas vezes mais brilhante */
    /* A cor que preferir para a barra de progresso */
    position: absolute;
    top: 0;
    z-index: 1;
}


#table-container {
    width: 100%;
}

.property-table {
    width: 100% !important;
    border-collapse: collapse;
    color: var(--cor-text-base)
}

.property-table tr {
    width: 100%;

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

    #middle_section {
        width: 95%;
        flex-direction: column;
    }

    .slide-show-main-image-container {
        max-width: 95%;
    }

    .publisher_info {
        background-color: #007BFF;
        margin-top: 1em;
        width: 100%;
    }

    .extra_info {
        margin-right: 0em;
        padding: 1em;
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


.beaches-container {
    width: 100%;
    /* or whatever you prefer */
    margin: 0 auto;
}



.beach-item {
    margin-bottom: 10px;
}

.beach-name {
    font-weight: 600;
    color: white;
    font-family: 'Montserrat', sans-serif;
    color: black;
}

.beach-distance {
    margin-left: 0.5em;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
    color: black;
}

.beach-bar-behind {
    width: 100%;
    background: #eee8e8;
    height: 22px;
    position: relative;
}


.beach-bar-container {
    height: 100%;
    width: 100%;
    border-radius: 1em;
    overflow: hidden;
}


.beach-bar {
    background: #d4cbc5;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}


.shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}



.publisher_info {
    font-family: 'Arial', sans-serif;
    height: auto;
    display: block;
    padding: 20px;
    height: fit-content;
}

.default-section-style {
    border-radius: 8px;
    background-color: white;
}

.publisher-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.publisher-photo {
    width: 10em;
    height: 10em;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
}

.publisher-name {
    font-size: 24px;
    margin-bottom: 10px;
}

.publisher-description {
    font-size: 14px;
    color: #888;
    text-align: center;
    margin-bottom: 15px;
}

.publisher-time {
    font-size: 12px;
    color: #666;
    margin-bottom: 20px;
}

.publisher-actions {
    display: flex;
    gap: 10px;
}

.action-button {
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.whatsapp {
    background-color: #25D366;
    color: white;
}

.email {
    background-color: #007BFF;
    color: white;
}

.contato {
    background-color: #f1f1f1;
    color: #333;
}

.action-button:hover {
    opacity: 0.9;
}





/* --------------------- SlideShowFUllScreen --------------------- */

.full-screen-slideshow-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.99);
    z-index: 1111;
    flex-direction: column;
}

.full-screen-slideshow-content {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.slide-show-main-image-container {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1.5em;
}


.slide-show-main-image-container img {
    object-fit: contain;
    border-radius: 1.5em;
}

.slide-show-subtitles {
    display: block;
    color: white;
    background-color: black;
    padding: 1em;
}


.image-container {
    position: relative;
    border-radius: 1em;
}

.image-overlay {
    user-select: none;
    position: absolute;
    top: -1em;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
}


.btn-close,
.btn-next,
.btn-previous {
    position: absolute;
    border: none;
    cursor: pointer;
    background-color: #000000;
    color: white;
    z-index: 1000;
    font-size: 2em;
}

.btn-close {
    right: 0;
}

.btn-next {
    right: 0;
    top: 50%;
    padding: 1em;
}

.btn-previous {
    left: 0;
    top: 50%;
    padding: 1em;
}


.photos-size {
    position: absolute;
    padding: 0.5em;
    background-color: rgba(0, 0, 0, 0.66);
    color: white;
    bottom: 0.5em;
    border-radius: 0.5em;
    right: 0.5em;
    z-index: 1000;
}
</style>