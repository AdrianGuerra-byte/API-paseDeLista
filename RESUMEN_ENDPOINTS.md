# 🎯 RESUMEN DE ENDPOINTS - API PASE DE LISTA

## Base URL
```
http://localhost:3000
```

---

## 📋 PASE DE LISTA (Asistencia)

### ✅ Marcar asistencia
```bash
POST /api/asistencia/marcar/:id
```
**Ejemplo:** `POST /api/asistencia/marcar/1`

### ❌ Quitar asistencia
```bash
POST /api/asistencia/quitar/:id
```
**Ejemplo:** `POST /api/asistencia/quitar/1`

### ⬆️ Promover de lista espera a participantes
```bash
POST /api/asistencia/promover/:id
```
**Ejemplo:** `POST /api/asistencia/promover/1`
*Mueve una persona de lista_espera a participantes*

### ⬇️ Relegar de participantes a lista espera
```bash
POST /api/asistencia/relegar/:id
```
**Ejemplo:** `POST /api/asistencia/relegar/5`
*Mueve un participante a lista_espera*

### 📊 Ver estadísticas
```bash
GET /api/asistencia/estadisticas
```
**Retorna:**
```json
{
  "participantes": {
    "total": 32,
    "asistieron": 15,
    "noAsistieron": 17
  },
  "listaEspera": 4
}
```

---

## 👥 PARTICIPANTES (CRUD)

### 📄 Listar todos
```bash
GET /api/participantes
```

### 🔍 Ver uno por ID
```bash
GET /api/participantes/:id
```

### ➕ Crear nuevo
```bash
POST /api/participantes
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "institucion": "CUH" o "PrepaCUH",
  "grupo": "24A"
}
```

### ✏️ Actualizar completo
```bash
PUT /api/participantes/:id
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "institucion": "CUH",
  "grupo": "24A",
  "asistio": 1
}
```

### 🔧 Actualizar parcial
```bash
PATCH /api/participantes/:id
Content-Type: application/json

{
  "grupo": "25A"
}
```

### 🗑️ Eliminar
```bash
DELETE /api/participantes/:id
```

---

## ⏳ LISTA DE ESPERA (CRUD)

### 📄 Listar todos
```bash
GET /api/lista-espera
```

### 🔍 Ver uno por ID
```bash
GET /api/lista-espera/:id
```

### ➕ Crear nuevo
```bash
POST /api/lista-espera
Content-Type: application/json

{
  "nombre": "María González",
  "institucion": "PrepaCUH",
  "grupo": "3B"
}
```

### ✏️ Actualizar completo
```bash
PUT /api/lista-espera/:id
```

### 🔧 Actualizar parcial
```bash
PATCH /api/lista-espera/:id
```

### 🗑️ Eliminar
```bash
DELETE /api/lista-espera/:id
```

---

## 🔄 FLUJOS COMUNES

### 1. Confirmar que alguien asistió
```bash
POST /api/asistencia/marcar/1
```

### 2. Dar entrada a alguien de lista de espera
```bash
# Paso 1: Promover a participantes
POST /api/asistencia/promover/1

# Paso 2: Marcar su asistencia (usa el nuevo ID que retornó)
POST /api/asistencia/marcar/37
```

### 3. Agregar participante nuevo de PrepaCUH y confirmar
```bash
# Paso 1: Crear
POST /api/participantes
{"nombre": "Ana López", "institucion": "PrepaCUH", "grupo": "2A"}

# Paso 2: Marcar asistencia
POST /api/asistencia/marcar/38
```

### 4. Ver reporte de asistencia
```bash
GET /api/asistencia/estadisticas
```

---

## 📦 ESTRUCTURA DE DATOS

```json
{
  "id": 1,
  "nombre": "Pablo Tellez Vite",
  "institucion": "CUH",
  "grupo": "23A",
  "asistio": 1
}
```

**Campos:**
- `id`: Generado automáticamente
- `nombre`: Texto
- `institucion`: "CUH" o "PrepaCUH"
- `grupo`: Texto libre
- `asistio`: 0 o 1

---

## 🛠️ COMANDOS DE TERMINAL

```bash
# Inicializar base de datos
npm run init-db

# Iniciar servidor
npm run dev

# Probar endpoint
curl http://localhost:3000/api/participantes

# Marcar asistencia
curl -X POST http://localhost:3000/api/asistencia/marcar/1

# Ver estadísticas
curl http://localhost:3000/api/asistencia/estadisticas
```

---

## 📁 ARCHIVOS DE AYUDA

- `README.md` - Documentación principal
- `API_EXAMPLES.md` - Ejemplos detallados de cada endpoint
- `GUIA_USO.md` - Guía práctica con escenarios reales
- `postman_collection.json` - Colección para importar en Postman
- `RESUMEN_ENDPOINTS.md` - Este archivo (referencia rápida)

---

## 🚀 Quick Test

```bash
# 1. Servidor corriendo en http://localhost:3000

# 2. Ver participantes
curl http://localhost:3000/api/participantes

# 3. Marcar asistencia del primero
curl -X POST http://localhost:3000/api/asistencia/marcar/1

# 4. Ver estadísticas
curl http://localhost:3000/api/asistencia/estadisticas

# ¡Listo! 🎉
```
