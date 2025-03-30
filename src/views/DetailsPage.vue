<template>
  <div class="details-page">
    <router-link :to="{ name: 'Home', query: $route.query }"
                 class="back-link">
      Back to list
    </router-link>

    <div v-if="loading" class="loading">Loading brewery details...</div>

    <div v-else-if="brewery" class="brewery-card">
      <h1 class="brewery-name">{{ brewery.name }}</h1>
      <div class="brewery-details">
        <p><strong>Type:</strong> {{ brewery.brewery_type }}</p>
        <p><strong>Address:</strong> {{ brewery.street }}, {{ brewery.city }}, {{ brewery.state }}</p>
        <p><strong>Postal Code:</strong> {{ brewery.postal_code }}</p>
        <p><strong>Country:</strong> {{ brewery.country }}</p>
        <p>
          <strong>Website: </strong>
          <a :href="brewery.website_url" target="_blank" rel="noopener noreferrer" class="brewery-link">
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
.details-page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.loading {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.not-found {
  text-align: center;
  font-size: 18px;
  color: #ff4d4f;
  font-weight: bold;
}

.brewery-card {
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.brewery-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.brewery-details {
  line-height: 1.6;
  color: #555;
  font-size: 16px;
}

.brewery-details p {
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
}

.brewery-details p strong {
  color: #333;
  margin-right: 10px;
}

.brewery-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s;
}

.brewery-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
