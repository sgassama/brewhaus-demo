<template>
  <div>
    <h1>Breweries</h1>
    <BreweryList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BreweryList from '@/components/BreweryList.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    BreweryList,
  },
});
</script>
