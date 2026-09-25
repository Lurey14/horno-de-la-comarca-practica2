<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'

const route = useRoute()
const pageName = computed(() => String(route.meta.title ?? 'El viaje'))
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <main class="main-panel">
      <div class="topbar"><div class="breadcrumbs"><span>EL HORNO DE LA COMARCA</span><span class="crumb-separator">/</span><strong>{{ pageName.toLocaleUpperCase('es') }}</strong></div><div class="topbar-right"><span class="topbar-sigil">✦</span><span>Horneado cada mañana</span></div></div>
      <RouterView v-slot="{ Component }"><Transition name="page" mode="out-in"><component :is="Component" /></Transition></RouterView>
      <footer class="site-footer"><span>Un pequeño horno en un gran mundo de historias</span><span>✧ &nbsp; Hecho con cariño, en la Comarca</span></footer>
    </main>
  </div>
</template>
