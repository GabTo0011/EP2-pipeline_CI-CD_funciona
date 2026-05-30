# EP1 - Primer pipeline de despliegue
### User Service con NestJS
---
<p align="center">
  Microservicio backend desarrollado con 
  NestJS-TypeScript para la gestión básica de 
  usuarios sin persistencia en base de datos.
</p>

<p align="center">
  Este proyecto implementa prácticas DevOps como 
  control de versiones con GitFlow, trabajo 
  colaborativo mediante Pull Requests y 
  automatización con GitHub Actions.
</p>

---

## Descripción del proyecto

El sistema permite realizar operaciones CRUD sobre usuarios, usando el almacenamiento en memoria.

### Funcionalidades base
- Listar usuarios
- Obtener usuario por ID
- Crear usuario
- Actualizar usuario
- Eliminar usuario

## Project setup

```bash
$ npm install
```

## Configurar `.env`

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```.env
PORT=3080
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Modelo de ramificación seleccionado: GitFlow

Se utiliza **GitFlow** como estrategia de trabajo.

### Estructura de ramas

- `main`: para versión estable
- `develop`: integración de desarrollo
- `feature/*`: agregar nuevas funcionalidades en [ `develop` ]
- `hotfix/*`: correcciones urgentes en [ `main` ]
- `bugfix/*`: para corregir errores en [ `develop` ]

Se eligió GitFlow porque:

Principalmente es la que mejor se ajusta a la 
estructura solicitada en la actividad, por otro lado 
nos permite organizar el desarrollo en etapas claras.
Ademas mejora la trazabilidad mediante los Pull 
Requests; con el plus de la estructura en ramas y 
commits, finalmente facilita el mantenimiento del 
proyecto a largo plazo y el trabajo colaborativo entre 
multiples desarrolladores

## Flujo de trabajo colaborativo

1. Se trabaja sobre la rama `develop`
2. Cada funcionalidad se desarrolla en una rama `feature/*`
3. Cada corrección urgente se desarrolla en `hotfix/*`
4. Todos los cambios se integran mediante Pull Requests
5. Cada PR es revisado por otro integrante
6. No se permite hacer push directo a `main`

## Tecnologías utilizadas

- Node.js
- NestJS
- TypeScript
- Git
- GitHub
- GitHub Actions

## Estructura del repositorio

```text
ep1-primer_pipeline_de_despliegue/
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ src/
│  ├─ main.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ app.controller.ts
│  ├─ app.controller.spec.ts
│  ├─ utils/
│  │  └─ validations.ts
│  └─ users/
│     ├─ users.module.ts
│     ├─ users.service.ts
│     ├─ users.controller.ts
│     ├─ users.service.spec.ts
│     ├─ users.controller.spec.ts
│     └─ dto/
│        ├─ create-user.dto.ts
│        └─ update-user.dto.ts
├─ test/
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ .gitignore
├─ package.json
├─ README.md
└─ CONTRIBUTING.md
```

## Conclusión
Este proyecto nos permitió poner en practica los 
conocimientos fundamentales de DevOps, aplicando el 
uso de Git en un entorno colaborativo y reforzar la 
importancia de la trazabilidad en nuestro código. El 
implementar GitFlow nos facilitó la organización del 
trabajo en equipo, asegurando un flujo ordenado entre 
ramas y commits. Además, la configuración de un 
pipeline básico con GitHub Actions aportó una primera 
experiencia práctica en la automatización de procesos 
de integración continua, acercándonos a un escenario 
real de CI. Como grupo, la actividad nos simuló un 
flujo de trabajo profesional, fortaleciendo tanto 
nuestra disciplina técnica como colaborativa efectiva 
dentro del repositorio, a pesar de ser nuestro primer 
trabajo juntos.