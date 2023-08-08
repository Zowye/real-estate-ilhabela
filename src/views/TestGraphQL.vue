<template>
    <div>
        <div v-if="propertyData">
            Property ID: {{ propertyData.getProperty.id }}
            Street: {{ propertyData.getProperty.street }}
            Street Number: {{ propertyData.getProperty.streetnumber }}
            Street Number: {{ propertyData.getProperty.neighborhood }}
            Medias:
            <ul>
                <li v-for="media in propertyData.getProperty.medias" :key="media.id">
                    {{ media.url }}
                </li>
            </ul>
        </div>
        <div v-else>
            Loading data...
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            propertyData: null,
        };
    },
    created() {
        // Definindo a consulta GraphQL como uma string
        const GET_PROPERTY_QUERY = `
        query {
          getProperty(id: 24494) {
            id
            street
            streetnumber
            neighborhood
            medias {
              id
              url
            }
          }
        }
      `;

        // Enviando a requisição com Axios
        axios({
            url: 'http://localhost:4000/graphql', // substitua pelo URL do seu endpoint GraphQL
            method: 'post',
            data: {
                query: GET_PROPERTY_QUERY
            }
        }).then((result) => {
            this.propertyData = result.data.data;
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
};
</script>
  