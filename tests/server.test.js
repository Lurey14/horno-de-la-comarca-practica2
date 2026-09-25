import test from 'node:test'
import assert from 'node:assert/strict'
import { createHornoServer, normalizeItems } from '../server.js'

test('normaliza una cesta válida para guardarla en Redis', () => {
  assert.deepEqual(normalizeItems([
    { productId: 'pan-viaje', quantity: 2 },
    { productId: 'tarta-manzana', quantity: 1 },
  ]), [
    { productId: 'pan-viaje', quantity: 2 },
    { productId: 'tarta-manzana', quantity: 1 },
  ])
})

test('rechaza una cesta vacía o con cantidades fuera del límite', () => {
  assert.throws(() => normalizeItems([]), /al menos un producto/i)
  assert.throws(() => normalizeItems([{ productId: 'pan-viaje', quantity: 21 }]), /cantidad/i)
})

test('rechaza identificadores de producto con caracteres inesperados', () => {
  assert.throws(() => normalizeItems([{ productId: '../secreto', quantity: 1 }]), /producto/i)
})

test('la API informa el estado de Redis y el nombre configurado', async (t) => {
  const redisClient = { isReady: true }
  const server = createHornoServer({ redisClient, studentName: 'Nombre de prueba' })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  t.after(() => server.close())
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/health`)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { status: 'ok', redis: 'conectado', student: 'Nombre de prueba' })
})

test('la API guarda un pedido validado como evento en Redis', async (t) => {
  let saved
  const redisClient = {
    isReady: true,
    async xAdd(...args) { saved = args },
  }
  const server = createHornoServer({ redisClient })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  t.after(() => server.close())
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/encargos`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ productId: 'pan-viaje', quantity: 2 }] }),
  })
  assert.equal(response.status, 201)
  assert.equal((await response.json()).status, 'guardado')
  assert.equal(saved[0], 'horno:encargos')
  assert.deepEqual(JSON.parse(saved[2].items), [{ productId: 'pan-viaje', quantity: 2 }])
})

test('la API rechaza un pedido con JSON mal formado', async (t) => {
  const server = createHornoServer({ redisClient: { isReady: true } })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  t.after(() => server.close())
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/encargos`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{',
  })
  assert.equal(response.status, 400)
})
