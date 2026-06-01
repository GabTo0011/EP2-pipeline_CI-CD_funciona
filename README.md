# EP2 - Pipeline CI/CD Funcional
### User Service con NestJS + Docker + GitHub Actions
---

<p align="center">
  Microservicio backend desarrollado con NestJS y TypeScript para la gestión básica de usuarios, 
  containerizado con Docker y desplegado mediante un pipeline CI/CD completo con GitHub Actions.
</p>

---

## Descripción del proyecto

API REST que permite realizar operaciones CRUD sobre usuarios. El proyecto implementa prácticas DevOps incluyendo:

- Containerización con Docker (multi-stage build)
- Orquestación con Docker Compose (backend + MySQL)
- Pipeline CI/CD de 5 etapas con GitHub Actions
- Análisis de seguridad con Snyk
- Análisis de calidad con SonarCloud
- Publicación de imágenes en GitHub Container Registry (GHCR)

### Funcionalidades

- Listar usuarios (`GET /users`)
- Obtener usuario por ID (`GET /users/:id`)
- Crear usuario (`POST /users`)
- Actualizar usuario (`PATCH /users/:id`)
- Eliminar usuario (`DELETE /users/:id`)

---

## Tecnologías utilizadas

| Categoría | Tecnología |
|-----------|-----------|
| Backend | NestJS 11, TypeScript 5.7 |
| Base de datos | MySQL 8.0 |
| Contenedores | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Seguridad | Snyk |
| Calidad | SonarCloud, ESLint, Prettier |
| Testing | Jest 30, Supertest |
| Registro | GitHub Container Registry (GHCR) |

---

## Requisitos previos

- Node.js 20+
- npm
- Docker y Docker Compose (para despliegue containerizado)

---

## Instalación y ejecución local (sin Docker)

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd EP2-pipeline_CI-CD_funciona/backend

# Instalar dependencias
npm install
```

### Configurar `.env`

Crear un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
PORT=3080
```

### Ejecutar la aplicación

```bash
# Modo desarrollo (con hot-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

La API estará disponible en `http://localhost:3080`

---

## Despliegue con Docker Compose

```bash
# Desde la raíz del proyecto
docker-compose up -d
```

Esto levanta:
- **Backend** (NestJS) en el puerto `3080`
- **Base de datos** (MySQL 8.0) en el puerto `3306`

```bash
# Verificar estado de los contenedores
docker-compose ps

# Ver logs
docker-compose logs -f backend

# Detener el entorno
docker-compose down
```

---

## Tests

```bash
cd backend

# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests e2e
npm run test:e2e

# Linter
npm run lint
```

---

## Pipeline CI/CD

El pipeline se ejecuta automáticamente en push y pull requests a la rama `main`.

### Etapas

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. Snyk Scan   │────▶│  2. Tests +     │────▶│  3. SonarCloud  │
│  (Seguridad)    │     │     Coverage    │     │  (Calidad)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                        ┌─────────────────┐     ┌────────▼────────┐
                        │  5. Deploy      │◀────│  4. Build &     │
                        │  (Simulado)     │     │     Push GHCR   │
                        └─────────────────┘     └─────────────────┘
