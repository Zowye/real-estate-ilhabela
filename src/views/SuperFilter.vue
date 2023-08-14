<template>
  <DefaultLayout>
    <div class="default-section-style full-width margin-top">
      <h2>Features</h2>
      <CardAmenitiesLargeFilter :amenities="amenities_list" />
    </div>
  </DefaultLayout>
</template>
  
<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import CardAmenitiesLargeFilter from '@/components/CardAmenitiesLargeFilter.vue';

export default {
  components: {
    DefaultLayout,
    CardAmenitiesLargeFilter
  },
  data() {
    return {
      amenities_list: [
        'BALCONY',
        'BACKYARD',
        'PETS_ALLOWED',
        'GARDEN',
        'SERVICE_AREA',
        'AMERICAN_KITCHEN',
        'SEA_VIEW',
        'NATURAL_VENTILATION',
        'POOL',
        'FIREPLACE',
        'BARBECUE_GRILL',
        'AIR_CONDITIONING',
        'SAUNA',
        'FURNISHED',
        'GOURMET_BALCONY',
        'PLANNED_FURNITURE',
        'BARBECUE_BALCONY',
        'KITCHEN_CABINETS',
        'BATHROOM_CABINETS',
        'SERVICE_BATHROOM',
        'GAS_SHOWER',
        'CLOSET',
        'GOURMET_KITCHEN',
        'GOURMET_SPACE',
        'LARGE_KITCHEN',
        'PANTRY',
        'LARGE_WINDOW',
        'HIGH_CEILING_HEIGHT',
        'LARGE_ROOM',
        'HEATING',
        'DECK',
        'SERVICE_ENTRANCE',
        'WHIRLPOOL',
        'DRESS_ROOM2',
        'ELECTRONIC_GATE',
        'INTEGRATED_ENVIRONMENTS',
        'BLINDEX_BOX',
        'STAIR',
        'COOKER',
        'PANORAMIC_VIEW',
        'PRIVATE_POOL',
        'GYM',
        'COWORKING',
        'LAUNDRY',
        'PLAYGROUND',
        'CINEMA',
        'SQUASH',
        'PARKING',
        'TENIS_COURT',
        'CONCIERGE_24H',
        'GATED_COMMUNITY',
        'BICYCLES_PLACE',
        'BATHTUB',
        'SAFETY_CIRCUIT',
        'PARTY_HALL',
        'ADULT_GAME_ROOM',
        'INTERNET_ACCESS',
        'BAR',
        'GUEST_PARKING',
        'CARETAKER_HOUSE',
        'CORNER_PROPERTY',
        'HOME_OFFICE',
        'ALARM_SYSTEM',
        'KITCHEN',
        'MEZZANINE',
        'NEAR_ACCESS_ROADS',
        'LAVABO',
        'NEAR_SCHOOL',
        'NEAR_HOSPITAL',
        'NEAR_SHOPPING_CENTER',
        'DINNER_ROOM',
        'NEAR_PUBLIC_TRANSPORT',
        'PIZZA_OVEN',
        'BUILTIN_WARDROBE',
        'ELEVATOR'
      ]

    }
  }
};
</script>
  
<style>
.default-section-style {
  border-radius: 8px;
  padding: 1em;
  box-sizing: border-box;
}

.margin-top{
  margin-top:5em;
}

.full-width {
  width: 80%;
}
</style>