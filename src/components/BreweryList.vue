<template>
  <div>
    <SearchBar @search="handleSearch" />
    <div v-if="loading">Loading breweries...</div>
    <ul>
      <li v-for="brewery in breweries" :key="brewery.id">
        <router-link :to="{ name: 'Details', params: { id: brewery.id }}">
          {{ brewery.name }}
        </router-link>
      </li>
    </ul>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="fetchBreweries"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';
import SearchBar from '@/components/SearchBar.vue';
import type { Brewery } from '@/types';

export default defineComponent({
  name: 'BreweryList',
  components: { Pagination, SearchBar },
  setup() {
    const breweries = ref<Brewery[]>([]);
    const currentPage = ref<number>(1);
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

    const handleSearch = (query: string): void => {
      searchQuery.value = query; // Update the search query
      currentPage.value = 1; // Reset to the first page
      fetchBreweries(); // Fetch results for the new query
    };

    watch(searchQuery, () => {
      currentPage.value = 1; // Reset to the first page when the query changes
      fetchBreweries(); // Fetch breweries for the updated search query
    });

    onMounted(() => {
      fetchBreweries();
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
      totalPages
    };
  },
});
</script>
