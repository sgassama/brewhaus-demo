<template>
  <div class="details-page">
    <router-link :to="{ name: 'Home', query: $route.query }"
                 class="back-link">
      Back to list
    </router-link>

    <div v-if="loading">Loading brewery details...</div>
    <div v-else-if="brewery">
      <h1>{{ brewery.name }}</h1>
      <div class="brewery-details">
        <p><strong>Type:</strong> {{ brewery.brewery_type }}</p>
        <p><strong>Address:</strong> {{ brewery.street }}, {{ brewery.city }}, {{ brewery.state }}</p>
        <p><strong>Postal Code:</strong> {{ brewery.postal_code }}</p>
        <p><strong>Country:</strong> {{ brewery.country }}</p>
        <p>
          <strong>Website: </strong>
          <a :href="brewery.website_url" target="_blank" rel="noopener noreferrer">
            {{ brewery.website_url }}
          </a>
          <span v-if="!brewery.website_url">N/A</span>
        </p>
      </div>
    </div>
    <div v-else>
      <p>Brewery not found.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import type { Brewery } from '@/types';

export default defineComponent({
  name: 'DetailsPage',
  setup() {
    const route = useRoute();
    const brewery = ref<Brewery | null>(null);
    const loading = ref<boolean>(false);

    const fetchBreweryDetails = async (): Promise<void> => {
      const breweryId = route.params.id as string;
      const url = `https://api.openbrewerydb.org/breweries/${breweryId}`;
      loading.value = true;

      try {
        const response = await axios.get(url);
        brewery.value = response.data;
      } catch (error) {
        console.error('Error fetching brewery details:', error);
        brewery.value = null; // Reset to null on error
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchBreweryDetails();
    });

    return {
      brewery,
      loading,
    };
  },
});
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 12px;
  text-decoration: none;
  color: #007bff;
}

.back-link:hover {
  text-decoration: underline;
}

.brewery-details p {
  margin: 8px 0;
}

.brewery-details p strong {
  font-weight: bold;
}
</style>
