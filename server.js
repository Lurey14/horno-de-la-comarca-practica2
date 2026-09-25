import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const allowedProducts = new Set([
  'pan-viaje', 'miel-beorn', 'hogaza-comarca', 'tarta-manzana',
  'bollitos-dragon', 'galletas-lorien', 'cacao-moria', 'te-hobbiton',
])

export function normalizeItems(items) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('Debes incluir al menos un producto.')
  if (items.length > 20) throw new Error('La cesta supera el límite de productos.')

  return items.map((item) => {
    if (!item || typeof item.productId !== 'string' || !allowedProducts.has(item.productId)) {
      throw new Error('El producto indicado no existe.')
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
      throw new Error('La cantidad debe ser un entero entre 1 y 20.')
    }
    return { productId: item.productId, quantity: item.quantity }
  })
}

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  response.end(JSON.stringify(payload))
}

async function readJson(request) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > 16_384) throw new Error('El pedido es demasiado grande.')
  }
  return JSON.parse(body || '{}')
}

export function createHornoServer({ redisClient, distDirectory = path.join(root, 'dist'), studentName = process.env.STUDENT_NAME || 'Estudiante' }) {
  return http.createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://localhost')

    if (url.pathname === '/api/health' && request.method === 'GET') {
      const redisReady = Boolean(redisClient?.isReady)
      return sendJson(response, redisReady ? 200 : 503, {
        status: redisReady ? 'ok' : 'redis_disconnected',
        redis: redisReady ? 'conectado' : 'desconectado',
        student: studentName,
      })
    }

    if (url.pathname === '/api/encargos' && request.method === 'POST') {
      try {
        const { items } = await readJson(request)
        const normalized = normalizeItems(items)
        if (!redisClient?.isReady) return sendJson(response, 503, { error: 'El horno no está conectado a Redis.' })
        const orderId = randomUUID().slice(0, 8).toUpperCase()
        await redisClient.xAdd('horno:encargos', '*', {
          orderId,
          createdAt: new Date().toISOString(),
          items: JSON.stringify(normalized),
        })
        return sendJson(response, 201, { orderId, status: 'guardado' })
      } catch (error) {
        const invalidJson = error instanceof SyntaxError
        return sendJson(response, invalidJson ? 400 : 422, { error: error instanceof Error ? error.message : 'No se pudo guardar el pedido.' })
      }
    }

    if (url.pathname === '/api/encargos/count' && request.method === 'GET') {
      if (!redisClient?.isReady) return sendJson(response, 503, { error: 'El horno no está conectado a Redis.' })
      return sendJson(response, 200, { count: await redisClient.xLen('horno:encargos') })
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return sendJson(response, 405, { error: 'Método no permitido.' })
    }

    try {
      const requested = path.resolve(distDirectory, `.${decodeURIComponent(url.pathname)}`)
      const safeRoot = path.resolve(distDirectory)
      const candidate = requested.startsWith(`${safeRoot}${path.sep}`) ? requested : path.join(safeRoot, 'index.html')
      let filePath = candidate
      try {
        if (!(await stat(filePath)).isFile()) filePath = path.join(safeRoot, 'index.html')
      } catch {
        filePath = path.join(safeRoot, 'index.html')
      }
      const content = await readFile(filePath)
      const ext = path.extname(filePath)
      const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' }
      response.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' })
      response.end(request.method === 'HEAD' ? undefined : content)
    } catch {
      sendJson(response, 404, { error: 'No se encontró el archivo solicitado.' })
    }
  })
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { createClient } = await import('redis')
  const redisClient = createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' })
  redisClient.on('error', (error) => console.error('Redis:', error.message))
  try {
    await redisClient.connect()
    console.log('Conectado a Redis.')
  } catch (error) {
    console.error('No se pudo conectar a Redis:', error instanceof Error ? error.message : error)
  }
  const port = Number(process.env.PORT || 3000)
  createHornoServer({ redisClient }).listen(port, '0.0.0.0', () => {
    console.log(`El Horno de la Comarca está listo en el puerto ${port}. Estudiante: ${process.env.STUDENT_NAME || 'Estudiante'}`)
  })
}
