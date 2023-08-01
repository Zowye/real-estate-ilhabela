<template>
    <CardMoreInfo v-if="showModal" :card="selectedCard" @close="closeModal" />
    <div id="wrapper_card_list_full">

        <CardFeatured v-if="show_featured_card" :featured_data="card_featured" />
        <div id="card_presentation_aspect">
            <ul class="nav nav-pills nav-pill-rounded" id="tab-34" role="tablist">
                <li :class="{ active: activeTab === 'list' }" @click="activateTab('list')">
                    <i class="fas fa-th-list"></i>
                </li>
                <li :class="{ active: activeTab === 'large' }" @click="activateTab('large')">
                    <i class="fas fa-th-large"></i>
                </li>
            </ul>
        </div>

        <div id="wrapper_cards">
            <div class="card-list">

                <!-- Loop pelos dados do arquivo data.json -->

                <div v-for="card in items" :key="card.id" class="card" :style="{ width: cardWidth }">
                    <router-link :to="`/house_explorer/${card.id}`">

                        <CardPhotoViewer :images="card.card_images" :status_level="card.status_level" />
                    </router-link>

                    <div class="cardInfos">
                        <!-- <CardStars :rating="card.stars_count" /> -->
                        <div class="card_title" @click="SetFocusHouse(card)">{{ card.title }}</div>
                        <div id="topInfos" class="inner_cardcard_padding">
                            <IconPin :width="14" :height="14" />
                            <div class="card_address"> {{ card.street }}, {{ card.streetNumber }} </div>
                        </div>

                        <div class="neigh">{{ card.neighborhood }}</div>




                        <div id="bottomInfos" class="inner_card_padding">

                            <CardCommonInfo />


                            <!-- <p class="description">{{ card.description }}</p> -->


                            <!-- 
                        <div class="button-group">
                            <button class="ver-mais-button" @click="openCardMoreInfo(card)">Comparar</button>
                            <button class="olhadela-button" @click="openCardMoreInfo(card)">Visão Rápida</button>
                        </div> -->

                            <!-- <CardAmenities :amenities="card.amenities" /> -->

                        </div>
                    </div>
                    <div id="card-footer">

                        <div> <span class="monetary"><span class="currency_name">R$</span> </span><span
                                class="monetary_value_number">{{ card.formattedPrice }}</span><span
                                class="monetary_value_string">{{ card.suffix }}</span>
                        </div>
                        <div class="buttons_fav">VER MAIS</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import CardPhotoViewer from '@/components/CardPhotoViewer.vue';
// import CardAmenities from '@/components/CardAmenities.vue';
import CardCommonInfo from '@/components/CardCommonInfo.vue';
import IconPin from "@/components/icons/IconPin.vue";
// import CardStars from "@/components/CardStars.vue";
import CardFeatured from '@/components/CardFeatured.vue';
import data from '@/data.json';
import CardMoreInfo from '@/components/CardMoreInfo.vue';
import { mapActions } from 'vuex';


