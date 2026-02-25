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
  width: 100%;
  height: 100%;
  background: #0a0a0f;
  overflow: hidden;
}

.app-root {
  display: flex;
  flex-direction: column;
}
</style>
