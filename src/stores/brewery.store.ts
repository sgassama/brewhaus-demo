import * as api from "@/services/api.ts";
import type { Brewery } from "@/types";
import { defineStore } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

const fetchBreweries = async (page: number,
                              perPage: number,
                              searchQuery: string,
                              breweryType: string): Promise<{
  breweries: Brewery[],
  total: number
}> => {
  try {
    const breweries = await api.fetchBreweries(
      page,
      perPage,
      searchQuery,
      breweryType
    );

    return breweries || [];

  } catch (error) {
    console.error("Error fetching breweries:", error);
    throw error;
  }
};

export const useBreweryStore = defineStore("brewery", () => {

  const breweries = ref<Brewery[]>([]);
  const loading = ref(false);
  const page = ref(1);
  const type = ref("");
  const perPage = ref(10);
  const searchQuery = ref("");
  const totalItems = ref(0);
  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / perPage.value);
  });

  onMounted(async () => {
    loading.value = true;
    const breweryData = await fetchBreweries(page.value, perPage.value, searchQuery.value, type.value);
    breweries.value = breweryData.breweries;
    totalItems.value = breweryData.total;
    loading.value = false;
  });

  watch(
    page,
    async (newPage: number) => {
      loading.value = true;
      page.value = newPage;

      const breweryData = await fetchBreweries(page.value, perPage.value, searchQuery.value, type.value);
      breweries.value = breweryData.breweries;
      totalItems.value = breweryData.total;
      loading.value = false;
    }
  );

  watch(
    searchQuery,
    async (newQuery: string) => {
      loading.value = true;
      searchQuery.value = newQuery;
      page.value = 1;

      const breweryData = await fetchBreweries(page.value, perPage.value, searchQuery.value, type.value);
      breweries.value = breweryData.breweries;
      totalItems.value = breweryData.total;
      loading.value = false;
    }
  );

  watch(
    type,
    async (newType: string) => {
      loading.value = true;
      type.value = newType;
      page.value = 1;

      const breweryData = await fetchBreweries(page.value, perPage.value, searchQuery.value, type.value);
      breweries.value = breweryData.breweries;
      totalItems.value = breweryData.total;
      loading.value = false;
    }
  );

  return { breweries, loading, page, totalPages, searchQuery, perPage, type };
});
