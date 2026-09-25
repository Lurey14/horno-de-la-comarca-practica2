<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeading from '../components/PageHeading.vue'
import BakeryProductCard from '../components/BakeryProductCard.vue'
import { bakeryProducts, type ProductCategory } from '../data/bakery'
import { useCart } from '../composables/useCart'

const query = ref('')
const activeCategory = ref<'Todo' | ProductCategory>('Todo')
const categories: Array<'Todo' | ProductCategory> = ['Todo', 'Panes', 'Dulces', 'Bebidas']
const cart = useCart()
const filtered = computed(() => bakeryProducts.filter((product) => {
  const categoryMatches = activeCategory.value === 'Todo' || product.category === activeCategory.value
  const text = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase('es')
  return categoryMatches && text.includes(query.value.trim().toLocaleLowerCase('es'))
}))
</script>

<template>
  <div class="page-content inner-page menu-page">
    <PageHeading kicker="PANES, DULCES Y ALGO CALENTITO" title="El menú del horno" description="Todo se prepara despacito, con ingredientes sencillos y una pizca de fantasía." />
    <div class="menu-banner"><span class="banner-star">✦</span><p><strong>Pequeño aviso de la cocina:</strong> estos precios son de muestra y puedes editarlos en <code>src/data/bakery.ts</code>.</p><span>✦</span></div>
    <section class="menu-controls" aria-label="Buscar productos del menú">
      <label class="search-box"><span aria-hidden="true">⌕</span><input v-model="query" type="search" placeholder="Busca algo rico..." aria-label="Buscar productos" /><kbd>✿</kbd></label>
      <div class="filter-row"><div class="filter-tabs" aria-label="Filtrar por categoría"><button v-for="category in categories" :key="category" type="button" :class="{ selected: activeCategory === category }" @click="activeCategory = category">{{ category }}</button></div><span class="result-count">{{ filtered.length }} delicias</span></div>
    </section>
    <div v-if="filtered.length" class="menu-grid"><BakeryProductCard v-for="product in filtered" :key="product.id" :product="product" @add="cart.add($event.id)" /></div>
    <div v-else class="empty-state"><span>☾</span><h2>No encontramos esa delicia</h2><p>Prueba otro nombre o cambia la categoría.</p><button class="text-link" type="button" @click="query = ''; activeCategory = 'Todo'">Mostrar todo el menú ↗</button></div>
    <RouterLink class="floating-cart" to="/encargos" aria-label="Ver cesta">♧ <span>Mi cesta · {{ cart.count.value }}</span></RouterLink>
  </div>
</template>
