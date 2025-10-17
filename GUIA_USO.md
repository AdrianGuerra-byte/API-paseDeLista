# 🎯 Guía de Uso - Pase de Lista Torneo CUH

## Flujos de Trabajo Comunes

### 1. Confirmar Pase de Lista

**Escenario:** Un participante llega al evento y necesitas confirmar su asistencia.

```bash
# Ver todos los participantes
curl http://localhost:3000/api/participantes

# Marcar asistencia del participante con ID 1
curl -X POST http://localhost:3000/api/asistencia/marcar/1

# Ver estadísticas actualizadas
curl http://localhost:3000/api/asistencia/estadisticas
```

---

### 2. Gestionar Lista de Espera

**Escenario:** Alguien de la lista de espera puede entrar porque hubo un lugar disponible.

```bash
# Ver lista de espera
curl http://localhost:3000/api/lista-espera

# Promover a la persona con ID 2 de lista de espera a participantes
curl -X POST http://localhost:3000/api/asistencia/promover/2

# Verificar que ahora está en participantes
curl http://localhost:3000/api/participantes
```

---

### 3. Agregar Participante de PrepaCUH

**Escenario:** Llega un participante de PrepaCUH que no estaba registrado.

```bash
# Crear nuevo participante
curl -X POST http://localhost:3000/api/participantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María González Pérez",
    "institucion": "PrepaCUH",
    "grupo": "3B"
  }'

# Marcar su asistencia inmediatamente (usa el ID que retornó)
curl -X POST http://localhost:3000/api/asistencia/marcar/37
```

---

### 4. Corregir Error de Asistencia

**Escenario:** Marcaste asistencia por error.

```bash
# Quitar asistencia
curl -X POST http://localhost:3000/api/asistencia/quitar/5
```

---

### 5. Actualizar Datos de un Participante

**Escenario:** Necesitas corregir el grupo de un participante.

```bash
# Actualizar solo el grupo (PATCH)
curl -X PATCH http://localhost:3000/api/participantes/3 \
  -H "Content-Type: application/json" \
  -d '{
    "grupo": "24B"
  }'
```

---

### 6. Mover Participante a Lista de Espera

**Escenario:** Un participante confirmado no puede asistir, lo mueves a lista de espera.

```bash
# Relegar a lista de espera
curl -X POST http://localhost:3000/api/asistencia/relegar/10
```

---

### 7. Ver Reporte General

**Escenario:** Necesitas un reporte rápido del evento.

```bash
# Estadísticas generales
curl http://localhost:3000/api/asistencia/estadisticas

# Ver quiénes asistieron (puedes filtrar en tu frontend)
curl http://localhost:3000/api/participantes
```

---

## 📊 Estructura de Respuestas

### Participante/Lista de Espera
```json
{
  "id": 1,
  "nombre": "Pablo Tellez Vite",
  "institucion": "CUH",
  "grupo": "23A",
  "asistio": 1
}
```

### Estadísticas
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

### Respuesta de Marcar Asistencia
```json
{
  "message": "Asistencia confirmada",
  "participante": {
    "id": 1,
    "nombre": "Pablo Tellez Vite",
    "institucion": "CUH",
    "grupo": "23A",
    "asistio": 1
  }
}
```

### Respuesta de Promover
```json
{
  "message": "Movido a participantes exitosamente",
  "nuevoParticipante": {
    "id": 37,
    "nombre": "Bryan Yair Olvera Villegas",
    "institucion": "CUH",
    "grupo": "22",
    "asistio": 0
  }
}
```

---

## 🔧 Comandos Útiles

```bash
# Reiniciar base de datos con datos iniciales
npm run init-db

# Iniciar servidor en desarrollo
npm run dev

# Iniciar servidor en producción
npm start

# Ver todos los participantes que asistieron
curl http://localhost:3000/api/participantes | jq '.[] | select(.asistio == 1)'

# Contar asistencias
curl http://localhost:3000/api/participantes | jq '[.[] | select(.asistio == 1)] | length'
```

---

## 🚀 Quick Start

```bash
# 1. Clonar e instalar
npm install

# 2. Configurar .env (ya está configurado con Turso)
# TURSO_DATABASE_URL=libsql://...
# TURSO_AUTH_TOKEN=...

# 3. Inicializar base de datos
npm run init-db

# 4. Iniciar servidor
npm run dev

# 5. Probar la API
curl http://localhost:3000/
```

---

## 💡 Instituciones Permitidas

- `CUH` - Centro Universitario Hidalguense
- `PrepaCUH` - Preparatoria CUH

Puedes agregar participantes de ambas instituciones.