```

1. **Snyk Security Scan** — Analiza vulnerabilidades en dependencias
2. **Tests + Coverage** — Ejecuta linter y tests unitarios con cobertura
3. **SonarCloud Analysis** — Análisis estático de calidad de código
4. **Build & Push** — Construye imagen Docker y la publica en GHCR
5. **Deploy Simulated** — Levanta el entorno con Docker Compose y valida con health check

### Secrets requeridos en GitHub

| Secret | Descripción |
|--------|-------------|
| `SNYK_TOKEN` | Token de autenticación de Snyk |
| `SONAR_TOKEN` | Token de autenticación de SonarCloud |
| `GITHUB_TOKEN` | Proporcionado automáticamente por GitHub Actions |

---

## Estructura del proyecto

```text
EP2-pipeline_CI-CD_funciona/
├── .github/
│   └── workflows/
│       └── main.yml              # Pipeline CI/CD
├── backend/
│   ├── src/
│   │   ├── main.ts              # Entry point
│   │   ├── app.module.ts        # Módulo raíz
│   │   ├── app.controller.ts    # Controller principal
│   │   ├── app.service.ts       # Servicio principal
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.spec.ts
│   │   │   ├── users.service.spec.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       └── update-user.dto.ts
│   │   └── utils/
│   │       └── validations.ts   # Validaciones de email y nombre
│   ├── test/
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── Dockerfile               # Multi-stage build
│   ├── package.json
│   └── tsconfig.json
├── database/
│   ├── Dockerfile               # Imagen MySQL
│   └── init.sql                 # Script de inicialización
├── docs/
│   └── despliegue-local-prueba.txt
├── docker-compose.yml           # Orquestación de servicios
└── README.md
```

---

## Modelo de ramificación: GitFlow

| Rama | Propósito |
|------|-----------|
| `main` | Versión estable y desplegable |
| `develop` | Integración de desarrollo |
| `feature/*` | Nuevas funcionalidades (desde `develop`) |
| `hotfix/*` | Correcciones urgentes (desde `main`) |
| `bugfix/*` | Corrección de errores (desde `develop`) |

### Flujo de trabajo

1. Se trabaja sobre la rama `develop`
2. Cada funcionalidad se desarrolla en una rama `feature/*`
3. Correcciones urgentes se desarrollan en `hotfix/*`
4. Todos los cambios se integran mediante Pull Requests
5. Cada PR es revisado por otro integrante
6. No se permite push directo a `main`

---

## Endpoints de la API

| Método | Ruta | Descripción | Body |
|--------|------|-------------|------|
| GET | `/` | Health check | — |
| GET | `/users` | Listar todos los usuarios | — |
| GET | `/users/:id` | Obtener usuario por ID | — |
| POST | `/users` | Crear usuario | `{ name, email, role }` |
| PATCH | `/users/:id` | Actualizar usuario | `{ name?, email?, role? }` |
| DELETE | `/users/:id` | Eliminar usuario | — |

### Ejemplo de uso

```bash
# Crear usuario
curl -X POST http://localhost:3080/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Carlos López", "email": "carlos@test.com", "role": "user"}'

# Listar usuarios
curl http://localhost:3080/users

# Obtener usuario por ID
curl http://localhost:3080/users/1

# Actualizar usuario
curl -X PATCH http://localhost:3080/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Carlos A. López"}'

# Eliminar usuario
curl -X DELETE http://localhost:3080/users/1
```

---

## Docker

### Backend (Multi-stage build)

- **Etapa 1 (Builder)**: Instala dependencias y compila TypeScript
- **Etapa 2 (Producción)**: Imagen ligera con solo dependencias de producción y binarios compilados
- Ejecuta como usuario `node` (sin privilegios elevados)
- Puerto expuesto: `3080`

### Base de datos

- MySQL 8.0 con script de inicialización automática
- Crea la base de datos `users_db` y tabla `users`
- Incluye un usuario de prueba por defecto

---

## Test local con imagen de GHCR (generada por el pipeline)

Una vez que el pipeline CI/CD se ejecuta exitosamente en la rama `main`, la imagen Docker del backend se publica en **GitHub Container Registry (GHCR)**. Puedes descargarla y probarla localmente siguiendo estos pasos:

### 1. Autenticarse en GHCR

Necesitas un **Personal Access Token (PAT)** con permiso `read:packages`:

```bash
# Iniciar sesión en el registro de GitHub
echo "TU_PERSONAL_ACCESS_TOKEN" | docker login ghcr.io -u TU_USUARIO_GITHUB --password-stdin
```

### 2. Descargar la imagen del backend

```bash
# Descargar la última versión publicada por el pipeline
docker pull ghcr.io/<owner>/ep1-users-service:latest

# O descargar una versión específica
docker pull ghcr.io/<owner>/ep1-users-service:1.0.0
```

> Reemplaza `<owner>` por el nombre de usuario u organización de GitHub (en minúsculas).

### 3. Ejecutar con Docker Compose usando la imagen de GHCR

Desde la raíz del proyecto, define la variable `BACKEND_IMAGE` para que Docker Compose use la imagen del registro en lugar de compilar localmente:

```bash
# Definir la imagen de GHCR
export BACKEND_IMAGE=ghcr.io/<owner>/ep1-users-service:latest

# Levantar el entorno completo (backend + MySQL)
docker-compose up -d
```

En **Windows (PowerShell)**:

```powershell
$env:BACKEND_IMAGE = "ghcr.io/<owner>/ep1-users-service:latest"
docker-compose up -d
```

En **Windows (CMD)**:

```cmd
set BACKEND_IMAGE=ghcr.io/<owner>/ep1-users-service:latest
docker-compose up -d
```

### 4. Verificar que los servicios están corriendo

```bash
# Ver estado de los contenedores
docker-compose ps

# Verificar que el backend responde
curl http://localhost:3080/

# Probar el endpoint de usuarios
curl http://localhost:3080/users
```

### 5. Ejecutar solo el backend (sin Docker Compose)

Si solo quieres probar la imagen del backend sin MySQL:

```bash
docker run -d \
  --name nestjs-backend-test \
  -p 3080:3080 \
  -e PORT=3080 \
  ghcr.io/<owner>/ep1-users-service:latest
```

```bash
# Verificar que responde
curl http://localhost:3080/
curl http://localhost:3080/users

# Detener y eliminar el contenedor
docker stop nestjs-backend-test
docker rm nestjs-backend-test
```

### 6. Detener el entorno

```bash
docker-compose down
```

### Notas

- La imagen se publica automáticamente solo cuando el pipeline completa las 5 etapas en `main`
- El `docker-compose.yml` usa la variable `BACKEND_IMAGE` — si no se define, compila la imagen localmente por defecto
- La imagen publicada usa un build multi-stage optimizado para producción (~150MB)
- El contenedor se ejecuta como usuario `node` sin privilegios de root

---

## Contribución

Consultar el archivo [CONTRIBUTING.md](./backend/CONTRIBUTING.md) para las guías de contribución del proyecto.
