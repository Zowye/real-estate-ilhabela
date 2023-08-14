<template>
  <div class="">
    <div v-for="category in orderedCategories" :key="category" class="full-width default-section-style">
      <h2>{{ category }}</h2>
      <div class="grid-amenities full-width">
        <div v-for="amenity in orderedAmenitiesByCategory(category)" :key="amenity">
          <div class="amenity-wrapper" :class="{ 'selected': selectedAmenities.includes(amenity) }"
            :style="{ '--image-bg': `url(${getAmenityImagePath(amenity)})` }" @click="toggleAmenitySelection(amenity)">
            <div class="amenity_name shadow" :class="{ 'selectedName': selectedAmenities.includes(amenity) }">
              {{ getPresentationName(amenity) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      selectedAmenities: [],
      amenitiesDictionary: {
        FREEZER: {
          presentationName: "Freezer",
          image: "freezer.jpg",
          category: "House Items"
        },
        BALCONY: {
          presentationName: "Varanda",
          image: "balcony.jpg",
          category: "House Structure"
        },
        BACKYARD: {
          presentationName: "Quintal",
          image: "backyard.jpg",
          category: "House Structure"
        },
        PETS_ALLOWED: {
          presentationName: "Aceita Pets",
          image: "pets_allowed.jpg",
          category: "Comfort"
        },
        GARDEN: {
          presentationName: "Jardim",
          image: "garden.jpg",
          category: "House Structure"
        },
        SERVICE_AREA: {
          presentationName: "Área de Serviço",
          image: "service_area.jpg",
          category: "House Structure"
        },
        AMERICAN_KITCHEN: {
          presentationName: "Cozinha Americana",
          image: "american_kitchen.jpg",
          category: "House Structure"
        },
        SEA_VIEW: {
          presentationName: "Vista para o Mar",
          image: "sea_view.jpg",
          category: "Region Context"
        },
        NATURAL_VENTILATION: {
          presentationName: "Ventilação Natural",
          image: "natural_ventilation.jpg",
          category: "Comfort"
        },
        POOL: {
          presentationName: "Piscina",
          image: "pool.jpg",
          category: "Comfort"
        },
        FIREPLACE: {
          presentationName: "Lareira",
          image: "fireplace.jpg",
          category: "Comfort"
        },
        BARBECUE_GRILL: {
          presentationName: "Churrasqueira",
          image: "barbecue_grill.jpg",
          category: "Comfort"
        },
        AIR_CONDITIONING: {
          presentationName: "Ar Condicionado",
          image: "air_cond.jpg",
          category: "Comfort"
        },
        SAUNA: {
          presentationName: "Sauna",
          image: "sauna.jpg",
          category: "Comfort"
        },
        FURNISHED: {
          presentationName: "Mobiliado",
          image: "furnished.jpg",
          category: "House Items"
        },
        GOURMET_BALCONY: {
          presentationName: "Varanda Gourmet",
          image: "gourmet_balcony.jpg",
          category: "House Structure"
        },
        PLANNED_FURNITURE: {
          presentationName: "Móveis Planejados",
          image: "planned_furniture.jpg",
          category: "House Items"
        },
        BARBECUE_BALCONY: {
          presentationName: "Varanda com Churrasqueira",
          image: "barbecue_balcony.jpg",
          category: "House Structure"
        },
        KITCHEN_CABINETS: {
          presentationName: "Armários de Cozinha",
          image: "kitchen_cabinets.jpg",
          category: "House Items"
        },
        BATHROOM_CABINETS: {
          presentationName: "Armários no Banheiro",
          image: "bathroom_cabinets.jpg",
          category: "House Items"
        },
        SERVICE_BATHROOM: {
          presentationName: "Banheiro de Serviço",
          image: "service_bathroom.jpg",
          category: "House Structure"
        },
        GAS_SHOWER: {
          presentationName: "Chuveiro a Gás",
          image: "gas_shower.jpg",
          category: "Comfort"
        },
        CLOSET: {
          presentationName: "Closet",
          image: "closet.jpg",
          category: "House Structure"
        },
        GOURMET_KITCHEN: {
          presentationName: "Cozinha Gourmet",
          image: "gourmet_kitchen.jpg",
          category: "House Structure"
        },
        GOURMET_SPACE: {
          presentationName: "Espaço Gourmet",
          image: "gourmet_kitchen.jpg",
          category: "Comfort"
        },
        LARGE_KITCHEN: {
          presentationName: "Cozinha Ampla",
          image: "large_kitchen.jpg",
          category: "House Structure"
        },
        PANTRY: {
          presentationName: "Despensa",
          image: "pantry.jpg",
          category: "House Structure"
        },
        LARGE_WINDOW: {
          presentationName: "Janelas Grandes",
          image: "large_window.jpg",
          category: "House Structure"
        },
        HIGH_CEILING_HEIGHT: {
          presentationName: "Pé Direito Alto",
          image: "high_ceiling_height.jpg",
          category: "House Structure"
        },
        LARGE_ROOM: {
          presentationName: "Cômodo Amplo",
          image: "large_room.jpg",
          category: "House Structure"
        },
        HEATING: {
          presentationName: "Aquecimento",
          image: "heating.jpg",
          category: "Comfort"
        },
        DECK: {
          presentationName: "Deck",
          image: "deck.jpg",
          category: "Comfort"
        },
        SERVICE_ENTRANCE: {
          presentationName: "Entrada de Serviço",
          image: "service_entrance.jpg",
          category: "House Structure"
        },
        MEZZANINE: {
          presentationName: "Mezanino",
          image: "mezzanine.jpg",
          category: "House Structure"
        },
        ELEVATOR: {
          presentationName: "Elevador",
          image: "elevator.jpg",
          category: "House Structure"
        },
        CORNER_PROPERTY: {
          presentationName: "Casa de Esquina",
          image: "corner_property.jpg",
          category: "Region Context"
        },
        GATED_COMMUNITY: {
          presentationName: "Condomínio Fechado",
          image: "gated_community.jpg",
          category: "Region Context"
        },
        BATHTUB: {
          presentationName: "Banheira",
          image: "bathtub.jpg",
          category: "Comfort"
        },
        COOKER: {
          presentationName: "Fogão",
          image: "cooker.jpg",
          category: "House Items"
        },
        PIZZA_OVEN: {
          presentationName: "Forno de Pizza",
          image: "pizza_oven.jpg",
          category: "House Items"
        },
        NEAR_PUBLIC_TRANSPORT: {
          presentationName: "Próximo a Transporte Público",
          image: "near_public_transport.jpg",
          category: "Region Context"
        },
        NEAR_SCHOOL: {
          presentationName: "Próximo a Escola",
          image: "near_school.jpg",
          category: "Region Context"

        },
        NEAR_HOSPITAL: {
          presentationName: "Próximo a Hospital",
          image: "near_hospital.jpg",
          category: "Region Context"

        },
        NEAR_SHOPPING_CENTER: {
          presentationName: "Próximo a Shopping",
          image: "near_shopping_center.jpg",
          category: "Region Context"
        },
        NEAR_ACCESS_ROADS: {
          presentationName: "Acesso fácil à Pista",
          image: "near_access_road.jpg",
          category: "Region Context"
        },
        LAVABO: {
          presentationName: "Lavabo",
          image: "lavabo.jpg",
          category: "House Structure"

        },
      }
    }


  },

  computed: {
    orderedCategories() {
      const categories = new Set();
      this.amenities.forEach(amenity => {
        if (this.amenitiesDictionary[amenity]) {
          categories.add(this.amenitiesDictionary[amenity].category);
        }
      });
      return [...categories].sort();
    },
    orderedAmenitiesByCategory() {
      return (category) => {
        return this.amenities
          .filter(amenity => this.amenitiesDictionary[amenity] && this.amenitiesDictionary[amenity].category === category)
          .sort((a, b) => this.amenitiesDictionary[a].presentationName.localeCompare(this.amenitiesDictionary[b].presentationName));
      };
    }
  },
  props: {
    amenities: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleAmenitySelection(amenity) {
      if (this.selectedAmenities.includes(amenity)) {
        this.selectedAmenities = this.selectedAmenities.filter(item => item !== amenity);
      } else {
        this.selectedAmenities.push(amenity);
      }
    },
    getPresentationName(amenity) {
      try {
        return this.amenitiesDictionary[amenity].presentationName
      }
      catch (error) {
        return amenity
      }
    },
    getAmenityIcon(amenity) {
      try {
        return require(`@/assets/images/amenities_icons/${amenity.toLowerCase().replace(/ /g, '_')}.png`);
      } catch (error) {
        return null;//require('@/assets/images/amenities_icons/default.png');
      }
    },
    getAmenityImagePath(amenity) {
      try {
        return require(`@/assets/images/amenities_images/${this.amenitiesDictionary[amenity].image}`);
      } catch (error) {
        console.error(`Image for amenity ${amenity} not found!`, error);
        return require('@/assets/images/amenities_images/default.jpg');
      }
    }
  },
};
</script>
  
