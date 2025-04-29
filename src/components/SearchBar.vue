<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search breweries..."
      @keyup.enter="onSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "SearchBar",
  setup(_, { emit }) {
    const route = useRoute();
    const searchQuery = ref<string>((route.query.search as string) || "");

    const onSearch = (): void => {
      emit("search", searchQuery.value);
    };

    return {
      searchQuery,
      onSearch,
    };
  },
});
</script>

<style scoped>
.search-bar {
  margin: 20px 0;
  text-align: center;
  display: flex;
}

.search-bar input {
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-bar input:focus {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}
</style>
