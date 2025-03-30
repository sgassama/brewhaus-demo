<template>
  <div id="app">
    <img src="@/assets/beer-mug.svg"
         alt="Hoppy To Be-Er Logo"
         width="100"
         height="100"
         class="logo"
    >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>


<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
  font-family: Arial, Helvetica, sans-serif;
}

img {
  margin-bottom: 20px;
}

router-view {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-radius: 10px;
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
