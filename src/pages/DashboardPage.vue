<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BakeryProductCard from '../components/BakeryProductCard.vue'
import { bakeryProducts } from '../data/bakery'
import { useCart } from '../composables/useCart'

const featured = bakeryProducts.filter((product) => ['pan-viaje', 'miel-beorn', 'tarta-manzana'].includes(product.id))
const cart = useCart()
</script>

<template>
  <div class="page-content home-page">
    <section class="bakery-hero">
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow"><span>✦</span> UN RINCÓN CALENTITO EN LA COMARCA</p>
        <h1>Un poquito de magia,<br />recién salida <em>del horno.</em></h1>
        <p class="hero-intro">Panes dorados, dulces caseros y sabores para acompañar cualquier aventura. Pasa, viajera: siempre hay algo rico esperándote.</p>
        <div class="hero-actions"><RouterLink class="button-primary" to="/menu">Descubrir el menú <span>⟶</span></RouterLink><RouterLink class="button-secondary" to="/encargos">Armar una cesta <span>↗</span></RouterLink></div>
        <div class="hero-note"><span>✿</span> Horneamos cada mañana con ingredientes sencillos</div>
      </div>
      <div class="hero-art" role="img" aria-label="Una panadería fantástica de puerta redonda, luz cálida y colinas verdes"><img src="/images/horno-comarca.svg" alt="" /><span class="art-caption">EL CAMINO SIEMPRE<br />LLEVA A CASA</span><span class="art-seal">☼<small>CALIENTE<br />DEL HORNO</small></span></div>
      <span class="hero-flower">✿</span>
    </section>

    <div class="welcome-strip"><span class="welcome-icon">☼</span><p><strong>¡Qué alegría tenerte aquí!</strong> Elige algo rico y seguimos conversando junto al fuego.</p><RouterLink to="/encargos" class="welcome-bag">Mi cesta <span>{{ cart.count.value }}</span></RouterLink></div>

    <section class="section-block">
      <div class="section-heading"><div><p class="eyebrow">RECIÉN SACADOS DE NUESTRO HORNO</p><h2>Los favoritos del camino</h2></div><RouterLink class="text-link" to="/menu">Ver todo el menú <span>↗</span></RouterLink></div>
      <div class="featured-grid"><BakeryProductCard v-for="product in featured" :key="product.id" :product="product" @add="cart.add($event.id)" /></div>
    </section>

    <section class="story-panel"><div class="story-emblem">❧</div><div><p class="eyebrow">UN HORNO, MUCHAS HISTORIAS</p><h2>La mejor parte del viaje<br />es compartir el pan.</h2><p>Nos inspiran los hogares acogedores, los largos caminos y la magia escondida en las cosas sencillas. Por eso amasamos con calma y dejamos siempre un lugar en la mesa.</p><RouterLink class="story-link" to="/encargos">Preparar una cesta para el camino <span>⟶</span></RouterLink></div><div class="story-sprig" aria-hidden="true">✳<small>HARINA<br />MANTEQUILLA<br />UN TOQUE DE MAGIA</small></div></section>
  </div>
</template>
