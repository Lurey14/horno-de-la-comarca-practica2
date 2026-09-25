import { computed, ref } from 'vue'
import { bakeryProducts } from '../data/bakery'

const quantities = ref<Record<string, number>>({})

export function useCart() {
  const lines = computed(() => bakeryProducts
    .filter((product) => (quantities.value[product.id] ?? 0) > 0)
    .map((product) => ({ product, quantity: quantities.value[product.id] })))

  const count = computed(() => lines.value.reduce((sum, line) => sum + line.quantity, 0))
  const total = computed(() => lines.value.reduce((sum, line) => sum + line.product.price * line.quantity, 0))

  function add(productId: string) {
    quantities.value[productId] = (quantities.value[productId] ?? 0) + 1
  }

  function remove(productId: string) {
    const next = (quantities.value[productId] ?? 0) - 1
    if (next <= 0) delete quantities.value[productId]
    else quantities.value[productId] = next
  }

  function clear() {
    quantities.value = {}
  }

  return { lines, count, total, add, remove, clear }
}
