<template>
    <div id="wrapper_card_list_full">
        <div id="main_wrapper">
            <div id="wrapper_cards">

                <div class="section-separator"></div>
                <h2>Mais casas no {{ neigh }}</h2>

                <div class="card-list">
                    <CardSmallWithContext v-for="card in items" :key="card.id" :card="card" />
                </div>
                <div id="pagination">
                    <button @click="prevPage" :disabled="currentPage <= 1">Anterior</button>
                    <span>Página {{ currentPage }}</span>
                    <button @click="nextPage">Próximo</button>
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
            currentPage: 1, // Página atual
            itemsPerPage: 10 // Quantidade de itens por página
        };
    },

    props: {
        cardWidth: {
            type: String,
            default: '100px',
        },
        neigh: {
            type: String,
            default: "Villa"
        }
    },
    methods: {
        nextPage() {
            this.currentPage++;
            this.loadItems();
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadItems();
            }
        },
        loadItems() {

            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;


            this.items = data
                .filter(item => item.neighborhood === this.neigh)
                .slice(start, end)  // use the dynamic start and end
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
        },
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
        ...mapState(['activeMap']),
        hasNextPage() {
            return (this.currentPage * this.itemsPerPage) < data.filter(item => item.neighborhood === this.neigh).length;
        }
    },


    created() {
        this.loadItems();


    }
};
</script>


<style scoped>



.section-separator {
    width: 100%;
    content: "";
    display: block;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 253, 253, 0), rgb(200, 199, 199), rgba(224, 224, 224, 0));
    margin-top: 5em;
    margin-bottom: 2em;
}

#wrapper_cards {
    width: 100%;
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-bottom: 1em;
}

#pagination {
    margin-top: 2em;
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
}

#pagination button {
    padding: 1em 3em;
    border: none;
    color: white;
    font-weight: 300;
    border-radius: 0.5em;
    background-color: var(--cor-base);
    cursor: pointer;
}

#pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Estilos para os cards */
.card-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1em;
}

.card-list .CardSmallWithContext {
    min-width: 200px;
    max-width: 300px;
}

#main_wrapper {
    width: 100%;
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
