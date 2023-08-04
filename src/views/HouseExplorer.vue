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
                    <div id="main_info">
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
                        <img :src="card_images[currentIndex]" class="gallery-image" loading="lazy" alt="Property Image"
                            @click="changeCurrentIndex(index)" />
                    </div>

                    <div id="map"></div>

                </div>
                <div id="gallary">
                    <div class="gallary_overlay"></div>

                    <div class="gallary_container">
                        <div v-for="(image, index) in card_images" :key="index" ref="image"
                            @click="changeCurrentIndex(index)">
                            <img :src="image" loading="lazy" alt="Property Image" />
                        </div>
                    </div>
                </div>


            </div>

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

// import CardAmenities from '@/components/CardAmenities.vue';

export default {



    mounted() {
        this.hammer = new Hammer(this.$refs.touchArea);
        this.hammer.on('swipeleft', this.swipeLeft);
        this.hammer.on('swiperight', this.swipeRight);
        this.startSlideshow();
        this.startProgressBar();

        var map = L.map('map').setView([-23.7781, -45.3587], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);


        try {
            let lat = this.card.point.lat; // latitude
            let lon = this.card.point.lon; // longitude
            if (lat && lon) {  // Verifique se lat e lon não são nulos
                L.marker([lat, lon]).addTo(map)
                    // .bindPopup('<img src="' + this.card_images[0] + '" alt="Card image" style="width:80px; height:80px; border-radius:50%; object-fit:cover;">')
                    .openPopup();

                // inicia no zoom 10
                map.setView([lat, lon], 10);

                // após um tempo (2 segundos neste exemplo), faz o zoom suave até o zoom 16
                setTimeout(function () {
                    map.flyTo([lat, lon], 13, {
                        duration: 2
                    });
                }, 800);
            } else {
                console.error("Latitude and/or longitude is null");
            }

        } catch (error) {
            console.error(error);
            // Aqui você pode adicionar código para lidar com o erro, por exemplo mostrando uma mensagem ao usuário
        }

    },

    methods: {

        swipeLeft() {
            console.log("SwipedLeft!!!!!!!!!!!!!!!!!");
            if (this.currentIndex < this.card_images.length - 1) {
                this.changeCurrentIndex(this.currentIndex + 1);
            }
        },
        swipeRight() {
            if (this.currentIndex > 0) {
                this.changeCurrentIndex(this.currentIndex - 1);
            }
        },
        changeCurrentIndex(index) {
            this.currentIndex = index;
            this.$refs.image[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            this.startProgressBar(); // Reinicia a barra de progresso sempre que a imagem é alterada manualmente
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
            intervalId: null
        };
    },
    created() {
        window.scrollTo(0, 0);

        this.card = data.find(item => item.id === this.$route.params.id);

        if (this.card) {
            this.card_images = this.card.medias.slice(0, 50).map(

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
    }

};

</script>

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
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.6));
}


#description {
    font-size: 1.2em;
    color: var(--cor-text-base);
    line-height: 1.3em;
    font-family: var(--font-text);
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
    flex-wrap: wrap;
    gap: 0.5em;
}

.separator {
    width: 2em;
    height: 0.8em;
    background-color: var(--nice-green);
    margin: 20px auto;
    /* Isso centraliza o separador e dá um pouco de espaço acima e abaixo */
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
    align-items: flex-start;
    width: 100px;
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

#gallary{
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
    width: 100px;
    height: 100px;
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
    height: 5px;
    background: rgba(247, 230, 230, 0.654);
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

    #main_info,
    #aditional_info {
        flex: 1 0 100%;
    }
}
</style>