<template>
  <div id="app">
    <img src="@/assets/beer-mug.svg"
         alt="Hoppy To Be-Er Logo"
         width="100"
         height="100"
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
/* Add a simple flexbox layout to center the content */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f5f5f5; /* A soft background color */
  font-family: Arial, Helvetica, sans-serif;
}

img {
  margin-bottom: 20px; /* Add space below the image */
}

router-view {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for router content */
  background: #ffffff;
  border-radius: 10px; /* Rounded corners */
}
</style>
