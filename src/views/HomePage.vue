<template>
  <ion-page>
    <BreweryList />
  </ion-page>
</template>

<script lang="ts" setup>
import BreweryList from "@/components/BreweryList.vue";
import { IonPage } from "@ionic/vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Hoppy To Be-Er | Breweries",
  meta: [
    {
      name: "description",
      content: "Discover breweries and their details on Hoppy To Be-Er.",
    },
    {
      name: "keywords",
      content: `Brewery, Beer, Brewing`,
    },
  ],
});
</script>
