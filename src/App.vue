<template>
  <ion-app id="app">
    <img
      src="@/assets/beer-mug.svg"
      alt="Hoppy To Be-Er Logo"
      width="100"
      height="100"
      class="logo"
    />
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style scoped>
img {
  margin-bottom: 20px;
}

.logo {
  animation: swivel 1s ease-in-out;
}

@keyframes swivel {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
