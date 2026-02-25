<template>
  <div class="app-root">
    <PosterWallPage />
  </div>
</template>

<script setup lang="ts">
import PosterWallPage from './views/PosterWallPage.vue';
</script>

<style>
html, body, #app, .app-root {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #0a0a0f;
}
.app-root {
  display: flex;
  flex-direction: column;
}
</style>
