<template>
  <DefaultLayout>
    <div id="home-page-container">
      <AppFilter />
      <CardsList :show_featured_card="false" />
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardsList from '@/components/CardsList.vue';
import AppFilter from '@/components/AppFilter.vue';

export default {
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

#home-page-container {
  width: 70%;
  align-items: center;
  justify-content: center;
}
</style>
