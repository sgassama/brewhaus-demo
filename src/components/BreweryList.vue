<template>

  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>Hoppy To Be-Er | Breweries</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Hoppy To Be-Er | Breweries</ion-title>
      </ion-toolbar>
    </ion-header>

    <SearchBar @search="handleSearch"/>

    <template v-if="loading">
      <ion-spinner name="lines"></ion-spinner>
    </template>

    <!--  <div>Selected: {{ breweryType || 'All' }}</div>-->

    <BreweryTypeSelector v-model="breweryType"/>

    <ion-card>
      <ion-list class="ion-padding brewery-list">
        <ion-item v-for="brewery in breweries"
                  :key="brewery.id"
                  class="brewery-item">
          <router-link :to="{
          name: 'Details',
          params: { id: brewery.id },
          query: route.query
        }">
            {{ brewery.name }}
          </router-link>
        </ion-item>
      </ion-list>
    </ion-card>

  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="goToPage"
      />
    </ion-toolbar>
  </ion-footer>
</template>

<script setup
        lang="ts">
import BreweryTypeSelector from '@/components/BreweryTypeSelector.vue';
import Pagination from '@/components/Pagination.vue';
import SearchBar from '@/components/SearchBar.vue';
import * as api from '@/services/api.ts';
import type { Brewery } from '@/types';
import { IonCard, IonFooter, IonHeader, IonItem, IonList, IonSpinner, IonTitle, IonToolbar, IonContent } from '@ionic/vue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
const breweryType = ref<string>(route.query.breweryType as string || '');

const fetchBreweries = async (): Promise<void> => {
  loading.value = true;
  try {
    breweries.value = await api.fetchBreweries(currentPage.value, perPage.value, searchQuery.value, breweryType.value);
    const receivedCount = breweries.value.length;

    if (!searchQuery.value) {
      totalBreweries.value = 1000;
    } else if (receivedCount < perPage.value) {
      totalBreweries.value = (currentPage.value - 1) * perPage.value + receivedCount;
    } else if (currentPage.value === 1) {
      totalBreweries.value = receivedCount;
    }

  } catch (error) {
    console.error('Error fetching breweries:', error);
  } finally {
    loading.value = false;
  }
};

const goToPage = (page: number): void => {
  router.push({ query: { ...route.query, page: page.toString(), search: searchQuery.value } });   // Update query params
  currentPage.value = page;

  fetchBreweries();  // Fetch new data for the selected page
};

const handleSearch = (query: string): void => {
  router.push({
    name: route.name,
    query: { ...route.query, page: 1, search: query },
  });

  fetchBreweries();
};

watch(
    () => route.query.page,
    (newPage) => {
      const nextPage = Number(newPage) || 1;

      if (nextPage !== currentPage.value) {
        router.push({
          name: route.name,
          query: { ...route.query, page: nextPage },
        });
        fetchBreweries(); // Fetch breweries when query params change
      }
    },
    { deep: true },
);

watch(() => breweryType.value, (newType) => {
  router.push({
    name: route.name,
    query: { ...route.query, breweryType: newType, page: 1 },
  });
  fetchBreweries();
});

onMounted(() => {
  fetchBreweries();
});
</script>

<style scoped>

.brewery-list {
  max-height: 60vh;
  overflow: scroll;
}

.brewery-item {
  margin: 10px 0;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.brewery-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.brewery-item a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.brewery-item a:hover {
  color: #007BFF;
}

ion-spinner {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  display: flex;
}

ion-content::part(scroll) {
  padding: var(--ion-safe-area-top, 0) var(--ion-safe-area-right, 0) var(--ion-safe-area-bottom, 0) var(--ion-safe-area-left, 0);
}
</style>
