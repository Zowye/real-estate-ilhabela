<template>
    <div class="card-featured" v-show="isVisible" v-if="shouldShowCardFeatured">
        <div class="medal">NOVA</div>
        <button @click="closeCard" class="close-btn-card-featured">
            <div class="close-icon">
                <i class="fas fa-times"></i>
            </div>
        </button>
        <div class="image-container">
            <div :class="overlayClass"></div>
            <img :src="featured_data.card_images[currentIndex]" :alt="featured_data.title" @load="onImageLoaded" />
        </div>
        <div class="info-container">
            <CardStars :rating="featured_data.stars_count" />
            <div class="title">Amazing House in Ilhabela</div>
            <div id="topInfos" class="inner_cardcard_padding">
                <IconPin :width="16" :height="16" />
                <div class="card_address"> {{ featured_data.street }}, {{ featured_data.streetNumber }}
                </div>

            </div>
            <div class="neigh">
                {{ featured_data.neighborhood }}</div>
            <CardCommonInfo />
            <div class="price">R$ {{ featured_data.formattedPrice }} {{ featured_data.suffix }} </div>
            <div class="description">{{ truncateDescription(featured_data.description_full) }}</div>
            <router-link :to="`/house_explorer/${featured_data.id}`">
                <button class="see-more-btn ">Ver Mais</button>
            </router-link>

            <div class="amenities">
                <CardAmenities :amenities="featured_data.amenities" />
            </div>


        </div>
    </div>
</template>
  
<script>
import CardAmenities from '@/components/CardAmenities.vue';
import CardCommonInfo from '@/components/CardCommonInfo.vue';
import IconPin from "@/components/icons/IconPin.vue";
import CardStars from "@/components/CardStars.vue";
import { mapState } from "vuex"; // Import the mapState helper from Vuex


export default {
    data() {
        return {
            isVisible: true,
            currentIndex: 0,
            timer: null, // adicione esta linha
            isFlashing: false, // Define se o overlay deve fazer o efeito flash ou não
        };
    },
    props: {
        featured_data: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.startTimer();
    },
    components: {
        CardAmenities,
        CardCommonInfo,
        IconPin,
        CardStars
    },

    methods: {
        onImageLoaded() {
            // Quando a imagem é carregada, ative o efeito flash
            this.isFlashing = true;

            // Aguarde um pouco (igual ao tempo da animação, 1s no exemplo) e desative o efeito flash
            setTimeout(() => {
                this.isFlashing = false;
            }, 1000);
        },
        changeCurrentIndex() {
            this.currentIndex++;
            if (this.currentIndex >= this.featured_data.card_images.length) {
                this.currentIndex = 0;
            }
        },
        beforeDestroy() {
            // Limpe o timer quando o componente for destruído
            clearInterval(this.timer);
        },
        startTimer() {
            // Defina o timer para atualizar currentIndex a cada 3 segundos
            this.timer = setInterval(this.changeCurrentIndex, 3000);
        },
        truncateDescription(description) {
            if (description && description.length > 300) {
                return description.slice(0, 180) + '...';
            }
            return "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quae, architecto obcaecati nihil vero nemo doloremque omnis iusto aut, earum, placeat sit blanditiis. Ea, quis. Dignissimos quod possimus ex ab.";
        },
        closeCard() {
            this.isVisible = false;
        },
        // rest of the code
    },
    computed: {
        overlayClass() {
            return this.isFlashing ? 'overlay flash' : 'overlay';
        },
        // Map the isMobile and isTablet variables from the store to the component's computed properties
        ...mapState({
            isMobile: (state) => state.isMobile,
            isTablet: (state) => state.isTablet,
        }),
        // Compute a new property based on the isMobile and isTablet values
        shouldShowCardFeatured() {
            // Adjust the condition based on your requirements
            return !(this.isMobile || this.isTablet);
        },
    },


};
</script>
  
<style scoped>
.medal {
    position: absolute;
    top: 0;
    right: 5em;
    transform-origin: 100% 0;
    transform: rotate(-90deg);
    background-color: #a6cf9d;
    color: white;
    padding: 0.3em 0.3em 0.3em 0.8em;
    font-family: 'Ysabeau Office', sans-serif;
    font-size: 1.4em;
    border-radius: 8px 0px 0px 8px;
}

.card-featured {
    width: 50%;
    position: relative;
    height: auto;
    display: flex;
    flex-direction: row;
    padding: 1em 1em;
    border-right: 1px solid rgba(128, 128, 128, .2);
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: rgba(128, 128, 128, 0.2);
    border-bottom: 1px solid rgba(128, 128, 128, .2);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: rgba(128, 128, 128, 0.2);
    margin-bottom: 5em;
    border-radius: 1.2em;
    background-color: var(--card-background);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
}




.card_address {
    font-size: 1.2rem;
}

#topInfos {
    justify-content: flex-start;
    margin-top: 1em;
    align-items: center;
    display: flex;
    /* border-bottom-left-radius: 0.8em;
  border-bottom-right-radius: 0.8em; */

}

.image-container {
    position: relative;
    flex: 1;
    height: 500px;
    border-radius: 0.7em;
    /* apenas por precaução */
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 500px;
    object-fit: cover;
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


.info-container {
    flex: 1;
    justify-content: center;
    padding: 16px;
}



.title {
    color: var(--cor-base);
    font-family: 'Francois One', sans-serif;
    font-size: 2.2em;
}


.price {
    font-family: 'Francois One', sans-serif;
    font-size: 1.5em;
    color: var(--cor-base);
}

.description {
    margin-bottom: 16px;
}

.amenities {
    margin-top: 1em;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.see-more-btn {
    color: var(--cor-base);
    border: 2px solid var(--cor-base);
    border-radius: 1em;
    padding: 0.5em 3em;
    font-size: 1.2em;
    font-weight: 700;
    cursor: pointer;
    background-color: white;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.1s ease;
}

.see-more-btn:hover {
    color: #fff;
    background-color: var(--cor-base);
}

.close-btn-card-featured {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    border-radius: 0.2em;
    background-color: var(--cor-base-inverse);
    color: var(--cor-base);
    font-size: 1rem;
    cursor: pointer;
    padding: 5px;
    line-height: 1;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;

}


.close-icon {
    transition: transform 0.3s ease !important;
}


.close-btn-card-featured:hover .close-icon {
    transform: scale(1.4) rotate(10deg);
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
}</style>