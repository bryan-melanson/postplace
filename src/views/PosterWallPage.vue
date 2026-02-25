<template>
  <div class="page-root">
    <ion-header>
      <ion-toolbar>
        <ion-title class="wall-title">PostPlace</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openAdd()" aria-label="Add poster">
            <ion-icon :icon="addCircleOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :scroll-events="false">
      <div v-if="showsLoading" class="loading">Loading…</div>
      <div v-else-if="showsError" class="error">{{ showsError }}</div>
      <div v-else class="poster-grid">
        <div
          v-for="show in shows"
          :key="show.id"
          class="poster"
          :class="`size-${show.posterSize}`"
          @click="openDetail(show)"
          role="button"
          :aria-label="`${show.title} by ${show.artist}`"
          tabindex="0"
          @keydown.enter="openDetail(show)"
        >
          <img
            :src="show.imageUrl"
            :alt="show.title"
            class="poster-img"
            loading="lazy"
          />
          <div class="poster-overlay" :style="{ '--accent': show.accentColor }">
            <div class="poster-meta">
              <span class="poster-genre">{{ show.genre }}</span>
              <h3 class="poster-name">{{ show.title }}</h3>
              <p class="poster-artist">{{ show.artist }}</p>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon, modalController,
} from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';

import { shows, showsLoading, showsError, fetchShows, addShow } from '../data/shows';
import type { Show } from '../data/shows';

onMounted(fetchShows);
import ShowDetailModal from '../components/ShowDetailModal.vue';
import AddPosterModal from '../components/AddPosterModal.vue';

async function openDetail(show: Show) {
  const modal = await modalController.create({
    component: ShowDetailModal,
    componentProps: {
      show,
      onClose: () => modal.dismiss(),
    },
  });
  await modal.present();
}

async function openAdd() {
  const modal = await modalController.create({
    component: AddPosterModal,
    componentProps: {
      onClose: () => modal.dismiss(),
      onAdd: (show: Omit<Show, 'id'>) => {
        addShow(show);
        modal.dismiss();
      },
    },
  });
  await modal.present();
}
</script>

<style scoped>
.page-root {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
}

.wall-title {
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* Poster grid */
.poster-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-auto-rows: 140px;
  grid-auto-flow: row dense;
  gap: 4px;
  padding: 4px;
  background: #0a0a0f;
  min-height: 100%;
}

/* Poster size variants */
.poster.size-small  { grid-column: span 1; grid-row: span 1; }
.poster.size-medium { grid-column: span 1; grid-row: span 2; }
.poster.size-large  { grid-column: span 2; grid-row: span 2; }
.poster.size-wide   { grid-column: span 2; grid-row: span 1; }

/* Poster card */
.poster {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  background: #1a1a2e;
  transition: transform 0.2s ease;
}

.poster:hover { transform: scale(1.02); z-index: 1; }

.poster:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.6);
  outline-offset: 2px;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.poster:hover .poster-img { transform: scale(1.07); }

/* Text overlay */
.poster-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 35%,
    rgba(0, 0, 0, 0.55) 65%,
    rgba(0, 0, 0, 0.88) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.poster:hover .poster-overlay,
.size-large .poster-overlay,
.size-medium .poster-overlay {
  opacity: 1;
}

.poster-meta { display: flex; flex-direction: column; gap: 2px; }

.poster-genre {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent, #fff);
  margin-bottom: 1px;
}

.poster-name {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.poster-artist {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.loading, .error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.4);
  font-size: 15px;
}

.error { color: #f87171; }

/* Large/medium poster text adjustments */
.size-large .poster-overlay { padding: 16px; }
.size-large .poster-genre   { font-size: 11px; }
.size-large .poster-name    { font-size: 18px; }
.size-large .poster-artist  { font-size: 13px; }
.size-medium .poster-overlay { padding: 12px; }
.size-medium .poster-name    { font-size: 14px; }
</style>
