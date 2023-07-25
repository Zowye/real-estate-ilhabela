<template>
    <div id="filters">
        <div class="filter-line top">
            <div class="filter-item top-button active rounded_left">
                ALUGAR
            </div>
            <div class="filter-item top-button">
                COMPRAR
            </div>
            <div class="filter-item top-button rounded_right">
                TEMPORADA
            </div>

        </div>
        <div id="main_filter_content_wrapper">
            <div class="filter-line middle">
                <div class="filter-item middle_column first">
                    <label for="procurando-por" class="filter-label">Procurando por:</label>
                    <!-- <select id="procurando-por">
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                        <option value="opcao4">Opção 4</option>
                        <option value="opcao5">Opção 5</option>
                        <option value="opcao6">Opção 6</option>
                    </select> -->
                    <FilterBuildingType />
                </div>
                <div class="filter-item middle_column">

                    <label for="bairro" class="filter-label">Bairro:</label>
                    <FilterNeighborhoods />
                    <!-- <select id="bairro">
                        <option value="bairro1">Bairro 1</option>
                        <option value="bairro2">Bairro 2</option>
                        <option value="bairro3">Bairro 3</option>
                        <option value="bairro4">Bairro 4</option>
                        <option value="bairro5">Bairro 5</option>
                        <option value="bairro6">Bairro 6</option>
                    </select> -->
                </div>
                <div class="filter-item middle_column">
                    <label for="quartos" class="filter-label">Quantidade de quartos:</label>
                    <FilterRoomsN />
                    <!-- <select id="quartos">
                        <option value="1">1 quarto</option>
                        <option value="2">2 quartos</option>
                        <option value="3">3 quartos</option>
                        <option value="4">4 quartos</option>
                        <option value="5">5 quartos</option>
                        <option value="6">6 quartos</option>
                    </select> -->
                </div>
                <div class="filter-item middle_column">
                    <label for="orcamento" class="filter-label">Seu orçamento:</label>
                    <FilterPriceRange />
                    <!-- <select id="orcamento">
                        <option value="1000">Até R$1.000</option>
                        <option value="2000">Até R$2.000</option>
                        <option value="3000">Até R$3.000</option>
                        <option value="4000">Até R$4.000</option>
                        <option value="5000">Até R$5.000</option>
                        <option value="10000">Até R$10.000</option>
                        <option value="20000">Até R$20.000</option>
                        <option value="30000">Até R$30.000</option>
                        <option value="40000">Até R$40.000</option>
                        <option value="50000">Até R$50.000</option>
                        <option value="100000">Até R$100.000</option>
                        <option value="200000">Até R$200.000</option>
                        <option value="300000">Até R$300.000</option>
                        <option value="400000">Até R$400.000</option>
                        <option value="500000">Até R$500.000</option>
                        <option value="1000000">Até R$1.000.000</option>
                        <option value="2000000">Até R$2.000.000</option>
                        <option value="3000000">Até R$3.000.000</option>
                        <option value="4000000">Até R$4.000.000</option>
                        <option value="5000000">Até R$5.000.000</option>
                    </select> -->
                </div>

            </div>
            <div class="filter-line effect-toggle">

                <div id="filter-chips-group">
                    <!-- Conteúdo gerado via javascript dinamicamente-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FilterBuildingType from "@/components/filter/FilterBuildingType.vue";
import FilterNeighborhoods from "@/components/filter/FilterNeighborhoods.vue";
import FilterRoomsN from "@/components/filter/FilterRoomsN.vue";
import FilterPriceRange from "@/components/filter/FilterPriceRange.vue";



export default {
    components: {
        FilterBuildingType,
        FilterNeighborhoods,
        FilterRoomsN,
        FilterPriceRange
    }
};
</script>

<style scoped>
* {
    z-index: 1;
    user-select: none;
}

.first {
    width: 12em;
}

#filters {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    border-radius: 1em;
    bottom: 0;
}


.filter-label {
    color: var(--cor-text-base);
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 400;
}


#main_filter_content_wrapper {
    background-color: #fff;
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
}


.filter-option {
    padding: 10px;
    flex-basis: 33.33%;
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
    z-index: 1;
    justify-content: center;
    align-items: center;
    width: 60%;
}

.middle {
    align-items: baseline;
    justify-content: baseline;
    margin-bottom: 10px;
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
    flex-basis: 33%;
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
    background-color: #896dde;
    margin: 0;
    padding: 1em 2.5em;
    cursor: pointer;
    box-shadow: 4px -4px 6px rgba(0, 0, 0, 0.1);
    color: #fff;
    font-family: 'Roboto Condensed', sans-serif;
    transform-origin: bottom;
    position: relative;
    transition: all .35s;
}

.top-button span {
    position: relative;
    z-index: 2;
}

.active {
    background-color: #573ab1;
}

.top-button:after {
    position: absolute;
    content: "";
    top: 0;
    width: 0;
    height: 100%;
    background: #7d3ab1;
    transition: all .35s;
    z-index: -1; /* Definindo o z-index para ficar atrás do texto */
}

.top-button:hover {
    color: #fff;
}

.top-button:hover:after {
    width: 100%;
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
  




