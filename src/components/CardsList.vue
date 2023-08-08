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
                <li :class="activeMap ? 'active' : ''" @click="ToggleActivateMap()">
                    <i class="fas fa-map"></i>
                </li>
                <li :class="isExtraFiltersVisible ? 'active' : ''" @click="toggleExtraFiltersVisibility()">
                    <i class="fa fa-filter"></i>
                </li>


            </ul>
        </div>
        <div id="main_wrapper">

            <div id="extra_filters" v-if="isExtraFiltersVisible">
                <div id="extra_filters_top_content">
                    <button class="btn-close-extra-filters" @click="toggleExtraFiltersVisibility()"><i
                            class="fas fa-times"></i></button>
                    <div class="extra_filters_title">Extra Filters</div>
                    <!-- Number of rooms filter -->
                </div>
                <div class="filter-section">
                    <p>Number of rooms</p>
                    <div class="radio-group">
                        <input type="radio" id="oneRoom" name="rooms" value="1">
                        <label for="oneRoom">1 room</label>

                        <input type="radio" id="twoRooms" name="rooms" value="2">
                        <label for="twoRooms">2 rooms</label>

                        <input type="radio" id="threeRooms" name="rooms" value="3">
                        <label for="threeRooms">3 rooms</label>

                        <input type="radio" id="fourRooms" name="rooms" value="4+">
                        <label for="fourRooms">4+ rooms</label>
                    </div>
                </div>

                <div class="filter-section">
                    <p>Number of Bathrooms</p>
                    <div class="radio-group">
                        <input type="radio" id="oneBath" name="bathrooms" value="1">
                        <label for="oneBath">1 Bathroom</label>

                        <input type="radio" id="twoBath" name="bathrooms" value="2">
                        <label for="twoBath">2 Bathrooms</label>

                        <input type="radio" id="threeBath" name="bathrooms" value="3">
                        <label for="threeBath">3 Bathrooms</label>

                        <input type="radio" id="fourBath" name="bathrooms" value="4+">
                        <label for="fourBath">4+ Bathrooms</label>
                    </div>
                </div>

                <!-- Amenities filter -->
                <div class="filter-section">
                    <p>Amenities</p>

                    <div class="checkbox-group">
                        <input type="checkbox" id="pool" name="amenities" value="pool">
                        <label for="pool">Pool</label>

                        <input type="checkbox" id="kitchen" name="amenities" value="gourmet-kitchen">
                        <label for="kitchen">Gourmet Kitchen</label>

                        <input type="checkbox" id="garden" name="amenities" value="garden">
                        <label for="garden">Garden</label>

                        <input type="checkbox" id="garage" name="amenities" value="garage">
                        <label for="garage">Garage</label>

                        <input type="checkbox" id="balcony" name="amenities" value="balcony">
                        <label for="balcony">Balcony</label>

                        <input type="checkbox" id="gym" name="amenities" value="gym">
                        <label for="gym">Gym</label>

                        <input type="checkbox" id="spa" name="amenities" value="spa">
                        <label for="spa">Spa</label>

                        <input type="checkbox" id="fireplace" name="amenities" value="fireplace">
                        <label for="fireplace">Fireplace</label>

                        <input type="checkbox" id="basement" name="amenities" value="basement">
                        <label for="basement">Basement</label>

                        <input type="checkbox" id="rooftop" name="amenities" value="rooftop">
                        <label for="rooftop">Rooftop Terrace</label>

                        <input type="checkbox" id="elevator" name="amenities" value="elevator">
                        <label for="elevator">Elevator</label>

                        <input type="checkbox" id="library" name="amenities" value="library">
                        <label for="library">Library</label>
                    </div>
                </div>
            </div>

            <div id="wrapper_cards">
                <div class="card-list">
                    <!-- Loop pelos dados do arquivo data.json -->
                    <component v-for="card in items" :key="card.id" :is="activeTab === 'small' ? 'CardSmall' : 'CardLarge'"
                        :card="card" :cardWidth="cardWidth" @card-more-info="openCardMoreInfo" />
                </div>
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
            isExtraFiltersVisible: true,
            activeTab: 'small',
            activeMap: false,
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
        toggleExtraFiltersVisibility() {
            this.isExtraFiltersVisible = !this.isExtraFiltersVisible;
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
        ToggleActivateMap() {
            this.activeMap = !this.activeMap;
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
#main_wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
}



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











/* 
#extra_filters {
    margin-left: 3em;
    padding: 1em;
    box-sizing: border-box;
    margin-top: 1em;
    background-color: rgb(255, 255, 255);
    border-radius: 0.8em;
    min-width: 20em;
    flex: 0 0 15%;
} */


#extra_filters {
    display: flex;
    flex-direction: column;
    margin-left: 3em;
    padding: 1em;
    box-sizing: border-box;
    margin-top: 1em;
    background-color: var(--app-bg-color);
    border-radius: 0.8em;
    min-width: 20em;
    flex: 0 0 15%;
}


