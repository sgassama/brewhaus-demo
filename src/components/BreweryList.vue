<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title data-test="app-header">Hoppy To Be-Er | Breweries</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title data-test="app-header" size="large"
        >Hoppy To Be-Er | Breweries
        </ion-title
        >
      </ion-toolbar>
    </ion-header>

    <SearchBar @search="handleSearch" />

    <template v-if="breweryStore.loading">
      <ion-spinner id="loading-spinner" name="lines"></ion-spinner>
    </template>

    <!--  <div>Selected: {{ breweryType || 'All' }}</div>-->

    <BreweryTypeSelector v-model="breweryType" />

    <ion-card>
      <ion-list class="ion-padding brewery-list">
        <ion-item
          v-for="brewery in breweryStore.breweries"
          :key="brewery.id"
          class="brewery-item"
        >
          <router-link
            :to="{
              name: 'Details',
              params: { id: brewery.id },
            }"
          >
            {{ brewery.name }}
          </router-link>
        </ion-item>
      </ion-list>
    </ion-card>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <Pagination
        :current-page="breweryStore.page"
        :total-pages="breweryStore.totalPages"
        @change-page="goToPage"
      />
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
import BreweryTypeSelector from "@/components/BreweryTypeSelector.vue";
import Pagination from "@/components/Pagination.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useBreweryStore } from "@/stores/brewery.store";
import {
  IonCard,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import { ref, watch } from "vue";
// import { useRoute, useRouter } from "vue-router";

// const route = useRoute();
// const router = useRouter();

const breweryStore = useBreweryStore();
// const { breweries, loading, page: currentPage, totalPages } = useBreweryStore();

// const breweries = ref<Brewery[]>([]);
// const currentPage = ref<number>(Number(route.query.page) || 1);
// const perPage = ref<number>(10);
// const totalBreweries = ref<number>(0);
// const searchQuery = ref<string>((route.query.search as string) || "");
// const loading = ref<boolean>(true);
// const totalPages = computed(() => {
//   return Math.ceil(totalBreweries.value / perPage.value);
// });
const breweryType = ref<string>(breweryStore.type);

const goToPage = (page: number): void => {
  breweryStore.page = page;
};

const handleSearch = (search: string): void => {
  breweryStore.searchQuery = search;
};

watch(
  breweryType,
  (newType) => {
    breweryStore.type = newType;
  }
)
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
  transition: transform 0.2s,
  box-shadow 0.2s;
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
  color: #007bff;
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
