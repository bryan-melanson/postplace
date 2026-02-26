<template>
  <div class="modal-wrapper">
    <div class="modal-header" :style="{ '--accent': show.accentColor }">
      <img :src="show.imageUrl" :alt="show.title" class="hero-image" />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="genre-badge" :style="{ background: show.accentColor }">{{ show.genre }}</span>
        <h1 class="hero-title">{{ show.title }}</h1>
        <p class="hero-artist">{{ show.artist }}</p>
      </div>
      <button class="close-btn" @click="$emit('close')" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="modal-body">
      <div class="info-row">
        <div class="info-item">
          <span class="info-label">Date</span>
          <span class="info-value">{{ show.date }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Time</span>
          <span class="info-value">{{ show.time }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Venue</span>
          <span class="info-value">{{ show.venue }}</span>
        </div>
      </div>

      <p class="description">{{ show.description }}</p>

      <button
        class="tickets-btn"
        :style="{ background: show.accentColor }"
      >
        Get Tickets
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Show } from '../data/shows';

defineProps<{ show: Show }>();
defineEmits<{ (e: 'close'): void }>();
</script>

<style scoped>
.modal-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #0e0e14;
  color: #fff;
  overflow-y: auto;
}

.modal-header {
  position: relative;
  height: 320px;
  flex-shrink: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.7) 70%,
    rgba(14, 14, 20, 1) 100%
  );
}

.hero-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 60px;
}

.genre-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 8px;
}

.hero-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 4px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hero-artist {
  font-size: 16px;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.modal-body {
  padding: 24px 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 100px;
}

.info-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 600;
}

.info-value {
  font-size: 15px;
  color: #fff;
  font-weight: 500;
}

.description {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.tickets-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: filter 0.2s, transform 0.1s;
}

.tickets-btn:hover {
  filter: brightness(1.15);
}

.tickets-btn:active {
  transform: scale(0.98);
}
</style>
