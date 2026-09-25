<script setup lang="ts">
import type { AtlasEntry } from '../types'

defineProps<{ entry: AtlasEntry }>()
const emit = defineEmits<{ select: [entry: AtlasEntry] }>()
</script>

<template>
  <button class="atlas-card" :class="`palette-${entry.palette}`" type="button" @click="emit('select', entry)">
    <span class="card-art" aria-hidden="true"><span class="card-orbit"></span><span class="card-symbol">{{ entry.symbol }}</span><span class="card-horizon"></span></span>
    <span class="card-copy">
      <span class="eyebrow">{{ entry.kind }} <span>·</span> {{ entry.region }}</span>
      <span class="card-title">{{ entry.name }}</span>
      <span class="card-summary">{{ entry.summary }}</span>
      <span class="card-link">Descubrir ficha <span aria-hidden="true">↗</span></span>
    </span>
  </button>
</template>
