<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHeading from '../components/PageHeading.vue'
import { useCart } from '../composables/useCart'

const cart = useCart()
const serviceStatus = ref<'checking' | 'ready' | 'offline'>('checking')
const sending = ref(false)
const message = ref('')
const orderCode = ref('')
const total = computed(() => cart.total.value)

onMounted(async () => {
  try {
    const response = await fetch('/api/health')
    serviceStatus.value = response.ok ? 'ready' : 'offline'
  } catch {
    serviceStatus.value = 'offline'
  }
})

async function placeOrder() {
  if (!cart.lines.value.length || sending.value) return
  sending.value = true
  message.value = ''
  try {
    const response = await fetch('/api/encargos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.lines.value.map(({ product, quantity }) => ({ productId: product.id, quantity })) }),
    })
    const result = await response.json() as { orderId?: string; error?: string }
    if (!response.ok) throw new Error(result.error ?? 'No pudimos guardar el encargo.')
    orderCode.value = result.orderId ?? 'Guardado'
    message.value = '¡Tu cesta quedó guardada! Es un pedido de demostración; no se realizó ningún pago.'
    cart.clear()
  } catch (error) {
    message.value = error instanceof Error ? error.message : 'No pudimos conectar con el horno.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="page-content inner-page order-page">
    <PageHeading kicker="UN ENCARGO PARA EL CAMINO" title="Tu cesta" description="Revisa tus delicias y guarda un pedido de demostración en el horno." />
    <section class="order-layout">
      <div class="basket-panel">
        <div class="basket-heading"><div><p class="eyebrow">LA BOLSA DE PROVISIONES</p><h2>Lo que llevas</h2></div><span class="basket-count">{{ cart.count.value }} {{ cart.count.value === 1 ? 'producto' : 'productos' }}</span></div>
        <div v-if="cart.lines.value.length" class="basket-lines"><article v-for="line in cart.lines.value" :key="line.product.id" class="basket-line"><span class="basket-icon" :class="`art-${line.product.art}`">{{ line.product.symbol }}</span><div class="basket-product"><h3>{{ line.product.name }}</h3><small>Bs {{ line.product.price.toFixed(2) }} cada uno</small></div><div class="quantity-stepper"><button type="button" :aria-label="`Quitar uno de ${line.product.name}`" @click="cart.remove(line.product.id)">−</button><span>{{ line.quantity }}</span><button type="button" :aria-label="`Añadir uno de ${line.product.name}`" @click="cart.add(line.product.id)">＋</button></div><strong class="line-total">Bs {{ (line.product.price * line.quantity).toFixed(2) }}</strong></article></div>
        <div v-else class="empty-basket"><span>♧</span><h3>Tu cesta está esperando</h3><p>Elige algo rico para acompañar tu aventura.</p><RouterLink class="button-primary" to="/menu">Explorar el menú <span>⟶</span></RouterLink></div>
        <div v-if="cart.lines.value.length" class="basket-total"><span>Total de muestra</span><strong>Bs {{ total.toFixed(2) }}</strong></div>
      </div>
      <aside class="order-aside"><div class="oven-status"><span class="status-dot" :class="`status-${serviceStatus}`"></span><div><strong>{{ serviceStatus === 'ready' ? 'El horno está listo' : serviceStatus === 'checking' ? 'Consultando el horno…' : 'Servidor de pedidos desconectado' }}</strong><small>{{ serviceStatus === 'ready' ? 'API local conectada' : serviceStatus === 'offline' ? 'Inicia Node y Redis para guardar la cesta' : 'Verificando servicios' }}</small></div></div><div class="order-aside-divider"></div><p class="eyebrow">PEDIDO DE PRÁCTICA</p><h2>Guardar mi cesta</h2><p>El encargo se guarda en Redis para demostrar persistencia con Docker. No se solicitan datos personales ni se procesa ningún pago.</p><button class="button-primary order-submit" type="button" :disabled="!cart.lines.value.length || sending || serviceStatus !== 'ready'" @click="placeOrder">{{ sending ? 'Guardando…' : 'Enviar pedido de prueba' }} <span>⟶</span></button><p v-if="message" class="order-message" role="status">{{ message }} <small v-if="orderCode">Código: {{ orderCode }}</small></p><RouterLink class="back-to-menu" to="/menu">← Volver a las delicias</RouterLink></aside>
    </section>
    <div class="disclaimer"><span>✧</span> Página académica de demostración. Productos y precios ficticios. <span>✧</span></div>
  </div>
</template>
