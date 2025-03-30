<template>
  <div>
    <SearchBar @search="handleSearch" />
    <div v-if="loading">Loading breweries...</div>
    <ul class="brewery-list">
      <li v-for="brewery in breweries" :key="brewery.id" class="brewery-item">
        <router-link :to="{
          name: 'Details',
          params: { id: brewery.id },
          query: $route.query
        }">
          {{ brewery.name }}
        </router-link>
      </li>
    </ul>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="goToPage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { Brewery } from '@/types';
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'BreweryList',
  components: { Pagination, SearchBar },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const breweries = ref<Brewery[]>([]);
    const currentPage = ref<number>(Number(route.query.page) || 1);
    const perPage = ref<number>(10);
    const totalBreweries = ref<number>(0);
    const searchQuery = ref<string>('');
    const loading = ref<boolean>(false);
    const totalPages = computed(() => {
      return Math.ceil(totalBreweries.value / perPage.value);
    });

    const fetchBreweries = async (page = 1): Promise<void> => {
      loading.value = true;
      try {
        const url = `https://api.openbrewerydb.org/breweries?page=${page}&per_page=${perPage.value}&by_name=${searchQuery.value}`;
        const response = await axios.get(url);
        const receivedCount = response.data.length;

        breweries.value = response.data;

        if(!searchQuery.value) {
          totalBreweries.value = 1000;
        } else if (receivedCount < perPage.value) {
          totalBreweries.value = (page - 1) * perPage.value + receivedCount;
        }

        currentPage.value = page;
      } catch (error) {
        console.error('Error fetching breweries:', error);
      } finally {
        loading.value = false;
      }
    };

    const goToPage = (page: number): void => {
      // Update query params
      router.push({ query: { ...route.query, page: page.toString() } });
      // Fetch new data for the selected page
      fetchBreweries(page);
    };

    const handleSearch = (query: string): void => {
      searchQuery.value = query; // Update the search query
      currentPage.value = 1; // Reset to the first page
      router.push({
        name: route.name,
        query: { ...route.query, page: '1', search: query },
      });

      fetchBreweries();
    };

    watch(route.query, (newQuery) => {
      const nextPage = Number(newQuery.page) || 1;
      if (nextPage !== currentPage.value) {
        // Fetch breweries whenever page changes
        fetchBreweries(nextPage);
      }
    });

    onMounted(() => {
      // Get the current page from query
      const initialPage = Number(route.query.page) || 1;
      // Synchronize currentPage with the query
      currentPage.value = initialPage;
      fetchBreweries(initialPage);
    });

    return {
      breweries,
      currentPage,
      totalBreweries,
      perPage,
      searchQuery,
      loading,
      fetchBreweries,
      handleSearch,
      goToPage,
      totalPages
    };
  },
});
</script>

<style scoped>
/* Typography and spacing for brewery list */
.brewery-list {
  list-style: none; /* Remove default bullet points */
  padding: 0; /* Remove default padding */
  margin: 20px 0; /* Add spacing around the list */
}

.brewery-item {
  margin: 10px 0; /* Space between list items */
  padding: 15px; /* Internal padding for better click area */
  background-color: #ffffff; /* White background for item */
  border: 1px solid #ddd; /* Light border around items */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
  transition: transform 0.2s, box-shadow 0.2s; /* Smooth animation effects */
}

.brewery-item:hover {
  transform: translateY(-2px); /* Lift up slightly on hover */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */
}

.brewery-item a {
  text-decoration: none; /* Remove underline from links */
  color: #333; /* Dark text color */
  font-weight: bold;
}

.brewery-item a:hover {
  color: #007BFF; /* Make link blue on hover */
}
</style>
