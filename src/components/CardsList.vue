<template>
    <CardMoreInfo v-if="showModal" :card="selectedCard" @close="closeModal" />
    <CardFeatured v-if="show_featured_card" :featured_data="card_featured" />

    <div id="wrapper_card_list_full">


        <!-- Change the Cards Presentation Format -->
        <div id="card_presentation_aspect">
            <ul class="nav nav-pills nav-pill-rounded" id="tab-34" role="tablist">
                <li :class="{ active: activeTab === 'large' }" @click="activateTab('large')">
                    <i class="fas fa-th-list"></i>
                </li>
                <li :class="{ active: activeTab === 'small' }" @click="activateTab('small')">
                    <i class="fas fa-th-large"></i>
                </li>
            </ul>
        </div>


        <div id="wrapper_cards">
            <div class="card-list">
                <!-- Loop pelos dados do arquivo data.json -->
                <component v-for="card in items" :key="card.id" :is="activeTab === 'small' ? 'CardSmall' : 'CardLarge'"
                    :card="card" :cardWidth="cardWidth" @card-more-info="openCardMoreInfo" />
            </div>
        </div>
    </div>
</template>

<script>

// import CardAmenities from '@/components/CardAmenities.vue';
// import CardStars from "@/components/CardStars.vue";
import CardFeatured from '@/components/CardFeatured.vue';
import data from '@/data.json';
import CardMoreInfo from '@/components/CardMoreInfo.vue';
import { mapActions } from 'vuex';
import CardSmall from "@/components/cards/CardSmall.vue";
import CardLarge from "@/components/cards/CardLarge.vue";


export default {
    components: {
        CardFeatured,
        // CardStars,
        CardMoreInfo,
        CardSmall,
        CardLarge
    },
    data() {
        return {
            activeTab: 'small',
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
        activateTab(tab) {
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
    background-color: var(--app-bg-color);
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



.description {
    color: var(--cor-base);
    font-family: 'Ysabeau Office', sans-serif;
    font-size: 1.2em;
}
</style>
