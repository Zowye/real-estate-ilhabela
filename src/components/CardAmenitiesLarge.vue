<template>
  <div class="card-amenities">
    <div class="chip" v-for="amenity in amenities" :key="amenity">
      <div class="amenity-wrapper" :class="{ 'selected': selectedAmenities.includes(amenity) }"
        :style="{ '--image-bg': `url(${getAmenityImagePath(amenity)})` }" @click="toggleAmenitySelection(amenity)">
        <div class="amenity_name shadow" :class="{ 'selectedName': selectedAmenities.includes(amenity) }">{{
          getPresentationName(amenity) }}</div>
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
    image: "freezer.jpg"
  },
        BALCONY: {
          presentationName: "Varanda",
          image: "balcony.jpg"
        },
        BACKYARD: {
          presentationName: "Quintal",
          image: "backyard.jpg"
        },
        PETS_ALLOWED: {
          presentationName: "Aceita Pets",
          image: "pets_allowed.jpg"
        },
        GARDEN: {
          presentationName: "Jardim",
          image: "garden.jpg"
        },
        SERVICE_AREA: {
          presentationName: "Área de Serviço",
          image: "service_area.jpg"
        },
        AMERICAN_KITCHEN: {
          presentationName: "Cozinha Americana",
          image: "american_kitchen.jpg"
        },
        SEA_VIEW: {
          presentationName: "Vista para o Mar",
          image: "sea_view.jpg"
        },
        NATURAL_VENTILATION: {
          presentationName: "Ventilação Natural",
          image: "natural_ventilation.jpg"
        },
        POOL: {
          presentationName: "Piscina",
          image: "pool.jpg"
        },
        FIREPLACE: {
          presentationName: "Lareira",
          image: "fireplace.jpg"
        },
        BARBECUE_GRILL: {
          presentationName: "Churrasqueira",
          image: "barbecue_grill.jpg"
        },
        AIR_CONDITIONING: {
          presentationName: "Ar Condicionado",
          image: "air_cond.jpg"
        },
        SAUNA: {
          presentationName: "Sauna",
          image: "sauna.jpg"
        },
        FURNISHED: {
          presentationName: "Mobiliado",
          image: "furnished.jpg"
        },
        GOURMET_BALCONY: {
          presentationName: "Varanda Gourmet",
          image: "gourmet_balcony.jpg"
        },
        PLANNED_FURNITURE: {
          presentationName: "Móveis Planejados",
          image: "planned_furniture.jpg"
        },
        BARBECUE_BALCONY: {
          presentationName: "Varanda com Churrasqueira",
          image: "barbecue_balcony.jpg"
        },
        KITCHEN_CABINETS: {
          presentationName: "Armários de Cozinha",
          image: "kitchen_cabinets.jpg"
        },
        BATHROOM_CABINETS: {
          presentationName: "Armários no Banheiro",
          image: "bathroom_cabinets.jpg"
        },
        SERVICE_BATHROOM: {
          presentationName: "Banheiro de Serviço",
          image: "service_bathroom.jpg"
        },
        GAS_SHOWER: {
          presentationName: "Chuveiro a Gás",
          image: "gas_shower.jpg"
        },
        CLOSET: {
          presentationName: "Closet",
          image: "closet.jpg"
        },
        GOURMET_KITCHEN: {
          presentationName: "Cozinha Gourmet",
          image: "gourmet_kitchen.jpg"
        },
        GOURMET_SPACE: {
          presentationName: "Espaço Gourmet",
          image: "gourmet_kitchen.jpg"
        },
        LARGE_KITCHEN: {
          presentationName: "Cozinha Ampla",
          image: "large_kitchen.jpg"
        },
        PANTRY: {
          presentationName: "Despensa",
          image: "pantry.jpg"
        },
        LARGE_WINDOW: {
          presentationName: "Janelas Grandes",
          image: "large_window.jpg"
        },
        HIGH_CEILING_HEIGHT: {
          presentationName: "Pé Direito Alto",
          image: "high_ceiling.jpg"
        },
        LARGE_ROOM: {
          presentationName: "Cômodo Amplo",
          image: "large_room.jpg"
        },
        HEATING: {
          presentationName: "Aquecimento",
          image: "heating.jpg"
        },
        DECK: {
          presentationName: "Deck",
          image: "deck.jpg"
        },
        SERVICE_ENTRANCE: {
          presentationName: "Entrada de Serviço",
          image: "service_entrance.jpg"
        },
        WHIRLPOOL: {
          presentationName: "Banheira de Hidromassagem",
          image: "whirlpool.jpg"
        },
        DRESS_ROOM2: {
          presentationName: "Sala de Vestir 2",
          image: "dress_room2.jpg"
        },
        ELECTRONIC_GATE: {
          presentationName: "Portão Eletrônico",
          image: "electronic_gate.jpg"
        },
        INTEGRATED_ENVIRONMENTS: {
          presentationName: "Ambientes Integrados",
          image: "integrated_environments.jpg"
        },
        BLINDEX_BOX: {
          presentationName: "Box Blindex",
          image: "blindex_box.jpg"
        },
        STAIR: {
          presentationName: "Escada",
          image: "stair.jpg"
        },
        COOKER: {
          presentationName: "Fogão",
          image: "cooker.jpg"
        },
        PANORAMIC_VIEW: {
          presentationName: "Vista Panorâmica",
          image: "panoramic_view.jpg"
        },
        PRIVATE_POOL: {
          presentationName: "Piscina Privada",
          image: "private_pool.jpg"
        },
        GYM: {
          presentationName: "Academia Privativa",
          image: "gym.jpg"
        },
        COWORKING: {
          presentationName: "Coworking",
          image: "coworking.jpg"
        },
        LAUNDRY: {
          presentationName: "Lavanderia",
          image: "laundry.jpg"
        },
        PLAYGROUND: {
          presentationName: "Playground",
          image: "playground.jpg"
        },
        CINEMA: {
          presentationName: "Cinema",
          image: "cinema.jpg"
        },
        SQUASH: {
          presentationName: "Quadra de Squash",
          image: "squash.jpg"
        },
        PARKING: {
          presentationName: "Estacionamento",
          image: "parking.jpg"
        },
        TENIS_COURT: {
          presentationName: "Quadra de Tênis",
          image: "tennis_court.jpg"
        },
        CONCIERGE_24H: {
          presentationName: "Concierge 24hrs",
          image: "concierge24h.jpg"
        },
        GATED_COMMUNITY: {
          presentationName: "Condomínio Fechado",
          image: "gated_comunnity.jpg"
        },
        BICYCLES_PLACE: {
          presentationName: "Local para Bicicletas",
          image: "bicycles_place.jpg"
        },
        BATHTUB: {
          presentationName: "Banheira",
          image: "bathtub.jpg"
        },
        SAFETY_CIRCUIT: {
          presentationName: "Circuito de Segurança",
          image: "safety_circuit.jpg"
        }
        ,
        PARTY_HALL: {
          presentationName: "Salão de Festas",
          image: "party_hall.jpg"
        },
        ADULT_GAME_ROOM: {
          presentationName: "Salão de Jogos",
          image: "adult_game_room.jpg"
        },
        INTERNET_ACCESS: {
          presentationName: "Acesso à Internet",
          image: "internet_access.jpg"
        },
        BAR: {
          presentationName: "Bar",
          image: "bar.jpg"
        },
        GUEST_PARKING: {
          presentationName: "Estacionamento para Visitas",
          image: "guest_parking.jpg"
        },
        CARETAKER_HOUSE: {
          presentationName: "Casa para Funcionário",
          image: "caretaker_house.jpg"
        },
        CORNER_PROPERTY: {
          presentationName: "Casa de Esquina",
          image: "corner_property.jpg"
        },
        HOME_OFFICE: {
          presentationName: "Home Office",
          image: "home_office.jpg"
        },
        ALARM_SYSTEM: {
          presentationName: "Sistema de Alarme",
          image: "alarm_system.jpg"
        },
        KITCHEN: {
          presentationName: "Cozinha",
          image: "kitchen.jpg"
        },
        MEZZANINE: {
          presentationName: "Mezzanine",
          image: "mezzanine.jpg"
        },
        NEAR_ACCESS_ROADS: {
          presentationName: "Acesso fácil à Pista",
          image: "near_access_road.jpg"
        },
        LAVABO: {
          presentationName: "Lavabo",
          image: "lavabo.jpg"
        },
        NEAR_SCHOOL: {
          presentationName: "Próximo a Escola",
          image: "near_school.jpg"
        },
        NEAR_HOSPITAL: {
          presentationName: "Próximo a Hospital",
          image: "near_hospital.jpg"
        },
        NEAR_SHOPPING_CENTER: {
          presentationName: "Próximo a Shopping",
          image: "near_shopping_center.jpg"
        },
        DINNER_ROOM: {
          presentationName: "Sala de Jantar",
          image: "dinner_room.jpg"
        },
        NEAR_PUBLIC_TRANSPORT: {
          presentationName: "Próximo a Transporte Público",
          image: "near_public_transport.jpg"
        },
        PIZZA_OVEN: {
          presentationName: "Forno de Pizza",
          image: "pizza_oven.jpg"
        },
        BUILTIN_WARDROBE: {
          presentationName: "Guarda-roupa Embutido",
          image: "builtin_wardrobe.jpg"
        },
        ELEVATOR:{
          presentationName: "Elevador",
          image: "elevator.jpg"
        }

      }
    };

  }
  ,
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
.card-amenities {
  display: grid;
  grid-template-columns: repeat(auto-fill, 8em);
  gap: 1em;
  justify-content: start;
  width: 100%;
  align-items: center;
}

.amenity-wrapper {
  box-sizing: border-box;
  position: relative;
  width: 8em;
  height: 8em;
  color: rgb(255, 255, 255);
  border-radius: 50%;
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
  box-shadow: 1px 4px 8px rgba(255, 0, 0, 0.4);
}

.amenity-icon {
  width: 34px;
  height: 34px;
  cursor: pointer;
}

/* .amenity-name {
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
} */

.amenity-wrapper:hover .amenity-name {
  opacity: 1;
}


.shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
  