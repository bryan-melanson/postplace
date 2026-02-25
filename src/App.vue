<template>
  <div class="app-root">
    <PosterWallPage />
  </div>
</template>

<script setup lang="ts">
import PosterWallPage from './views/PosterWallPage.vue';
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #0a0a0f;
  overflow: hidden;
}

#app, .app-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
