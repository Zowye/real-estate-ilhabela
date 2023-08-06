<template>
    <div class="card-small">
        <div id="card_top">
            <CardPhotoViewer :images="card.card_images" :status_level="card.status_level" :id="card.id" />
        </div>

        <div class="fav-heart" @click="toggleFavorite">
            <div class="heart-icon" :class="{ 'active': isFavorite }">
                <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="cardInfos">
            <div class="card_title" @click="SetFocusHouse(card)">{{ card.title }}</div>
            <div id="topInfos" class="inner_cardcard_padding">
                <IconPin :width="14" :height="14" />
                <div class="card_address">{{ card.street }}, {{ card.streetNumber }}</div>
            </div>
            <div class="neigh">{{ card.neighborhood }}</div>
            <div id="bottomInfos" class="inner_card_padding">
                <CardCommonInfo />
                <!-- <p class="description">{{ card.description }}</p> -->
            </div>
        </div>
        <div id="card-footer">
            <div>
                <span class="monetary"><span class="currency_name">R$</span> </span><span class="monetary_value_number">{{
                    card.formattedPrice }}</span><span class="monetary_value_string">{{ card.suffix }}</span>
            </div>
            <div class="see-more-btn" @click="handleMoreInfo">VISÃO RÁPIDA</div>
        </div>
    </div>
</template>
  
<script>
import CardPhotoViewer from "@/components/CardPhotoViewer.vue";
import CardCommonInfo from "@/components/CardCommonInfo.vue";
import IconPin from "@/components/icons/IconPin.vue";
// import CardAmenities from "@/components/CardAmenities.vue";
// import CardStars from "@/components/CardStars.vue";
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            isFavorite: false,
        }
    },
    components: {
        CardPhotoViewer,
        CardCommonInfo,
        IconPin,
        // CardAmenities,
        // CardStars,
    },
    props: {
        card: {
            type: Object,
            required: true,
        },
        cardWidth: {
            type: String,
            default: "400px",
        },
    },
    methods: {
        ...mapActions(['updateHouseInfo', 'addToFavorites', 'removeFromFavorites']),

        SetFocusHouse(card) {
            this.updateHouseInfo(card);
        },
        toggleFavorite() {

            if (this.isFavorite) {
                console.log(`Adicionando a ${this.card}`)
                this.removeFromFavorites(this.card);
            } else {
                console.log(`Removendo a ${this.card}`)
                this.addToFavorites(this.card);
            }
            this.isFavorite = !this.isFavorite;

        },
        handleMoreInfo() {
            this.$emit('card-more-info', this.card);
        }
    },
    computed: {
        ...mapState({
            favoritesList: (state) => state.favorites.favorites,
        }),
        isFavoriteOnStore() {
            return this.favoritesList.includes(this.card);
        },
    }
};
</script>
  
<style scoped>
.card-small {
    cursor: pointer;
    position: relative;
    background-color: var(--card-background);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
    margin: 1em;
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
    box-shadow: 0px 4px 15px rgb(0 0 0 / 8%) 0 1px 0;
    overflow: hidden;
    margin-bottom: 5em;
    width: 24em;
}


#card_top {
    width: 100%;
    height: 24em;
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

.see-more-btn {
    color: var(--cor-base);
    border: 1px solid var(--cor-base);
     border-radius: 1em;
    padding: 1em 2em;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.1s ease;
}

.see-more-btn:hover {
    color: #fff;
    background-color: var(--cor-base);
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
    margin-top: 1.0em;
    font-family: var(--font-text);
    color: var(--cor-text-base);
    line-height: 1em;
    margin-bottom: 0.7em;
    font-weight: 500;
    font-size: 1.48em;
}


.card_address {
    line-height: 1em;
    font-size: 0.95em;
    color: var(--cor-text-base);
    margin-left: 0.55em;
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
    background-color: #6d6a6a;
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


/* Posiciona o coração no canto superior direito */
.fav-heart {
    position: absolute;
    top: 0.3em;
    right: 0.3em;
    padding: 0.3em;
    background-color: #000000c9;
    border-radius: 0.5em;
    cursor: pointer;
    color: #e0e0e0;
    font-size: 1.5em;
    height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1em;
    /* Defina o tamanho desejado para o coração */
}






.heart-icon {
    display: inline-block;
    font-size: 0.9em;
    cursor: pointer;
    color: #e0e0e0;
    transition: transform 300ms ease;
}

.heart-icon.active {
    font-size: 1.5em;
    color: rgb(160, 32, 53);
    animation: bounce 300ms;
}

.fav-heart.active {
    background-color: transparent !;
}

/* Animação "bounce" */
@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-5px);
    }

    60% {
        transform: translateY(-3px);
    }
}


.heart-icon.active:hover {
    color: rgb(160, 32, 53);
    /* ou a cor desejada ao ser clicado (pressionado) */
}


/* Estilize o ícone do coração quando hover */
.heart-icon:hover {
    color: pink;
    /* ou a cor desejada ao passar o mouse (hover) */
}

/* Ajusta para tela mobile */
@media screen and (max-width: 800px) {
    .card-small{
        width: 90%;
    }




    #card_top {
        height: 34em;
    }

}
</style>
  

