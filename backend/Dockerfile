# Etapa 1: Construcción (Builder)
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Producción (Imagen ligera)
FROM node:20-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json .
# Instalar solo dependencias de producción
RUN npm ci --omit=dev && npm cache clean --force
# Copiar los binarios compilados desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Ejecutar sin privilegios elevados
USER node
# El puerto que definiste en tu README original
EXPOSE 3080
CMD ["node", "dist/main"]