<style scoped>
.grid-amenities {
  display: grid;
  grid-template-columns: repeat(auto-fill, 10em);
  gap: 1em;
  justify-content: start;
  width: 100%;
  align-items: center;
  margin-bottom: 2em;
}

.amenity-wrapper {
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  width: 10em;
  height: 10em;
  color: rgb(255, 255, 255);
  padding: 1em;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background:
    linear-gradient(to bottom, rgba(255, 255, 255, 0.063), rgba(0, 0, 0, 0.607)),
    var(--image-bg);
  background-size: cover;
  background-position: center;
  border: 0.2em solid rgb(255, 255, 255);
  filter: grayscale(20%);
  transition: all 200ms;
}

.selected {
  border: 0.2em solid rgb(138, 235, 93);
}

.amenity-wrapper.selected {
  filter: grayscale(0%);
}

.amenity_name.selectedName {
  font-size: 0.7em;
}

.amenity_name {
  /* background-color: rgba(255, 255, 255, 0.8); */
  color: #ffffff;
  position: absolute;
  padding: 4px 8px;
  text-align: center;
  font-size: 0.65em;
  bottom: -1em;
  transition: all 400ms;
  z-index: 19;
  background-color: rgb(0, 0, 0);
  border-radius: 0.5em;
}

.amenity-icon {
  width: 34px;
  height: 34px;
  cursor: pointer;
}


.amenity-wrapper:hover .amenity-name {
  opacity: 1;
}

.default-section-style {
  border-radius: 8px;
  padding: 1em;
  box-sizing: border-box;
}

.margin-top {
  margin-top: 5em;
}

.full-width {
  width: 80%;
}

.shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
  