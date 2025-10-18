# 🔐 Configuración de CORS

## ✅ Dominios Permitidos

La API acepta solicitudes desde:

- ✅ `https://lista-torneo-gamer.netlify.app` (Frontend en producción)
- ✅ `http://localhost:3000` (Desarrollo local)
- ✅ `http://localhost:5173` (Vite dev server)
- ✅ `http://localhost:5174` (Vite alternativo)

---

## 🔧 Configuración Actual

```javascript
app.use(cors({
  origin: [
    'https://lista-torneo-gamer.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## ➕ Agregar Más Dominios

Si necesitas agregar más dominios (ej: otro deploy de Netlify), edita `src/index.js`:

```javascript
origin: [
  'https://lista-torneo-gamer.netlify.app',
  'https://otro-dominio.netlify.app',  // ← Agregar aquí
  'http://localhost:3000',
  // ...
]
```

---

## 🧪 Probar CORS

### Desde el navegador (consola):

```javascript
fetch('https://tu-api.seenode.app/api/participantes')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Con curl:

```bash
curl -H "Origin: https://lista-torneo-gamer.netlify.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://tu-api.seenode.app/api/participantes -v
```

---

## 🚨 Troubleshooting

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Causa:** El dominio del frontend no está en la lista de orígenes permitidos.

**Solución:**
1. Verifica la URL exacta de tu frontend
2. Agrégala al array `origin` en `src/index.js`
3. Haz commit y redeploya

### Error: "credentials: true" pero la cookie no se envía

**Solución en el frontend:**
```javascript
fetch(url, {
  credentials: 'include'
})
```

---

## 🔒 Seguridad

### Producción
- ✅ Solo dominios específicos permitidos
- ✅ Credentials habilitados solo para orígenes confiables
- ✅ Métodos HTTP limitados

### Desarrollo
- ✅ localhost permitido para testing
- ✅ Múltiples puertos para diferentes dev servers

---

## 📝 Notas

- **NO uses `origin: '*'` en producción** - es inseguro
- Si cambias dominios, recuerda hacer redeploy
- Los subdominios deben listarse explícitamente
  - ❌ `*.netlify.app` no funciona
  - ✅ Debes agregar cada subdominio específico

---

## 🔄 Cambios Recientes

- **2025-10-18:** Agregado `https://lista-torneo-gamer.netlify.app`
- **2025-10-18:** Configuración inicial de CORS