export default {
    components: {
        CardPhotoViewer,
        CardFeatured,
        CardCommonInfo,
        IconPin,
        // CardStars,
        CardMoreInfo
    },
    data() {
        return {
            activeTab: 'list',
            items: [],
            card_featured: {
                medias: [], // lista de strings
                price: '', // string
                description: '' // string
            },
            showModal: false,
            selectedCard: null
        };
    },
    props: {
        cardWidth: {
            type: String,
            default: '400px',
        },
        show_featured_card: Boolean,
    },
    methods: {
        activateTab(tab){
            this.activeTab = tab;
        },
        ...mapActions(['updateHouseInfo']),
        SetFocusHouse(card) {
            this.updateHouseInfo(card);
        },
        openCardMoreInfo(card) {
            console.log("Called for: ", card.title)
            this.selectedCard = card;
            this.showModal = true;
        },
        closeModal() {
            this.selectedCard = null;
            this.showModal = false;
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


        gerarTituloAleatorio() {
            const string1 = ["Luxuosa", "Linda", "Aconchegante", "Belíssimo", "Confortável", "Novíssimo", "Luxuosa"];
            const string2 = ["Flat", "Casa", "Sítio", "Apartamento"];
            const randomIndex1 = Math.floor(Math.random() * string1.length);
            const randomIndex2 = Math.floor(Math.random() * string2.length);
            const randomString1 = string1[randomIndex1];
            const randomString2 = string2[randomIndex2];
            return `${randomString1} ${randomString2}`;
        },
        getRandomStatusLevel() {
            const string1 = ["Antigo", "Em Alta", "Novo"];
            const randomIndex1 = Math.floor(Math.random() * string1.length);
            const randomString1 = string1[randomIndex1];
            return `${randomString1}`;
        }

    },


    created() {
        // Defining Card Featured:
        // const FEATURED_INDEX = 15;
        // this.card_featured.medias = data[FEATURED_INDEX].medias;
        // this.card_featured.price = data[FEATURED_INDEX].pricingInfos[0].price;
        // this.card_featured.description = data[FEATURED_INDEX].description;


        const startIndex = Math.floor(Math.random() * (data.length - 20 + 1));
        const endIndex = startIndex + 20;


        this.items = data
            .slice(startIndex, endIndex)
            .map(item => {

                const card_images = item.medias.map(
                    media => media.url
                        .replace("{action}", "fit-in")
                        .replace("{width}", "870")
                        .replace("{height}", "653")
                )
                    .filter(url => !url.includes('youtube') && !url.includes('youtu'));

                // Fixing Pricing Information
                let [formattedPrice, suffix] = this.formatPrice(item.pricingInfos[0].price)
                item.formattedPrice = formattedPrice;
                item.suffix = suffix;


                item.status_level = this.getRandomStatusLevel();


                // Fixing amenities items
                item.amenities = item.amenities.map((a) => {
                    return a.replace("_", " ")
                })

                if (item && item.amenities && item.amenities.length > 0 && item.amenities.length > 8) {
                    item.amenities = item.amenities.slice(0, 7);
                    item.amenities.push("... VER MAIS")
                } else {
                    item.amenities = ["Sem Itens"]
                }


                item.stars_count = Math.floor(Math.random() * 11);


                item.title = this.gerarTituloAleatorio();
                item.streetNumber = item.streetNumber === null || item.streetNumber === undefined || item.streetNumber === "" ? "s/n" : item.streetNumber;
                item.street = item.street === null || item.street === undefined || item.street === "" ? "Sem Endereço" : item.street.replace("Avenida", "Av.").replace("Alameda", "Al.");
                item.neighborhood = item.neighborhood === null || item.neighborhood === undefined || item.neighborhood === "" ? "Sem Endereço" : item.neighborhood;

                // Fixing the mal-formation of the description, e.g: uppercase, \n, etc 
                item.description = item.description
                    ? item.description
                        .replace(/\n/g, "")
                        .replace(/<\/?br\/?>/g, "")
                        .replace(/<?b\/?>/g, "")
                        .toLowerCase()
                        .replace(/(^|[.!?]\s+)(\w)/g, function (match, p1, p2) {
                            return p1 + p2.toUpperCase();
                        })
                        .replace(/([.!?]\s+)(\p{Ll})/gu, function (match, p1, p2) {
                            return p1 + p2.toUpperCase();
                        })
                        .replace(/!+/g, "!")

                    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, iste obcaecati.";


                if (item.description.length > 120) {
                    item.description_full = item.description;
                    item.description = item.description.slice(0, 120) + " (...) "
                }
                item.price = item.pricingInfos[0].price

                return { ...item, card_images: card_images };
            });



        const most_expansive_house = this.items.reduce((prev, current) => {
            const prevPrice = parseFloat(prev.price);
            const currentPrice = parseFloat(current.price);
            return (currentPrice > prevPrice) ? current : prev;
        }, this.items[0]);


        this.card_featured = most_expansive_house;
    }
};
</script>


<style>
#wrapper_card_list_full {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#card_presentation_aspect {
    margin-bottom: 2em;
    width: 80%;
    height: 50px;
}

#card_presentation_aspect ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}

#card_presentation_aspect li {
    cursor: pointer;
    display: inline-block;
    margin-right: 1em;
    font-size: 1.8em;
    color: var(--cor-base);
    padding: 0.3em;
    border-radius: 0.5em;
    border: 2px solid transparent;
    /* Add this line */
    transition: all 200ms;

}

