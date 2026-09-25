<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { AtlasEntry } from '../types'

defineProps<{ entry: AtlasEntry | null }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="veil">
      <div v-if="entry" class="modal-backdrop" role="presentation" @click.self="emit('close')">
        <section class="entry-modal" role="dialog" aria-modal="true" :aria-label="entry.name">
          <button class="modal-close" type="button" aria-label="Cerrar ficha" @click="emit('close')">×</button>
          <div class="modal-art" :class="`palette-${entry.palette}`"><span>{{ entry.symbol }}</span><i></i></div>
          <p class="eyebrow">{{ entry.kind }} <span>·</span> {{ entry.era }}</p>
          <h2>{{ entry.name }}</h2>
          <p class="modal-region">{{ entry.region }}</p>
          <p class="modal-detail">{{ entry.detail }}</p>
          <div class="modal-foot"><span class="tiny-star">✦</span> Una página del Legendarium <span class="tiny-star">✦</span></div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
