# Etapa de compilación: TypeScript/Vue genera la carpeta dist.
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Imagen de ejecución: solo el servidor y sus dependencias de producción.
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "server.js"]
