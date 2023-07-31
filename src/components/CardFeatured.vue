<template>
    <div class="card-featured" v-show="isVisible" v-if="shouldShowCardFeatured">
        <div class="medal">NOVA</div>
        <button @click="closeCard" class="close-btn">
            <i class="fas fa-times"></i>
        </button>
        <div class="image-container">
            <img :src="featured_data.card_images[0]" :alt="featured_data.title" />
        </div>
        <div class="info-container">
            <CardStars :rating="featured_data.stars_count" />
            <div class="title">Amazing House in Ilhabela</div>
            <div id="topInfos" class="inner_cardcard_padding">
                <IconPin :width="16" :height="16" />
                <div class="card_address"> {{ featured_data.street }}, {{ featured_data.streetNumber }} <div class="neigh">
                        {{ featured_data.neighborhood }}</div>
                </div>
            </div>
            <CardCommonInfo />
            <div class="price">R$ {{ featured_data.formattedPrice }} {{ featured_data.suffix }} </div>
            <div class="description">{{ truncateDescription(featured_data.description_full) }}</div>
            <div class="amenities">
                <CardAmenities :amenities="featured_data.amenities" />
            </div>

            <button class="ver-mais-button2">Ver Mais</button>

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
            // rest of the data properties...
        };
    },
    props: {
        featured_data: {
            type: Object,
            required: true
        }
    },
    components: {
        CardAmenities,
        CardCommonInfo,
        IconPin,
        CardStars
    },
    methods: {
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
    height: 400px;
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
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.01);

    margin-bottom: 5em;
    border-radius: 1.2em;
    background-color: var(--card-background);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.10);
}


#topInfos {
    justify-content: flex-start;
    align-items: center;
    display: flex;
    /* border-bottom-left-radius: 0.8em;
  border-bottom-right-radius: 0.8em; */

}

.image-container {
    flex: 1;
    height: 100%;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    border-radius: 0.7em;
    object-fit: cover;
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
    color: var(--cor-pastel);
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

.ver-mais-button2 {
    display: inline-block;
    background-color: #ae9ae3;
    color: #333;
    border: none;
    border-radius: 4px;
    padding: 10px;
    color: white;
    font-size: 1.2em;
    margin-top: 10px;
    cursor: pointer;
}

.ver-mais-button2:hover {
    background-color: var(--cor-pastel);
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    background: none;
    color: #333;
    font-size: 1rem;
    cursor: pointer;
    padding: 5px;
    line-height: 1;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.close-btn:hover {
    background: rgba(0, 0, 0, 0.05);
}
</style>