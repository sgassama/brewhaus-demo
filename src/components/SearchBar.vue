<template>
  <div>
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Search breweries..."
        @keyup.enter="onSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  setup(_, { emit }) {
    const searchQuery = ref<string>('');

    const onSearch = (): void => {
      emit('search', searchQuery.value);
    };

    return {
      searchQuery,
      onSearch,
    };
  },
});
</script>
