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

<style scoped>
/* Styling for the search bar container */
.search-bar {
  margin: 20px 0; /* Space around the search bar */
  text-align: center; /* Center the input field horizontally */
}

/* Basic input styles for the search bar */
.search-bar input {
  padding: 10px 15px; /* Add space inside the input */
  font-size: 16px; /* Slightly larger font for readability */
  border: 1px solid #ccc; /* Light gray border around the input */
  border-radius: 8px; /* Rounded corners */
  outline: none; /* Remove default focus outline */
  width: 100%; /* Full width for mobile responsiveness */
  max-width: 400px; /* Limit width on larger screens */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: border-color 0.2s, box-shadow 0.2s; /* Smooth effects */
}

/* Focus state for the input */
.search-bar input:focus {
  border-color: #007BFF; /* Blue border on focus */
  box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.2); /* Enhance shadow */
}
</style>