#card_presentation_aspect li:hover {
    border: 2px solid var(--cor-base);
}

#card_presentation_aspect li.active {
    color: white;
    background-color: var(--cor-base);
}



* {
    user-select: none;
}

#home-page-container {
    margin-top: 100px;
    justify-content: center;
}


#wrapper_cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* Estilos para os cards */
.card-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}


.card {
    cursor: pointer;
    position: relative;
    background-color: var(--card-background);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
    margin: 1em;
    width: 400px;
    border-radius: 0.7em;
    border-top-left-radius: 1.2em;
    border-top-right-radius: 1.2em;
    border-right: 1px solid rgba(128, 128, 128, .2);
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: rgba(128, 128, 128, 0.2);
    border-bottom: 1px solid rgba(128, 128, 128, .2);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgba(128, 128, 128, 0.2);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.09);
    overflow: hidden;
    margin-bottom: 5em;
}


#card-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    bottom: 0px;
    border: .0625rem solid var(--card-footer-border-color);
    border-bottom-left-radius: 0.8em;
    border-bottom-right-radius: 0.8em;
    background-color: var(--card-footer);
    padding: 1em;
    color: #424767;
}


/*     
.card {
    cursor: pointer;
    position: relative;
    background-color: white;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
    margin: 1em;
    width: 400px;
    border-radius: 1.2em;
    overflow: hidden;
} */


/* 
.card img {
    width: 100%;
    border-radius: 1.2em;
    border-top-left-radius: 1.2em;
    border-top-right-radius: 1.2em;
    border-bottom-left-radius: 0em;
    border-bottom-right-radius: 0em;
    height: 250px;
    background: linear-gradient(rgba(235, 46, 46, 0), rgba(255, 255, 255, 0.4));
    object-fit: cover;
} */


.cardInfos {
    padding: 0.3em 1.4em;
}



#topInfos {
    justify-content: flex-start;
    align-items: center;
    display: flex;
    /* border-bottom-left-radius: 0.8em;
    border-bottom-right-radius: 0.8em; */

}

#bottomInfos {}

.card_title {
    margin-top: 1.7em;
    font-family: var(--font-text);
    color: var(--cor-text-base);
    line-height: 1em;
    margin-bottom: 0.7em;
    font-weight: 500;
    font-size: 1.48em;
}


.card_address {
    font-family: var(--font-text);
    line-height: 1em;
    font-size: 0.95em;
    color: var(--cor-text-base);
    font-weight: 100;
    margin-left: 0.55em;
    font-weight: 400;
}

.bold {
    font-weight: 400;
}

.neigh {
    display: inline-block;
    font-weight: 200;
    margin-top: 0.5em;
    padding: 0.35em 0.85em;
    color: white;
    border-radius: 1.5em;
    font-size: 0.90em;
    background-color: var(--cor-base);
}


.monetary,
.monetary_value_number,
.monetary_value_string {
    color: var(--cor-text-base);
    font-family: var(--font-text);
    font-size: 1.4em;
    font-weight: 500;
}

.monetary_value_string {
    margin-left: 3px;
}

.currency_name {
    margin-right: 0.2em;
    font-weight: 300;
    font-size: 0.6em;
}


.description {
    color: var(--cor-base);
    font-family: 'Ysabeau Office', sans-serif;
    font-size: 1.2em;
}

.button-group {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.ver-mais-button,
.olhadela-button {
    background-color: var(--button-background);
    color: #777;
    border: none;
    border-radius: 1em;
    padding: 1em 3em;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.1s ease;
}

.ver-mais-button:hover,
.olhadela-button:hover {
    background-color: #e0e0e0;
    border-color: #999;
}

.ver-mais-button:focus,
.olhadela-button:focus {
    outline: none;
}

.ver-mais-button {
    flex-grow: 1;
}

.olhadela-button {
    margin-left: 10px;
}


.whatsapp-button {
    display: inline-block;
    width: 23px;
    height: 23px;
    color: #44d579;
    border-radius: 50%;
    text-decoration: none;
    font-size: 1.3em;
}
</style>
