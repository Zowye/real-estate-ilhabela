<template>
  <DefaultLayout>
    <div id="home-page-container">
      <div id="slider-home">
        <!-- <div class="separator"></div> -->

        <!-- <div class="slider-title2">Ouse Sonhar</div> -->
        <!-- <div class="slider-title1">Nidus Real Estate</div> -->
        <!-- <button class="btn"> VENHA FAZER PARTE</button> -->
      </div>

      <AppFilter />

        <div class="card-list-container">
          <CardsList :show_featured_card="false" />
        </div>
 
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardsList from '@/components/CardsList.vue';
import AppFilter from '@/components/AppFilter.vue';

export default {
  data() {
    return {
      isExtraFiltersVisible: true
    };
  },
  methods: {
    toggleExtraFilters() {
      this.isExtraFiltersVisible = !this.isExtraFiltersVisible;
    }
  },
  components: {
    DefaultLayout,
    CardsList,
    AppFilter
  },
};
</script>

<style scoped>
* {
  user-select: none;
}

#slider-home {
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-top: 8em;
  justify-content: end;
  height: 4em;
}

.separator {
  margin-top: 1em;
  height: 0.5em;
  width: 4em;
  background-color: white;
}

.slider-title1 {
  color: rgb(0, 0, 0);
  text-shadow: 0px 9px 22px rgba(0, 0, 0, 0.65);
  font-family: 'Poiret One', cursive;
  font-size: 3em;
}

.slider-title2 {
  text-shadow: 0px 9px 32px rgba(0, 0, 0, 0.45);
  font-family: 'The Nautigal', cursive;
  font-size: 6em;
  color: white;
}

.btn {
  width: 18em;
  cursor: pointer;
  color: black;
  border-radius: 0.2em;
  border: none;
  background-color: white;
  padding: 1.5em 3.5em;
  transition: all 200ms;
}

.btn:hover {
  background-color: var(--cor-base);
  color: white;
}

#home-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-attachment: fixed;
  /* fixa o plano de fundo em relação à janela do navegador */
  /* background-image: url("@/assets/images/bgTopper.jpg"); */
  background-image: url("@/assets/images/main-bg-wide.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
}

/* #main_wrapper {
  display: flex;
  background-color: red;
  flex-direction: row;
  width: 100%;
} */

#extra_filters {
  background-color: antiquewhite;
  border-radius: 0.5em;
  width: 20%;
  flex: 0 0 20%;
  /* Flex grow, flex shrink, flex-basis */
}

.card-list-container{
  display: block;
}

CardsList {
  display:block;
  flex: 1;
  /* This allows it to take up the remaining space */
}
</style>
