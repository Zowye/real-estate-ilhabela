<template>
  <div class="star-rating">
    <div v-for="i in 5" :key="i" class="star">
      <i v-if="i <= filledStars" class="material-icons">star</i>
      <i v-else-if="i - 0.5 === filledStars" class="material-icons">star_half</i>
      <i v-else class="material-icons">star_border</i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    filledStars() {
      return Math.round(this.rating * 2) / 2;
    },
  },
};
</script>

<style scoped>
.star-rating {
  display: flex;
}

.star {
  color:var(--golden);
  font-size: 0.25em;
  margin-right: 5px;
}


@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

</style>
