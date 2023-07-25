<template>
    <div class="card-amenities">
      <div class="chip" v-for="amenity in amenities" :key="amenity">
        <div class="amenity-wrapper">
          <img :src="getAmenityIcon(amenity)" :alt="amenity" class="amenity-icon" />
          <span class="amenity-name">{{ amenity }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      amenities: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      getAmenityIcon(amenity) {
        try {
          return require(`@/assets/images/amenities_icons/${amenity.toLowerCase().replace(/ /g, '_')}.png`);
        } catch (error) {
          return require('@/assets/images/amenities_icons/default.png');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card-amenities {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;

    gap: 8px;
  }
  
  .amenity-wrapper {
    position: relative;

  }
  
  .amenity-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  .amenity-name {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .amenity-wrapper:hover .amenity-name {
    opacity: 1;
  }
  </style>
  