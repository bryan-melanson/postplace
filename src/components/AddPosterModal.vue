<template>
  <div class="modal-wrapper">
    <div class="modal-head">
      <h2 class="modal-title">Add Poster</h2>
      <button class="close-btn" @click="$emit('close')" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label">Show Title *</label>
        <input v-model="form.title" class="input" type="text" placeholder="e.g. Electric Nights" required />
      </div>

      <div class="field">
        <label class="label">Artist / Act *</label>
        <input v-model="form.artist" class="input" type="text" placeholder="e.g. The Voltage" required />
      </div>

      <div class="field-row">
        <div class="field">
          <label class="label">Venue *</label>
          <input v-model="form.venue" class="input" type="text" placeholder="e.g. Metro Arena" required />
        </div>
        <div class="field">
          <label class="label">Genre</label>
          <input v-model="form.genre" class="input" type="text" placeholder="e.g. Rock" />
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label class="label">Date *</label>
          <input v-model="form.date" class="input" type="text" placeholder="e.g. May 15, 2026" required />
        </div>
        <div class="field">
          <label class="label">Time</label>
          <input v-model="form.time" class="input" type="text" placeholder="e.g. 8:00 PM" />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <textarea v-model="form.description" class="input textarea" placeholder="Tell people what to expect..." rows="3"></textarea>
      </div>

      <div class="field">
        <label class="label">Image URL</label>
        <input v-model="form.imageUrl" class="input" type="url" placeholder="https://..." />
        <span class="hint">Leave blank for a random placeholder image</span>
      </div>

      <div class="field-row">
        <div class="field">
          <label class="label">Poster Size</label>
          <select v-model="form.posterSize" class="input select">
            <option value="small">Small (1×1)</option>
            <option value="medium">Medium (1×2, portrait)</option>
            <option value="wide">Wide (2×1, landscape)</option>
            <option value="large">Large (2×2, big)</option>
          </select>
        </div>
        <div class="field">
          <label class="label">Accent Color</label>
          <input v-model="form.accentColor" class="input color-input" type="color" />
        </div>
      </div>

      <div v-if="imagePreview" class="preview">
        <img :src="imagePreview" alt="Preview" />
      </div>

      <button type="submit" class="submit-btn" :disabled="!isValid">
        Add to Wall
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { Show, PosterSize } from '../data/shows';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'add', show: Omit<Show, 'id'>): void;
}>();

const form = reactive({
  title: '',
  artist: '',
  venue: '',
  date: '',
  time: '',
  description: '',
  genre: '',
  imageUrl: '',
  posterSize: 'small' as PosterSize,
  accentColor: '#7c3aed',
});

let placeholderSeed = Math.floor(Math.random() * 10000);

const imagePreview = computed(() => {
  if (form.imageUrl.trim()) return form.imageUrl.trim();
  return null;
});

const isValid = computed(() => form.title.trim() && form.artist.trim() && form.venue.trim() && form.date.trim());

function handleSubmit() {
  if (!isValid.value) return;

  const sizeMap: Record<PosterSize, string> = {
    small: '300/300',
    medium: '300/600',
    wide: '600/300',
    large: '600/600',
  };

  const resolvedImage =
    form.imageUrl.trim() ||
    `https://picsum.photos/seed/user${placeholderSeed}/${sizeMap[form.posterSize]}`;

  emit('add', {
    title: form.title.trim(),
    artist: form.artist.trim(),
    venue: form.venue.trim(),
    date: form.date.trim(),
    time: form.time.trim() || 'TBA',
    description: form.description.trim() || 'No description provided.',
    genre: form.genre.trim() || 'Live Event',
    posterSize: form.posterSize,
    imageUrl: resolvedImage,
    accentColor: form.accentColor,
  });
}
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

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
  flex-shrink: 0;
}

.modal-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 40px;
}

.field-row {
  display: flex;
  gap: 12px;
}

.field-row .field {
  flex: 1;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(255, 255, 255, 0.5);
}

.input {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 10px 12px;
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.input:focus {
  border-color: rgba(124, 58, 237, 0.6);
}

.textarea {
  resize: vertical;
  min-height: 80px;
}

.select {
  appearance: none;
  cursor: pointer;
}

.color-input {
  padding: 4px 6px;
  height: 42px;
  cursor: pointer;
}

.hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  margin-top: -2px;
}

.preview {
  border-radius: 8px;
  overflow: hidden;
  max-height: 200px;
}

.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: #7c3aed;
  cursor: pointer;
  letter-spacing: 0.02em;
  margin-top: 4px;
  transition: filter 0.2s, transform 0.1s;
}

.submit-btn:hover:not(:disabled) {
  filter: brightness(1.15);
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
