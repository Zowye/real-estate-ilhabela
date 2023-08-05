<template>
    <div id="filters">
        <div class="filter-line top">
            <div @click="changeActive('ALUGAR')" class="filter-item top-button"
                :class="{ active: activeButton === 'ALUGAR' }">
                ALUGAR
            </div>
            <div @click="changeActive('COMPRAR')" class="filter-item top-button"
                :class="{ active: activeButton === 'COMPRAR' }">
                COMPRAR
            </div>
            <div @click="changeActive('TEMPORADA')" class="filter-item top-button"
                :class="{ active: activeButton === 'TEMPORADA' }">
                TEMPORADA
            </div>
        </div>
        <div id="main_filter_content_wrapper">
            <div class="filter-line column-mobile middle">
                <div class="filter-item middle_column first">
                    <label for="procurando-por" class="filter-label">Procurando por:</label>
                    <div class="custom-multiselect">
                        <Multiselect class="custom-multiselect" mode="tags" v-model="selected_building_type"
                            :options="options_building_type" :close-on-select="false" :searchable="true"
                            :create-option="true" placeholder="Tipo Imóvel" />
                    </div>
                </div>
                <div class="filter-item middle_column second">
                    <label for="bairro" class="filter-label">Bairro:</label>
                    <Multiselect class="custom-multiselect" mode="tags" v-model="selected_neighboors"
                        :options="options_neighboors" :close-on-select="false" :searchable="true" :create-option="true"
                        placeholder="Bairro" />
                </div>
                <!-- <div class="filter-item middle_column third">
                    <label for="quartos" class="filter-label">Quantidade de quartos:</label>
                    <Multiselect class="custom-multiselect" mode="tags" v-model="selected_neighboors"
                        :options="options_neighboors" :close-on-select="false" :searchable="true" :create-option="true"
                        placeholder="Quartos" />

                </div>
                <div class="filter-item middle_column fourth">
                    <label for="orcamento" class="filter-label">Seu orçamento:</label>
                    <div class="rhea_price_slider_wrapper" id="rhea_slider_7aa80cab">
                        <div class="rhea_price_label">
                            Price Range </div>
                        <div
                            class="rhea_price_slider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                            <div class="ui-slider-range ui-corner-all ui-widget-header"
                                style="left: 17.6063%; width: 61.4091%;"></div><span tabindex="0"
                                class="ui-slider-handle ui-corner-all ui-state-default" style="left: 17.6063%;"></span><span
                                tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"
                                style="left: 79.0155%;"></span>
                        </div>
                        <div class="rhea_price_range">
                            From <span class="rhea_price_display rhea_min_slide" data-index="0">$1,225,700</span>
                            To <span class="rhea_price_display rhea_max_slide" data-index="1">$5,492,100</span>
                            <div class="rhea_price_slider ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"><div class="ui-slider-range ui-corner-all ui-widget-header" style="left: 17.6063%; width: 61.4091%;"></div><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 17.6063%;"></span><span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default" style="left: 79.0155%;"></span></div>
                        </div>
                    </div>
                </div> -->

            </div>
            <div class="filter-line filter-more-line">
                + Filter More
            </div>
        </div>
    </div>
</template>
<script>
// import FilterBuildingType from "@/components/filter/FilterBuildingType.vue";
// import FilterNeighborhoods from "@/components/filter/FilterNeighborhoods.vue";
// import FilterRoomsN from "@/components/filter/FilterRoomsN.vue";
// import FilterPriceRange from "@/components/filter/FilterPriceRange.vue";
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'


