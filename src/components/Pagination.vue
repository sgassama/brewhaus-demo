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
