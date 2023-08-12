<template>
    <div id="wrapper_card_list_full">
        <div id="main_wrapper">
            <div id="wrapper_cards">
                <h2>Mais casas no {{ neigh }}</h2>

                <div class="card-list">
                    <CardSmallWithContext v-for="card in items" :key="card.id" :card="card" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// import CardAmenities from '@/components/CardAmenities.vue';
// import CardStars from "@/components/CardStars.vue";
import data from '@/data.json';
import { mapActions } from 'vuex';
import CardSmallWithContext from "@/components/cards/CardSmallWithContext.vue";
import { mapState, mapMutations } from 'vuex';


export default {
    components: {
        CardSmallWithContext,
    },
    data() {
        return {
            items: [],
            selectedCard: null,
        };
    },
    props: {
        cardWidth: {
            type: String,
            default: '100px',
        },
        neigh: {
            type: String,
            default: "Bairro"
        }
    },
    methods: {
        ...mapMutations(['TOGGLE_ACTIVE_MAP']),

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
        ...mapActions(['updateHouseInfo']),
        SetFocusHouse(card) {
            this.updateHouseInfo(card);
        },

    },
    computed: {
        ...mapState(['activeMap'])
    },


    created() {
        const offset = 10;
        const startIndex = Math.floor(Math.random() * (data.length - offset + 1));
        const endIndex = startIndex + offset;

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
                item.title = this.gerarTituloAleatorio();
                item.streetNumber = item.streetNumber === null || item.streetNumber === undefined || item.streetNumber === "" ? "s/n" : item.streetNumber;
                item.street = item.street === null || item.street === undefined || item.street === "" ? "Sem Endereço" : item.street.replace("Avenida", "Av.").replace("Alameda", "Al.");
                item.neighborhood = item.neighborhood === null || item.neighborhood === undefined || item.neighborhood === "" ? "Sem Endereço" : item.neighborhood;
                item.price = item.pricingInfos[0].price

                return { ...item, card_images: card_images };
            });
    }
};
</script>


<style scoped>
#wrapper_cards {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

/* Estilos para os cards */
.card-list {
    gap: 1em;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

#main_wrapper {
    display: flex;
    flex-direction: row;
}

#wrapper_card_list_full {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--app-bg-color);
}
</style>