export default {
    data() {
        return {
            activeButton: 'ALUGAR', // Adicionado a variável activeButton
            selectedOptions: [],
            // options: ['Casa', 'Apartamento', 'Flat', 'Sítio', 'Escritório'],
        };
    },
    computed: {
        selectedOptionsLimited() {
            return this.selectedOptions.slice(0, 3);
        },
    },
    setup() {
        const selected_building_type = [];
        const options_building_type = ['Casa', 'Apartamento', 'Flat', 'Sítio', 'Escritório'];
        const selected_neighboors = [];
        const options_neighboors = [
            "Água Branca",
            "Bairro Alto",
            "Barra Velha",
            "Bexiga",
            "Bonete",
            "Ilha das Cabras",
            "Itaguassú",
            "Itaquanduba",
            "Jabaquara",
            "Perequê",
            "Piúva",
            "Ponta Azeda",
            "Ponta das Canas",
            "Portinho",
            "Praia Grande",
            "Reino",
            "Saco da Capela",
            "Saco do Indaiá",
            "Siriúba",
            "Viana",
            "Vila"
        ];


        const onClickBuildingType = () => {
            const newTag = String(Math.random());
            selected_building_type.value = [...options_building_type.value, newTag];
            options_building_type.value = [...options_building_type.value, newTag];
        };


        const onClickNeighboors = () => {
            const newTag = String(Math.random());
            selected_neighboors.value = [...selected_neighboors.value, newTag];
            options_neighboors.value = [...options_neighboors.value, newTag];
        };

        return {
            selected_building_type,
            options_building_type,
            selected_neighboors,
            options_neighboors,
            onClickBuildingType,
            onClickNeighboors
        };
    },
    methods: {
        changeActive(button) {
            this.activeButton = button;
        },
        customLabel(option) {
            return `${option.library} - ${option.language}`
        },
        getIconForOption(option) {
            const icons = {
                Casa: 'fa-home',
                Apartamento: 'fa-building',
                Flat: 'fa-building',
                Sítio: 'fa-tree',
                Escritório: 'fa-briefcase',
            };
            return icons[option];
        },
        onClose() {
            console.log('Opções selecionadas:', this.selectedOptions);
        },
    }
    ,
    components: {
        // FilterBuildingType,
        // FilterNeighborhoods,
        // FilterRoomsN,
        Multiselect,
        // FilterPriceRange
    }
};
</script>

<style scoped>

::v-deep input {
    background: none !important;
}

.custom-multiselect .multiselect__input {
    background-color: #543b3b;
}

.custom-multiselect>>>.multiselect__input {
    background-color: #543b3b;
}

* {
    user-select: none;
}

.first {
    width: 35%;
}

.second {
    width: 65%;
}

.third {
    width: 15%;
}

.fourth {
    width: 20%;
}

.filter-more-line {
    background-color: var(--app-bg-color);
    color: var(--cor-base);
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    padding: 0.4em 0.8em;
}


#filters {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 40px;
    border-radius: 1em;
    margin-top: 10em;
    bottom: 0;
}


.filter-label {
    color: var(--cor-text-base);
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 400;
}


#main_filter_content_wrapper {
    background-color: var(--card-background);
    backdrop-filter: blur(9px);
    border-radius: 0.5em;
    border-right: 1px solid rgba(128, 128, 128, .2);
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: rgba(128, 128, 128, 0.2);
    border-bottom: 1px solid rgba(128, 128, 128, .2);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    width: 100%;
    border-bottom-color: rgba(128, 128, 128, 0.2);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.01);
    transition: all .35s;
    z-index: 9;
    min-width: 30em;

}


.filter-option {
    padding: 10px;
}

.filter-option label {
    display: block;
    margin-bottom: 5px;
}

.filter-option select,
.checkbox-group {
    padding: 10px;
    width: 100%;
}

.filter-item select:hover {
    background-color: rgb(235, 235, 235);
}


#filter-chips-group {
    display: none;
    flex-wrap: wrap;
    align-items: center;
    position: absolute;
    grid-gap: 4px;
    width: inherit;
    background-color: rgba(256, 256, 256, 0.65);
    backdrop-filter: blur(10px);
    margin-top: 25px;
    padding: 55px 15px;
    border-radius: 1em;
    /* Adicionado para dar algum espaço em volta dos chips */
}

.filter-chip {
    background-color: #f2f2f2;
    border-radius: 25px;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px 10px;
    font-size: 0.8rem;
}


.filter-chip input[type="checkbox"] {
    display: none;
}

.filter-chip label {
    margin: 0;
}

.filter-chip i {
    display: none;
}

.filter-chip.selected {
    background-color: #701b1b;
}

.filter-item select option:hover {
    background-color: purple;
    padding: 1em 2em;
}

.filter-chip.selected i {
    display: block;
}

.filter-chip.selected input[type="checkbox"]:checked+label {
    font-weight: bold;
}

