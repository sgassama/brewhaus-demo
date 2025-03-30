<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="$emit('change-page', currentPage - 1)">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="$emit('change-page', currentPage + 1)">Next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
  },
});
</script>

<style scoped>
/* Pagination container */
.pagination {
  display: flex;
  justify-content: center; /* Center align pagination controls */
  align-items: center; /* Vertically align items */
  margin: 20px 0; /* Add spacing around pagination */
  gap: 10px; /* Space between buttons and text */
  font-size: 16px; /* Larger text for readability */
}

/* Button styling */
.pagination button {
  padding: 10px 15px; /* Add internal spacing */
  font-size: 14px; /* Font size for buttons */
  color: #ffffff; /* White text color */
  background-color: #007BFF; /* Blue background */
  border: none; /* Remove default border */
  border-radius: 5px; /* Slightly rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.2s, transform 0.2s; /* Smooth hover effects */
}

/* Disabled button styling */
.pagination button:disabled {
  background-color: #bbb; /* Light gray for disabled buttons */
  cursor: not-allowed; /* Show "not-allowed" cursor */
}

/* Hover state styling */
.pagination button:not(:disabled):hover {
  background-color: #0056b3; /* Darker blue on hover */
  transform: scale(1.05); /* Slight scaling effect */
}

/* Pagination text styling */
.pagination span {
  color: #333; /* Dark text color */
  font-weight: bold; /* Slightly bolder text */
}
</style>
