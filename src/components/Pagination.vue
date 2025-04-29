<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="$emit('change-page', currentPage - 1)"
    >
      Prev
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      :disabled="currentPage === totalPages"
      @click="$emit('change-page', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  "change-page": [type: number]
}>();
defineProps<{
  currentPage: number,
  totalPages: number,
}>();
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
  font-size: 16px;
}

.pagination button {
  padding: 10px 15px;
  font-size: 14px;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s,
  transform 0.2s;
}

.pagination button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.pagination span {
  color: #333;
  font-weight: bold;
}
</style>
