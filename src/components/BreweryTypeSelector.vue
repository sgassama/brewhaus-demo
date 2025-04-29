<template>
  <select v-model="type">
    <option disabled value="">Please select one</option>
    <option value="micro">Micro</option>
    <option value="large">Large</option>
    <option value="">All</option>
  </select>
</template>

<script setup lang="ts">
const type = defineModel<string>();

// import type { SelectCustomEvent } from '@ionic/core';
// import { watch } from 'vue';

// const emits = defineEmits<{
//   'update:modelValue': [type: string]
// }>()
// const props = defineProps<{
//   modelValue: string
// }>()
// watch(() => props.modelValue, (type: string) => {
//   console.log(type)
//   debugger
//   emits('update:modelValue', type)
// })

// function handleSelectChange(event: SelectCustomEvent) {
//   console.log(event)
//   type.value = event.target?.value;
// }
</script>

<style scoped></style>
