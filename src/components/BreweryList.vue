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
import * as api from '@/services/api.ts'
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
    const searchQuery = ref<string>(route.query.search as string || '');
    const loading = ref<boolean>(false);
    const totalPages = computed(() => {
      return Math.ceil(totalBreweries.value / perPage.value);
    });

    const fetchBreweries = async (page = 1): Promise<void> => {
      loading.value = true;
      try {
        breweries.value = await api.fetchBreweries(page, perPage.value, searchQuery.value);
        const receivedCount = breweries.value.length;

        if(!searchQuery.value) {
          totalBreweries.value = 1000;
        } else if (receivedCount < perPage.value) {
          totalBreweries.value = (page - 1) * perPage.value + receivedCount;
        } else if (!!receivedCount) {
          totalBreweries.value = Math.max(totalBreweries.value, page * perPage.value);
        }

        currentPage.value = page;
      } catch (error) {
        console.error('Error fetching breweries:', error);
      } finally {
        loading.value = false;
      }
    };

    const goToPage = (page: number): void => {
      router.push({ query: { ...route.query, page: page.toString(), search: searchQuery.value } });   // Update query params
      fetchBreweries(page);  // Fetch new data for the selected page
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

    watch(
        () => route.query, // Getter function returns the current value of route.query
        (newQuery) => {
          const nextPage = Number(newQuery.page) || 1;
          const newSearch = newQuery.search as string || '';

          if (nextPage !== currentPage.value || newSearch !== searchQuery.value) {
            searchQuery.value = newSearch;
            currentPage.value = nextPage;
            fetchBreweries(nextPage); // Fetch breweries when query params change
          }
        },
        { deep: true }
    );

    onMounted(() => {
      const initialPage = Number(route.query.page) || 1; // Get the current page from query params
      currentPage.value = initialPage; // Synchronize currentPage with the query params
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
.brewery-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.brewery-item {
  margin: 10px 0;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.brewery-item:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

.brewery-item a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.brewery-item a:hover {
  color: #007BFF;
}
</style>
