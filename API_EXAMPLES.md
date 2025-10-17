# Ejemplos de uso de la API

## 🎯 Endpoints de Asistencia (Pase de Lista)

### Marcar asistencia (Confirmar que asistió)
```bash
curl -X POST http://localhost:3000/api/asistencia/marcar/1
```

### Quitar asistencia
```bash
curl -X POST http://localhost:3000/api/asistencia/quitar/1
```

### Promover de lista de espera a participantes
```bash
# Mueve una persona de lista_espera a participantes
curl -X POST http://localhost:3000/api/asistencia/promover/1
```

### Relegar de participantes a lista de espera
```bash
# Mueve un participante a lista_espera
curl -X POST http://localhost:3000/api/asistencia/relegar/1
```

### Obtener estadísticas
```bash
curl http://localhost:3000/api/asistencia/estadisticas
```

**Respuesta:**
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

## 👥 Participantes

### GET - Obtener todos los participantes
```bash
curl http://localhost:3000/api/participantes
```

### GET - Obtener un participante por ID
```bash
curl http://localhost:3000/api/participantes/1
```

### POST - Crear un nuevo participante
```bash
curl -X POST http://localhost:3000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez García",
    "institucion": "PrepaCUH",
    "grupo": "3A"
  }'
```

### PUT - Actualizar un participante completo
```bash
curl -X PUT http://localhost:3000/api/participantes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Pablo Tellez Vite",
    "institucion": "CUH",
    "grupo": "23A",
    "asistio": 1
  }'
```

### PATCH - Actualizar solo la asistencia
```bash
curl -X PATCH http://localhost:3000/api/participantes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "asistio": 1
  }'
```

### DELETE - Eliminar un participante
```bash
curl -X DELETE http://localhost:3000/api/participantes/1
```

## Lista de Espera

### GET - Obtener todos en lista de espera
```bash
curl http://localhost:3000/api/lista-espera
```

### GET - Obtener uno por ID
```bash
curl http://localhost:3000/api/lista-espera/1
```

### POST - Agregar a lista de espera
```bash
curl -X POST http://localhost:3000/api/lista-espera \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María González Ruiz",
    "institucion": "PrepaCUH",
    "grupo": "2B"
  }'
```

### PUT - Actualizar completo
```bash
curl -X PUT http://localhost:3000/api/lista-espera/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Bryan Yair Olvera Villegas",
    "institucion": "CUH",
    "grupo": "22",
    "asistio": 1
  }'
```

### PATCH - Actualizar solo asistencia
```bash
curl -X PATCH http://localhost:3000/api/lista-espera/1 \
  -H "Content-Type: application/json" \
  -d '{
    "asistio": 1
  }'
```

### DELETE - Eliminar de lista de espera
```bash
curl -X DELETE http://localhost:3000/api/lista-espera/1
```

## Respuestas

Todos los endpoints retornan los datos con:
- `id`: ID único del participante
- `nombre`: Nombre completo del participante
- `institucion`: "CUH" o "PrepaCUH"
- `grupo`: Grupo al que pertenece
- `asistio`: 0 (no asistió) o 1 (asistió)

---

## 📋 Resumen de Endpoints

### Gestión de Asistencia
- `POST /api/asistencia/marcar/:id` - Marcar asistencia de un participante
- `POST /api/asistencia/quitar/:id` - Quitar asistencia
- `POST /api/asistencia/promover/:id` - Mover de lista de espera a participantes
- `POST /api/asistencia/relegar/:id` - Mover de participantes a lista de espera
- `GET /api/asistencia/estadisticas` - Obtener estadísticas generales

### CRUD Participantes
- `GET /api/participantes` - Listar todos
- `GET /api/participantes/:id` - Obtener uno
- `POST /api/participantes` - Crear nuevo
- `PUT /api/participantes/:id` - Actualizar completo
- `PATCH /api/participantes/:id` - Actualizar parcial
- `DELETE /api/participantes/:id` - Eliminar

### CRUD Lista de Espera
- `GET /api/lista-espera` - Listar todos
- `GET /api/lista-espera/:id` - Obtener uno
- `POST /api/lista-espera` - Crear nuevo
- `PUT /api/lista-espera/:id` - Actualizar completo
- `PATCH /api/lista-espera/:id` - Actualizar parcial
- `DELETE /api/lista-espera/:id` - Eliminar
