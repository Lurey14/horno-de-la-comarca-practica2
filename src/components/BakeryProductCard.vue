<script setup lang="ts">
import type { BakeryProduct } from '../data/bakery'

defineProps<{ product: BakeryProduct }>()
const emit = defineEmits<{ add: [product: BakeryProduct] }>()
</script>

<template>
  <article class="product-card">
    <div class="product-art" :class="`art-${product.art}`" role="img" :aria-label="`Ilustración de ${product.name}`">
      <span v-if="product.note" class="product-ribbon">{{ product.note }}</span>
      <span class="art-spark">{{ product.symbol }}</span>
      <span class="art-food"></span>
      <span class="art-plate"></span>
    </div>
    <div class="product-info">
      <p class="product-category">{{ product.category }} <span>·</span> Recién hecho</p>
      <h3>{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-bottom"><strong>Bs {{ product.price.toFixed(2) }}</strong><button type="button" :aria-label="`Añadir ${product.name} a la cesta`" @click="emit('add', product)">Añadir <span>＋</span></button></div>
    </div>
  </article>
</template>
