<template>
    <DefaultLayout>
        <div id="wrapper_house_explorer">
            <div id="breadcrumbs" class="breadcrumbs-container">
                <a @click="goToHome">Home</a> <span class="icon"><i class="fas fa-chevron-right"
                        style="font-size:10px; color: black; margin-left: 2em; margin-right: 1em;"></i></span> House
                Explorer
            </div>


            <div id="main_row">

                <div class="gallary_container">

                    <div v-for="(image, index) in card_images" :key="index" :class="getImageClass(index)">
                        <img :src="image" class="gallery-image" loading="lazy" alt="Property Image" />
                    </div>
                </div>

                <div id="info_wrapper">
                    <div class="house_infos">
                        <ul>
                            <li class="limegreen">Novo</li>
                            <li class="yellow">Postado em: 12/06/2023</li>
                            <li class="orange">Trending</li>
                            <li class="white">Apartamento</li>
                        </ul>
                    </div>
                    <h1>Overview</h1>
                    <div id="icons_blocks_wrapper">


                        <div class="rh_ultra_prop_card__meta">
                            <div class="icon_and_info_wrapper">
                                <div class="icon-label">
                                    Bedrooms </div>
                                <div class="bottom_content">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        class="icon">

                                        <path
                                            d="M19.4 2c0.1 0 0.2 0 0.3 0l0.2 2H15l0-2c0.2 0 0.3 0 0.6 0H19.4M8.4 2C8.7 2 8.9 2 9 2l0 1.8C8.7 3.9 8.4 4 8.1 4h-4l0.2-2c0.1 0 0.2 0 0.3 0H8.4M20.1 10c0.3 0 0.6 0.1 0.7 0.2L22 21.3c0 0 0 0.1 0 0.1 0 0.2 0 0.3-0.1 0.3 -0.1 0.1-0.3 0.2-0.6 0.2H2.6c-0.3 0-0.5-0.1-0.6-0.2C2 21.7 2 21.7 2 21.5c0 0 0-0.1 0-0.1l1.2-11.1C3.3 10.1 3.6 10 3.9 10H20.1M19.4 0h-3.9C14.5 0 13 0.1 13 1l0 3.5C12.8 5.3 13.7 6 14.9 6h5.2c1.2 0 2.1-0.7 1.9-1.5l-0.4-3.1C21.5 0.6 20.5 0 19.4 0L19.4 0zM8.4 0H4.6C3.5 0 2.5 0.6 2.4 1.3L2 4.5C1.9 5.3 2.7 6 3.9 6h4.2c1.2 0 3.1-0.7 2.9-1.5L11 1C11 0.1 9.5 0 8.4 0L8.4 0zM20.1 8H3.9C2.6 8 1.4 8.8 1.3 9.8L0 21.1C-0.2 22.7 0.9 24 2.6 24h18.7c1.7 0 2.9-1.3 2.6-2.9L22.7 9.8C22.6 8.8 21.4 8 20.1 8L20.1 8z">
                                        </path>
                                    </svg>
                                    <span>3</span>
                                </div>

                            </div>
                        </div>


                        <div class="rh_ultra_prop_card__meta">
                            <div class="icon_and_info_wrapper">
                                <div class="icon-label">
                                    Bathrooms </div>
                                <div class="bottom_content">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        class="icon">

                                        <path
                                            d="M9 10l0.7 0.1c1.2 0.2 2.2 0.9 2.8 1.9H5.5c0.6-1 1.6-1.7 2.8-1.9L9 10M16 0c-4.4 0-8 3.6-8 8 0 0 0 0.1 0 0.1C5.2 8.6 3 11 3 14h12c0-3-2.2-5.4-5-5.9V8c0-3.3 2.7-6 6-6 3.3 0 6 2.7 6 6v16h2V8C24 3.6 20.4 0 16 0L16 0zM14.3 15.6c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.7 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.7-0.9C15.1 15.8 14.7 15.6 14.3 15.6L14.3 15.6zM3.7 15.6c-0.4 0-0.8 0.3-0.9 0.7l-0.7 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.7-0.9c0.2-0.5-0.1-1.1-0.6-1.3C3.9 15.6 3.8 15.6 3.7 15.6L3.7 15.6zM9 16c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 16.5 9.6 16 9 16L9 16zM16.3 20.2c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.3 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.3-0.9C17.1 20.5 16.7 20.2 16.3 20.2L16.3 20.2zM1.7 20.2c-0.4 0-0.8 0.3-0.9 0.7l-0.3 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.3-0.9c0.2-0.5-0.1-1.1-0.6-1.3C1.9 20.3 1.8 20.2 1.7 20.2L1.7 20.2zM9 21c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 21.5 9.6 21 9 21L9 21z">
                                        </path>
                                    </svg>
                                    <span>2</span>
                                </div>

                            </div>
                        </div>


                        <div class="rh_ultra_prop_card__meta">
                            <div class="icon_and_info_wrapper">
                                <div class="icon-label">
                                    Bathrooms </div>
                                <div class="bottom_content">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        class="icon">

                                        <path
                                            d="M9 10l0.7 0.1c1.2 0.2 2.2 0.9 2.8 1.9H5.5c0.6-1 1.6-1.7 2.8-1.9L9 10M16 0c-4.4 0-8 3.6-8 8 0 0 0 0.1 0 0.1C5.2 8.6 3 11 3 14h12c0-3-2.2-5.4-5-5.9V8c0-3.3 2.7-6 6-6 3.3 0 6 2.7 6 6v16h2V8C24 3.6 20.4 0 16 0L16 0zM14.3 15.6c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.7 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.7-0.9C15.1 15.8 14.7 15.6 14.3 15.6L14.3 15.6zM3.7 15.6c-0.4 0-0.8 0.3-0.9 0.7l-0.7 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.7-0.9c0.2-0.5-0.1-1.1-0.6-1.3C3.9 15.6 3.8 15.6 3.7 15.6L3.7 15.6zM9 16c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 16.5 9.6 16 9 16L9 16zM16.3 20.2c-0.1 0-0.2 0-0.3 0.1 -0.5 0.2-0.8 0.8-0.6 1.3l0.3 0.9c0.1 0.4 0.5 0.7 0.9 0.7 0.1 0 0.2 0 0.3-0.1 0.5-0.2 0.8-0.8 0.6-1.3l-0.3-0.9C17.1 20.5 16.7 20.2 16.3 20.2L16.3 20.2zM1.7 20.2c-0.4 0-0.8 0.3-0.9 0.7l-0.3 0.9c-0.2 0.5 0.1 1.1 0.6 1.3 0.1 0 0.2 0.1 0.3 0.1 0.4 0 0.8-0.3 0.9-0.7l0.3-0.9c0.2-0.5-0.1-1.1-0.6-1.3C1.9 20.3 1.8 20.2 1.7 20.2L1.7 20.2zM9 21c-0.6 0-1 0.4-1 1v1c0 0.6 0.4 1 1 1 0.6 0 1-0.4 1-1v-1C10 21.5 9.6 21 9 21L9 21z">
                                        </path>
                                    </svg>
                                    <span>2</span>
                                </div>

                            </div>
                        </div>


                        <div class="rh_ultra_prop_card__meta">
                            <div class="icon_and_info_wrapper">
                                <div class="icon-label">
                                    Area </div>
                                <div class="bottom_content">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        class="icon">
                                        <path class="ultra-meta rh-ultra-dark"
                                            d="M19.2 2L22 4.8v0.3L19.2 8l-1.4-2.9L17.7 5l0.1-0.1L19.2 2M5 17.7l0.1 0.1L8 19.2 5.2 22H4.8L2 19.2l2.9-1.4L5 17.7M20 0h-2l-2 4H4v12l-4 2v2l4 4h2l4-4v-2l-4-2V6h10l2 4h2l4-4V4L20 0 20 0zM24 10h-2v2h2V10L24 10zM24 14h-2v2h2V14L24 14zM24 18h-2v2h2V18L24 18zM24 22h-2v2h2V22L24 22zM20 22h-2v2h2V22L20 22zM16 22h-2v2h2V22L16 22zM12 22h-2v2h2V22L12 22z">
                                        </path>
                                    </svg>
                                    <span>2</span>
                                </div>

                            </div>
                        </div>




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

                    <h1>Descrição</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing corporis, quae, nemo sunt commodi error optio rem
                        magni ipsam. Ea pariatur sed provident? Ducimus, placeat, rem voluptas iure corrupti et quae
                        doloremque
                        sapiente voluptatem quos at dolores repellat pariatur voluptatum recusandae?</p>
                    <div class="price">R$ {{ card.formattedPrice }} {{ card.suffix }}</div>


                    <div>
                        <h1>Property Details</h1>
                        <table class="property-table">
                            <tr class="row-light">
                                <td><strong>ID do cartão:</strong></td>
                                <td>{{ card.id }}</td>
                            </tr>
                            <tr class="row-dark">
                                <td><strong>Price:</strong></td>
                                <td>R$ {{ card.formattedPrice }} {{ card.suffix }}</td>
                            </tr>
                            <tr class="row-light">
                                <td><strong>Address:</strong></td>
                                <td>{{ card.street }}, {{ card.streetNumber }}, {{ card.neighborhood }}, {{ card.city }}, {{
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



                        <div id="map">a</div>

                    </div>



                </div>

            </div>






            <!-- <h1>Property Details</h1>
<p><strong>ID do cartão:</strong> {{ card.id }}</p>
<p><strong>Price:</strong> R$ {{ card.formattedPrice }} {{ card.suffix }}</p>
<p><strong>Address:</strong> {{ card.street }}, {{ card.streetNumber }}, {{ card.neighborhood }}, {{
card.city }}, {{ card.state }}, {{ card.country }}</p>
<p><strong>Zip Code:</strong> {{ card.zipCode }}</p>
<p><strong>Usable Area:</strong> {{ card.usableAreas[0] }} sqm</p>
<p><strong>Yearly IPTU:</strong> R$ {{ card.pricingInfos[0].yearlyIptu }}</p>
<p><strong>Monthly Condo Fee:</strong> R$ {{ card.pricingInfos[0].monthlyCondoFee }}</p>
<p><strong>Usage Types:</strong> {{ card.usageTypes.join(', ') }}</p>
<p><strong>Unit Types:</strong> {{ card.unitTypes.join(', ') }}</p> -->



        </div>

    </DefaultLayout>
</template>
<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import data from '@/data.json';
import mapboxgl from 'mapbox-gl';

export default {











    mounted() {
        // Initialize the map
        mapboxgl.accessToken =
            'pk.eyJ1Ijoiem93eWUiLCJhIjoiY2xqeDAwM2F5MDFoMDNlcGx3c2RqZ3ZldyJ9.BgqylKNWVF6Io-dSx4o54Q';


        const map = new mapboxgl.Map({
            container: 'map',
            zoom: 14,
            center: [-45.3587, -23.7781],
            pitch: 80,
            bearing: 41,
            style: 'mapbox://styles/mapbox/streets-v11', // Use 'streets-v11' style for a simple map
        });

        // Add the PIN (marker) at the center of Ilhabela

        map.on('style.load', () => {
            map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14,
            });
            // Add the DEM source as a terrain layer with exaggerated height
            map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.4 });
        });

    },


























    methods: {
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
            const pattern = ['image-wide image-tall', '', '', '', '', 'image-wide'];
            return 'image_container ' + pattern[index % pattern.length];
        }
    },
    components: {
        DefaultLayout,
    },
    data() {
        return {
            card_images: [],
            card: null
        };
    },
    created() {
        window.scrollTo(0, 0);

        this.card = data.find(item => item.id === this.$route.params.id);

        if (this.card) {
            this.card_images = this.card.medias.slice(0, 6).map(

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
    height: 500px;
}

.price {
    font-size: 3em;
}

#icons_blocks_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    gap: 0.5em;
    
}

#info_wrapper {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 60%;
    padding: 1em;
    height: 100%;
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
    background-color: var(--card-background);

    border-radius: 2em;
    display: flex;
    flex-direction: row;
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
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    width: 65%;
    border-radius: 0.4em;
}

.gallary_container {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
    background-color: var(--card-background);
    border-radius: 1em;
    display: grid;
    grid-gap: 0.2em;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-rows: 100px;
    width: 40%;
    padding: 10px;
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
    justify-content: end;
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
    color:white;
}

.limegreen {
    background-color: rgb(156, 205, 50);
    color: rgb(255, 255, 255);
}

.yellow{
    background-color: rgb(248, 186, 29);
    color:white;
}
</style>