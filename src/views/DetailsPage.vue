<template>
  <ion-page>
    <ion-header v-if="brewery" :translucent="true">
      <ion-toolbar>
        <ion-title v-if="brewery?.name && !loading" size="large">{{
          brewery?.name
        }}</ion-title>
        <router-link
          :to="{ name: 'Home', query: $route.query }"
          class="back-link"
        >
          Back to list
        </router-link>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header v-if="brewery" collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{
            brewery?.name || "Hoppy To Be'Er"
          }}</ion-title>
          <router-link
            :to="{ name: 'Home', query: $route.query }"
            class="back-link"
          >
            Back to list
          </router-link>
        </ion-toolbar>
      </ion-header>

      <div v-if="loading" class="loading">Loading brewery details...</div>

      <template v-else-if="brewery">
        <ion-card class="brewery-details">
          <p><strong>Type:</strong> {{ brewery.brewery_type }}</p>
          <p>
            <strong>Address:</strong> {{ brewery.street }}, {{ brewery.city }},
            {{ brewery.state }}
          </p>
          <p><strong>Postal Code:</strong> {{ brewery.postal_code }}</p>
          <p><strong>Country:</strong> {{ brewery.country }}</p>
          <p>
            <strong>Website: </strong>
            <a
              :href="brewery.website_url"
              target="_blank"
              rel="noopener noreferrer"
              class="brewery-link"
            >
              {{ brewery.website_url }}
            </a>
            <span v-if="!brewery.website_url">N/A</span>
          </p>
        </ion-card>
      </template>

      <div v-else>
        <p>Brewery not found.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import * as api from "@/services/api.ts";
import type { Brewery } from "@/types";
import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/vue";
import { useHead } from "@vueuse/head";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const brewery = ref<Brewery | null>(null);
const loading = ref<boolean>(false);

const fetchBreweryDetails = async (): Promise<void> => {
  const breweryId = route.params.id as string;
  loading.value = true;

  try {
    brewery.value = await api.fetchBreweryDetails(breweryId);

    // useHead({
    //   title: `${ brewery.value?.name ? brewery.value.name + ' | ' : null } Hoppy To Be-Er`,
    //   meta: [
    //     {
    //       name: 'keywords',
    //       content: `${ brewery.value?.name ?
    //           brewery.value.name + ',' :
    //           null } Brewery, Beer, Brewing, ${ brewery.value?.city ?
    //           brewery.value.city + ',' :
    //           null } ${ brewery.value?.state ? brewery.value.state : '' }`,
    //     },
    //   ],
    // });
  } catch (error) {
    console.error("Error fetching brewery details:", error);
    brewery.value = null; // Reset to null on error
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBreweryDetails();
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
