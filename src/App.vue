<template>
  <ion-app>
    <PosterWallPage />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp } from '@ionic/vue';
import PosterWallPage from './views/PosterWallPage.vue';
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  background: #0a0a0f;
  overflow: hidden;
}
</style>
