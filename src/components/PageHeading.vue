<script setup lang="ts">
defineProps<{ kicker: string; title: string; description: string }>()
</script>

<template>
  <header class="page-heading">
    <p class="eyebrow heading-kicker"><span class="eyebrow-star">✧</span> {{ kicker }}</p>
    <h1>{{ title }}</h1>
    <p class="heading-description">{{ description }}</p>
    <div class="heading-rule"><span></span><i>✦</i><span></span></div>
  </header>
</template>