#extra_filters input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.filter-section {
    margin-bottom: 1em;
    padding: 0.5em;
    border: 1px solid var(--cor-base);
    /* You can adjust this as needed for the theme */
    border-radius: 0.5em;
}

.filter-section p {
    color: var(--cor-base);
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 0.5em;
}

.extra_filters_title {
    margin-left: 1em;
    font-size: 1.3em;

    color: var(--cor-base);
    font-weight: bold;
    margin-bottom: 0.5em;
}

.radio-group {
    display: flex;
    flex-direction: column;
}



.checkbox-group {
    display: flex;
    align-content: start;
    flex-wrap: wrap;
    gap: 0.3em;
}

/* Adjustments for the labels to fit the navyblue/white theme */
.radio-group label {
    color: var(--cor-base);
    cursor: pointer;
    padding: 0.5em 1em;

}


.checkbox-group label {
    display: inline-flex;
    align-items: center;
    padding: 0.2em 0.5em;
    border-radius: 1em;
    background-color: rgba(194, 194, 194, 0.2);
    cursor: pointer;
}




.radio-group input[type="radio"]:checked+label {
    background-color: var(--cor-base);
    color: white;
    border-radius: 0.5em;
}


.checkbox-group input[type="checkbox"]:checked+label {
    background-color: var(--cor-base);
    color: white;
}


.checkbox-group label:hover {
    background-color: rgba(168, 168, 171, 0.7);
    /* Adjust the navy blue shade for hover */
}

.checkbox-group input[type="checkbox"]:checked+label:hover {
    background-color: rgba(148, 148, 151, 0.9);
    /* A slightly different shade for checked items when hovered */
}



.radio-group label:hover {
    background-color: rgba(194, 194, 194, 0.7);
    transition: background-color 0.3s ease;
    border-radius: 0.5em;

}

/* Also, to have a different hover effect for already checked items: */
.radio-group input[type="radio"]:checked+label:hover {
    background-color: rgba(194, 194, 194, 0.7);
    border-radius: 0.5em;

}


#extra_filters_top_content {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
}

.btn-close-extra-filters {
    cursor: pointer;
    background-color: rgb(224, 224, 224);
    border: none;
    padding: 1em;
    border-radius: 0.4em;
    margin-bottom: 1em;
}

.btn-close-extra-filters:hover {
    cursor: pointer;
    background-color: var(--cor-base);
    color: white;
    border: none;
    padding: 1em;
    margin-bottom: 1em;
}


/* For responsiveness, you might want to adjust the layout or font sizes on smaller screens */
@media (max-width: 768px) {
    #extra_filters {
        min-width: auto;
        width: 100%;
        margin-left: 0;
    }

    .filter-section {
        font-size: 0.9em;
    }
}
</style>
