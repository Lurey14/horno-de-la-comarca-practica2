<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)
const links = [
  { to: '/', label: 'La panadería', icon: '⌂' },
  { to: '/menu', label: 'El menú', icon: '✿' },
  { to: '/encargos', label: 'Mi cesta', icon: '♧' },
]
</script>

<template>
  <button class="mobile-menu-button" type="button" :aria-expanded="open" aria-label="Abrir navegación" @click="open = !open">☰</button>
  <div v-if="open" class="mobile-scrim" @click="open = false"></div>
  <aside class="sidebar" :class="{ 'sidebar-open': open }">
    <RouterLink class="brand" to="/" @click="open = false">
      <span class="brand-mark"><span>✿</span></span>
      <span class="brand-name">EL HORNO<small>DE LA COMARCA</small></span>
    </RouterLink>
    <div class="sidebar-caption">PANADERÍA DE FANTASÍA</div>
    <nav class="side-nav" aria-label="Navegación principal">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="side-link" :class="{ active: route.path === link.to }" @click="open = false">
        <span class="side-icon">{{ link.icon }}</span><span>{{ link.label }}</span><span v-if="route.path === link.to" class="active-dot"></span>
      </RouterLink>
    </nav>
    <div class="sidebar-note"><span class="note-ornament">❧</span><p>Pan recién hecho y una silla junto al fuego.</p><small>ABIERTO DESDE EL PRIMER CANTO</small></div>
    <div class="sidebar-bottom"><span class="green-dot"></span> Horneamos con calma y cariño</div>
  </aside>
</template>
