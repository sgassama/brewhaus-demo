<template>
  <select v-model="type">
    <option disabled
            value="">Please select one
    </option>
    <option value="micro">Micro</option>
    <option value="large">Large</option>
    <option value="">All</option>
  </select>
</template>

<script setup
        lang="ts">
const type = defineModel<string>()
// const props = defineProps<{
//   modelValue: string
// }>()


// const emits = defineEmits<{
//   'update:modelValue': [type: string]
// }>()

// watch(breweryTpe, (type: string) => {
//   emits('update:modelValue', type)
// })

</script>

<style scoped>

</style>
