# El Horno de la Comarca

Panadería fantástica inspirada en el Legendarium de Tolkien, creada como práctica académica con **Vue 3, TypeScript, Vite y Vue Router**. La web ofrece tres páginas ligeras: inicio, menú con búsqueda y filtros, y cesta para guardar pedidos de demostración.

La API usa Node.js y Redis. No procesa pagos ni solicita datos personales. Los productos y precios son ficticios y editables en `src/data/bakery.ts`.

## Requisitos

- Node.js 20 o posterior y npm.
- Docker Desktop con Docker Compose para la práctica de contenedores.
- Git para el control de versiones.

## Ejecutar localmente

1. Copia `.env.example` como `.env` y escribe tu nombre en `STUDENT_NAME`.
2. Instala dependencias con `npm install`.
3. Inicia Redis con `docker compose up -d redis`.
4. En otra terminal, ejecuta `npm run api`.
5. En una tercera terminal, inicia Vue con `npm run dev` y abre la dirección local mostrada por Vite.

La cesta usa `/api` y Vite la redirige a Node en el puerto 3000.

## Verificación y producción

```powershell
npm test
npm run build
docker compose up --build -d
docker compose ps
docker compose logs web
```

La versión de producción se abre en `http://localhost:3000`. Compose ejecuta la web junto con Redis y conserva los pedidos en el volumen `redis-data`.

## Estructura principal

- `src/pages/`: Inicio, menú y cesta.
- `src/components/`: navegación, encabezados y tarjeta de producto.
- `src/data/bakery.ts`: catálogo y precios de ejemplo.
- `src/composables/useCart.ts`: estado compartido de la cesta.
- `server.js`: servidor HTTP, API y persistencia Redis.
- `Dockerfile`, `docker-compose.yml`: imagen de producción y servicios.
- `docs/PROMPT-IA.md`: prompt que guio el diseño de la web.
- `docs/evidencias/`: capturas reales de la práctica.
- `docs/`: informe de entrega y evidencias.

## Documentación de la práctica

El informe registra cada fase desde el estado inicial del proyecto: creación/adaptación de la web, pruebas, Dockerfile, imagen, contenedores, volúmenes, bind mount, red, Compose y GitHub. Las capturas se agregan al ejecutar cada paso; el reporte no atribuye fechas o acciones que no hayan sido observadas.