.filter-chip:hover {
    color: white;
    background-color: #573ab1;
}


.filter-line {
    display: flex;
    flex-direction: row;
    align-items: center;

}

.top {
    height: 2.2em;
    z-index: 1;
    justify-content: center;
    align-items: end;
    width: 60%;
}

.middle {
    align-items: baseline;
    justify-content: baseline;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);

}

.bottom {
    margin-bottom: 10px;
}

.hidden {
    display: none;
}

.filter-item {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    padding: 5px;
}

.middle_column {
    height: 100%;
    padding: 1em 1.5em 1em 1.5em;
    justify-content: center;
}

.filter-item label {
    display: block;
    margin-bottom: 5px;
}

.filter-item select,
.filter-item input[type="checkbox"] {
    width: 100%;
    padding: 0.7em 1.9em;
    border: 2px solid white;
    font-weight: 700;
    color: #ffffff;
    border-radius: 1.8em;
    background-color: #f7f7f710;
}

.filter-item select option:hover {
    background-color: #582929;
    margin: 2.2em;
}

.filter-item .chip {
    display: inline-flex;
    align-items: center;
    background-color: #f2f2f2;
    border-radius: 20px;
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
}

.filter-item .chip input[type="checkbox"] {
    display: none;
}

.filter-item .chip label {
    margin-left: 5px;
}

.filter-item .chip input[type="checkbox"]:checked+label {
    background-color: #ccc;
    font-weight: bold;
}

.search-button {
    background-color: #723ab1;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}

.search-button i {
    margin-right: 5px;
}






.checkbox-group input[type="checkbox"],
.checkbox-group label {
    margin-right: 10px;
    margin-bottom: 5px;
}


.checkbox-group input[type="checkbox"],
.checkbox-group label {
    margin-right: 10px;
    margin-bottom: 5px;
}


#main_container {
    position: relative;
    display: flex;
    padding-top: 100px;
    margin-left: 30px;
    margin-right: 30px;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 3em;
}

.flex_row {
    flex-direction: row;
}

.flex_column {
    flex-direction: column;
}







.top-button {
    align-items: center;
    justify-content: center;
    background-color: var(--cor-base);
    margin: 0;
    height: 0.6em;
    padding: 0.95em 1.8em;
    cursor: pointer;
    box-shadow: 2px 7px 9px 8px rgba(0, 22, 0, 0.1);
    color: #fff;
    font-family: 'Roboto Condensed', sans-serif;
    transform-origin: bottom;
    position: relative;
    transition: all .15s;
}

.top-button span {
    position: relative;
    z-index: 2;
}

.active {
    height: 1.2em;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    background-color: var(--card-background);
    color: var(--cor-text-base);
}

.top-button:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #ffffff;
    transition: all .35s;
    z-index: -1;
    /* Definindo o z-index para ficar atrás do texto */
}

.top-button:hover {
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    background-color: var(--card-background);
    color: var(--cor-base);
}

.active:hover {
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    color: var(--cor-base);
}


.top-button:hover:after {
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    width: 100%;
}




@media screen and (max-width: 768px) {
    #filters {
        width: 90%;
        /* Adjust the width to fit the screen */
        padding: 10px;
        /* Add some padding for better spacing */
    margin-top: 4em;

    }

    .active {
        height: 1.2em;
        border-top-left-radius: 0.0em;
        border-top-right-radius: 0.0em;
        background-color: var(--card-background);
        color: var(--cor-text-base);
    }

    .top-button {
        height: 1.5em;
        padding: 1.1em 2.1em;
    }

    .filter-label {
        margin-left: 1em;
    }

    /* Update the flex-direction for smaller screens */
    .column-mobile {
        flex-direction: column;
    }

    .filter-item {
        border-bottom: 1px solid rgb(208, 208, 208);
    }

    .filter-item {
        width: 100%;
    }

    .middle_column {
        margin-top: 1em;
        padding: 0em;
    }
}



@media screen and (max-width: 1024px) {
    /* Adjust styles as needed for screens between 769px and 1024px */
}


/* 
.rounded_left {
    border-top-left-radius: 1em;
}

.rounded_right {
    border-top-right-radius: 1em;
}
 */
</style>
  




