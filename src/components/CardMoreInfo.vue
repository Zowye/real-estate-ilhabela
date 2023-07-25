<template>
    <div class="backdrop" @click="closeModal"></div>

    <div class="card-more-info">
        <button @click="closeModal" class="close-btn">
            <i class="fas fa-times"></i>
        </button>
        <div class="album-info-container">
            <div class="album-container">
                <div class="image-container">
                    <img :src="card.card_images[mainImageIndex]" :alt="card.title" />
                </div>
                <div class="thumbnail-gallery">
                    <!-- Use slice to limit the displayed thumbnails to the first 20 -->
                    <img v-for="(image, index) in card.card_images.slice(thumbnail_index_bottom, thumbnail_index_top)"
                        :src="image" :alt="card.title" :key="index" @click="changeMainImage(thumbnail_index_bottom + index)"
                        class="thumb" :class="{ 'selected': index === mainImageIndex }" />

                    <button v-if="card.card_images.length > thumbnail_index_top" @click="loadMoreThumbnails"
                        class="thumb loadmore">
                        Ver Mais
                    </button>
                    <button v-else class="thumb loadmore inactive" disabled>
                        Ver Mais
                    </button>
                </div>
            </div>
            <div class="info-container">
                <CardStars :rating="card.stars_count" />
                <div class="title">Amazing House in Ilhabela</div>
                <div id="topInfos" class="inner_cardcard_padding">
                    <IconPin :width="16" :height="16" />
                    <div class="card_address"> {{ card.street }}, {{ card.streetNumber }} <div class="neigh">
                            {{ card.neighborhood }}</div>
                    </div>
                </div>
                <CardCommonInfo />
                <div class="price">R$ {{ card.formattedPrice }} {{ card.suffix }} </div>
                <div class="description">{{ truncateDescription(card.description_full) }}</div>
                <div class="amenities">
                    <CardAmenities :amenities="card.amenities" />
                </div>

                <button class="ver-mais-button2">Ver Mais</button>
            </div>
        </div>
    </div>
</template>
    
   
  
<script>
import CardAmenities from '@/components/CardAmenities.vue';
import CardCommonInfo from '@/components/CardCommonInfo.vue';
import IconPin from "@/components/icons/IconPin.vue";
import CardStars from "@/components/CardStars.vue";

export default {
    mounted() {
        // Adiciona um ouvinte de evento para a tecla Escape (ESC)
        document.addEventListener('keydown', this.handleEscapeKey);
    },

    beforeUnmount() {
        // Remove o ouvinte de evento ao desmontar o componente
        document.removeEventListener('keydown', this.handleEscapeKey);
    },
    emits: ['close'],

    data() {
        return {
            isVisible: true,
            mainImageIndex: 0,
            thumbnailLimit: 7, // Set the initial limit for displayed thumbnails
            thumbnail_index_bottom: 0,
            thumbnail_index_top: 7,
        };
    },
    props: {
        card: {
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
        loadMoreThumbnails() {
            this.thumbnail_index_bottom += this.thumbnailLimit; // Increase the thumbnail limit by 20
            this.thumbnail_index_top += this.thumbnailLimit; // Increase the thumbnail limit by 20
        },
        handleEscapeKey(event) {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        },
        changeMainImage(index) {
            this.mainImageIndex = index;
        },
        closeModal() {
            this.$emit('close');
        },
        truncateDescription(description) {
            if (description && description.length > 300) {
                return description.slice(0, 280) + '...';
            }
            return "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur quae, architecto obcaecati nihil vero nemo doloremque omnis iusto aut, earum, placeat sit blanditiis. Ea, quis. Dignissimos quod possimus ex ab.";
        },
    }
};
</script>
  










<style>
/* Estilização da camada semi-transparente com desfoque (backdrop) */
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(256, 256, 256, 0.65);
    backdrop-filter: blur(10px);
    z-index: 10000;
}



.album-info-container {
    display: flex;
    flex-direction: row;
}


.card-more-info {
    width: 75%;
    height: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* This centers the element both horizontally and vertically */
    background-color: #fff;
    padding: 20px;
    border-radius: 1em;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.01);
    z-index: 10001;
    border: 3px solid #ae9ae3;
    display: flex;
    flex-direction: row;
}

.close-button {
    background-color: #f3f3f3;
    color: #777;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 0.9em;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.1s ease;
}

.close-button:hover {
    background-color: #e0e0e0;
    border-color: #999;
}

.close-button:focus {
    outline: none;
}

#topInfos {
    justify-content: flex-start;
    align-items: center;
    display: flex;
}


.image-container {
    width: 100%;
    /* You can adjust this value to fit your layout */
    height: 500px;
    display: block;
    /* Set a fixed height for the image container */
    overflow: hidden;
}


.image-container img {
    border-radius: 1em;
    width: 100%;
    height: 100%;
    /* Definimos a altura como 100% para preencher todo o image-container */
    object-fit: cover;
    /* Utilizamos object-fit: contain para manter a proporção da imagem e preenchê-la no contêiner */
}

.album-container {
    display: flex;
    flex-direction: column;
    width: 50%;
    /* Definimos a largura como 50% para ocupar metade da largura */
    overflow: hidden;
}


.info-container {
    justify-content: center;
    padding: 16px;
    width: 50%;
    /* Definimos a largura como 50% para ocupar metade da largura */
}

.title {
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


.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    background: none;
    color: #ffffff;
    font-size: 1em;
    width:1.8em;
    height:1.8em;
    border-radius: 0.33em;
    cursor: pointer;
    line-height: 1;
    background-color: var(--cor-base);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.close-btn:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--cor-base);
    border: 0.2em solid var(--cor-base);
}

.thumbnail-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
    /* Os elementos ficarão alinhados à esquerda */
    margin-top: 10px;
    overflow-x: hidden;
    /* Habilitar rolagem horizontal se houver mais thumbs */
}

.thumbnail-gallery .thumb {
    width: 100px;
    height: 75px;
    border-radius: 5px;
    object-fit: cover;
    cursor: pointer;
    transition: border 0.3s ease;
}

.loadmore {
    position: relative;
    color: #000000;
    background-color: var(--cor-clarinha);
    border: none;
    z-index: 0;
}

.loadmore:hover {
    background-color: var(--cor-pastel);
    color: white;
    user-select: none;
}

.loadmore.inactive {
    background-color: #ededed;
    color: #c2c2c2;
    cursor: default;
}



/* .thumbnail-gallery .thumb.selected {
    border: 3px solid #ae9ae3;
} */

.thumbnail-gallery::-webkit-scrollbar {
    height: 5px;
    background: #f3f3f3;
}

.thumbnail-gallery::-webkit-scrollbar-thumb {
    background: #ae9ae3;
    border-radius: 5px;
}


.ver-mais-button2 {
    display: inline-block;
    background-color: var(--cor-pastel);
    
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
    background-color: #ae9ae3;
}
</style>