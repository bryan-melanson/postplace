<template>
  <div class="page-root">
    <header class="toolbar">
      <h1 class="wall-title">PostPlace</h1>
      <button class="add-btn" @click="addOpen = true" aria-label="Add poster">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22" height="22" fill="currentColor">
          <path d="M256 48a208 208 0 1 1 0 416A208 208 0 1 1 256 48zm0-48a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM232 344v-88H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h88V120c0-13.3 10.7-24 24-24s24 10.7 24 24v88h88c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v88c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>
      </button>
    </header>

    <div class="wall-content">
      <div class="poster-grid">
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
    </div>

    <!-- Show Detail Modal -->
    <div v-if="detailOpen" class="modal-overlay" @click.self="detailOpen = false">
      <div class="modal-sheet">
        <ShowDetailModal
          v-if="selectedShow"
          :show="selectedShow"
          @close="detailOpen = false"
        />
      </div>
    </div>

    <!-- Add Poster Modal -->
    <div v-if="addOpen" class="modal-overlay" @click.self="addOpen = false">
      <div class="modal-sheet">
        <AddPosterModal
          @close="addOpen = false"
          @add="handleAddShow"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { shows, addShow } from '../data/shows';
import type { Show } from '../data/shows';
import ShowDetailModal from '../components/ShowDetailModal.vue';
import AddPosterModal from '../components/AddPosterModal.vue';

const detailOpen = ref(false);
const addOpen = ref(false);
const selectedShow = ref<Show | null>(null);

function openDetail(show: Show) {
  selectedShow.value = show;
  detailOpen.value = true;
}

function handleAddShow(show: Omit<Show, 'id'>) {
  addShow(show);
  addOpen.value = false;
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

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 56px;
  background: #0a0a0f;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.wall-title {
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: 22px;
  color: #fff;
  margin: 0;
}

.add-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.add-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.wall-content {
  flex: 1;
  overflow-y: auto;
  background: #0a0a0f;
  -webkit-overflow-scrolling: touch;
}

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
.poster.size-small {
  grid-column: span 1;
  grid-row: span 1;
}

.poster.size-medium {
  grid-column: span 1;
  grid-row: span 2;
}

.poster.size-large {
  grid-column: span 2;
  grid-row: span 2;
}

.poster.size-wide {
  grid-column: span 2;
  grid-row: span 1;
}

/* Poster card */
.poster {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  cursor: pointer;
  background: #1a1a2e;
  transition: transform 0.2s ease;
}

.poster:hover {
  transform: scale(1.02);
  z-index: 1;
}

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

.poster:hover .poster-img {
  transform: scale(1.07);
}

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

.poster-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

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

/* Large posters always show info, adjust font sizes */
.size-large .poster-overlay {
  padding: 16px;
}

.size-large .poster-genre {
  font-size: 11px;
}

.size-large .poster-name {
  font-size: 18px;
}

.size-large .poster-artist {
  font-size: 13px;
}

.size-medium .poster-overlay {
  padding: 12px;
}

.size-medium .poster-name {
  font-size: 14px;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  align-items: flex-end;
}

.modal-sheet {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  border-radius: 16px 16px 0 0;
}
</style>
