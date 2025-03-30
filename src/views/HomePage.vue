<template>
  <div>
    <h1>Hoppy To Be-Er | Breweries</h1>
    <BreweryList />
  </div>
</template>

<script lang="ts">
import { useHead } from '@vueuse/head'
import { defineComponent } from 'vue';
import BreweryList from '@/components/BreweryList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    BreweryList,
  },
  setup() {
    useHead({
      title: 'Hoppy To Be-Er | Breweries',
      meta: [
        {
          name: 'description',
          content: 'Discover breweries and their details on Hoppy To Be-Er.',
        },
        {
          name: 'keywords',
          content: `Brewery, Beer, Brewing`,
        },
      ],
    });
    return {};
  },
});
</script>
