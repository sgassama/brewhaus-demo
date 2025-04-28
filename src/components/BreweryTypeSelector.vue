<template>

  <ion-list>
    <ion-item>
      <ion-select :value="type" @ionChange="type = $event.target.value" interface="popover">
        <ion-select-option value="micro">Micro</ion-select-option>
        <ion-select-option value="large">Large</ion-select-option>
        <ion-select-option value="">All</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>

</template>

<script setup
        lang="ts">
// import type { SelectCustomEvent } from '@ionic/core';
// import { watch } from 'vue';
import { IonSelect, IonList, IonItem, IonSelectOption } from '@ionic/vue';

const type = defineModel<string>();

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

<style scoped>

</style>
