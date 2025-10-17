# API Pase de Lista Torneo

API simple para gestionar pase de lista de torneo CUH con Express, Turso y SQLite.

## 🚀 Características

- ✅ Gestión de participantes y lista de espera
- ✅ Pase de lista (marcar/quitar asistencia)
- ✅ Mover entre participantes y lista de espera
- ✅ Estadísticas en tiempo real
- ✅ CRUD completo para ambas listas
- ✅ Base de datos en la nube con Turso (SQLite)
- ✅ Soporte para CUH y PrepaCUH

## 📦 Instalación

```bash
npm install
# o
pnpm install
```

## ⚙️ Configuración

1. Copia `.env.example` a `.env`
2. Configura las variables de entorno:
   - Para desarrollo local: `TURSO_DATABASE_URL=file:local.db`
   - Para producción: Agrega tu URL y token de Turso

## 🚀 Deploy en Seenode

**📄 [Ver guía completa de deploy](DEPLOY_SEENODE.md)**

Configuración rápida:
- **Build:** `pnpm install`
- **Start:** `pnpm start`
- **Port:** `3000`
- **Env vars:** `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `PORT`

## 🎯 Uso

```bash
# Inicializar base de datos con datos del CSV
npm run init-db

# Desarrollo con hot reload
npm run dev

# Producción
npm start
```

## 📡 Endpoints Principales

### 🎯 Asistencia (Pase de Lista)
- `POST /api/asistencia/marcar/:id` - Marcar asistencia
- `POST /api/asistencia/quitar/:id` - Quitar asistencia
- `POST /api/asistencia/promover/:id` - Lista espera → Participantes
- `POST /api/asistencia/relegar/:id` - Participantes → Lista espera
- `GET /api/asistencia/estadisticas` - Ver estadísticas

### 👥 Participantes
- `GET /api/participantes` - Obtener todos los participantes
- `GET /api/participantes/:id` - Obtener participante por ID
- `POST /api/participantes` - Crear participante
- `PUT /api/participantes/:id` - Actualizar participante
- `PATCH /api/participantes/:id` - Actualizar parcialmente
- `DELETE /api/participantes/:id` - Eliminar participante

### ⏳ Lista de Espera
- `GET /api/lista-espera` - Obtener todos en lista de espera
- `GET /api/lista-espera/:id` - Obtener por ID
- `POST /api/lista-espera` - Crear en lista de espera
- `PUT /api/lista-espera/:id` - Actualizar
- `PATCH /api/lista-espera/:id` - Actualizar parcialmente
- `DELETE /api/lista-espera/:id` - Eliminar

## 📖 Documentación

- [API_EXAMPLES.md](API_EXAMPLES.md) - Ejemplos de todos los endpoints
- [GUIA_USO.md](GUIA_USO.md) - Guía práctica con flujos de trabajo

## 📊 Datos Iniciales

La base de datos se inicializa con:
- **32 participantes** del formulario de confirmación
- **4 personas en lista de espera**:
  - Bryan Yair Olvera Villegas
  - Kristian Ivan Pacheco Vazquez
  - Tristan Alejandro Martinez Cervantes
  - Jaime Alfonso Ubilla León

## 🔧 Ejemplo Rápido

```bash
# Ver todos los participantes
curl http://localhost:3000/api/participantes

# Marcar asistencia
curl -X POST http://localhost:3000/api/asistencia/marcar/1

# Ver estadísticas
curl http://localhost:3000/api/asistencia/estadisticas

# Promover de lista de espera
curl -X POST http://localhost:3000/api/asistencia/promover/1
```

## 🗂️ Estructura del Proyecto

```
PaseListaTorneo/
├── src/
│   ├── index.js                    # Servidor principal
│   ├── db/
│   │   └── database.js            # Configuración de Turso/SQLite
│   ├── controllers/
│   │   ├── participantesController.js
│   │   ├── listaEsperaController.js
│   │   └── asistenciaController.js
│   ├── routes/
│   │   ├── participantes.js
│   │   ├── listaEspera.js
│   │   └── asistencia.js
│   └── scripts/
│       └── initDb.js              # Script de inicialización
├── .env                           # Configuración (no incluido en git)
├── package.json
└── README.md
```

## 🎓 Instituciones

- **CUH** - Centro Universitario Hidalguense
- **PrepaCUH** - Preparatoria CUH

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **Turso** - Base de datos SQLite en la nube
- **@libsql/client** - Cliente de Turso
- **Node.js** - Runtime

## 📝 Respuestas de la API

Todos los endpoints retornan datos con:
- `id`: ID único
- `nombre`: Nombre completo
- `institucion`: "CUH" o "PrepaCUH"
- `grupo`: Grupo al que pertenece
- `asistio`: 0 (no asistió) o 1 (asistió)
