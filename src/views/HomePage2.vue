<template>
  <DefaultLayout>
    <div id="home-page-container">
      <CardsList />
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardsList from '@/components/CardsList.vue';

export default {
  components: {
    DefaultLayout,
    CardsList
  },
};
</script>

<style>

*{
  user-select: none ;
}
#home-page-container {
  margin-top: 100px;
  justify-content: center;
}

</style>
