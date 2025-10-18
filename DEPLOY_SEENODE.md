# 🚀 Guía de Deploy en Seenode

## ✅ Configuración Completa para Seenode

### 📋 Formulario de Configuración

#### **Branch**
```
main
```

#### **Git commit**
```
latest
```
(o déjalo vacío para usar el último commit)

#### **Image (Runtime)**
```
Node.js 18+ o 20+
```
(Selecciona la versión más reciente de Node.js disponible)

---

### Build and Deploy Settings

**Build command:**
```bash
npm install
```

**Start command:**
```bash
npm start
```

#### **Root directory**
```
/
```
(Déjalo vacío o con `/`)

#### **Port**
```
3000
```

---

### 🔐 **Environment Variables**

Agrega estas **3 variables de entorno**:

| Variable | Valor |
|----------|-------|
| `TURSO_DATABASE_URL` | `libsql://bsddd-guerra-666.aws-us-east-1.turso.io` |
| `TURSO_AUTH_TOKEN` | `eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjA3MjI0MjMsImlkIjoiZGY4NjkyMmMtMGFjYy00ZTU4LWI1MmEtODJiN2JiNGU1YmRlIiwicmlkIjoiNTAzYmIyYmYtZWZiYS00ZTQzLWI1YTAtYjA0YjQzNjU2MDRkIn0.GZQGmhHGinWJM6C3_4dSDbmkv9MhK9NexoC1LGL0jDy79_dv9zuYO2p5i563kmArGsfWPO4nnUz-_W1fsoqVBQ` |
| `PORT` | `3000` |

---

## 📝 **Resumen Visual**

```
┌─────────────────────────────────────┐
│ Branch:        main                 │
│ Commit:        latest               │
│ Runtime:       Node.js 18+          │
├─────────────────────────────────────┤
│ Build:         pnpm install         │
│ Start:         pnpm start           │
│ Root dir:      /                    │
│ Port:          3000                 │
├─────────────────────────────────────┤
│ ENV VARS:                           │
│ • TURSO_DATABASE_URL                │
│ • TURSO_AUTH_TOKEN                  │
│ • PORT=3000                         │
└─────────────────────────────────────┘
```

---

## ✅ **Pasos Antes de Deploy**

### 1. Hacer commit de los cambios
```bash
git add .
git commit -m "feat: configurar para deploy en Seenode"
git push origin main
```

### 2. En Seenode
- Conecta tu repositorio `AdrianGuerra-byte/API-paseDeLista`
- Configura todo según esta guía
- Click en "Continue" o "Deploy"

---

## 🧪 **Probar después del Deploy**

Una vez que Seenode te dé la URL pública (ej: `https://tu-app.seenode.app`):

### Probar endpoint raíz
```bash
curl https://tu-app.seenode.app/
```

Debería retornar:
```json
{
  "message": "API Pase de Lista Torneo CUH",
  "endpoints": {
    "participantes": "/api/participantes",
    "listaEspera": "/api/lista-espera",
    "asistencia": "/api/asistencia"
  }
}
```

### Probar participantes
```bash
curl https://tu-app.seenode.app/api/participantes
```

### Probar estadísticas
```bash
curl https://tu-app.seenode.app/api/asistencia/estadisticas
```

---

## 🔧 **Troubleshooting**

### Si el deploy falla:

1. **Verifica los logs** en Seenode
2. **Asegúrate** de que:
   - Build command es solo `pnpm install`
   - Start command es solo `pnpm start`
   - Las 3 variables de entorno están configuradas
   - El puerto es `3000`

### Si la app no responde:

1. Verifica que escuche en `0.0.0.0` (ya lo arreglamos)
2. Revisa los logs de la aplicación en Seenode
3. Prueba reiniciar el servicio

---

## 📊 **Diferencias con Local**

| Aspecto | Local | Seenode |
|---------|-------|---------|
| URL | `http://localhost:3000` | `https://tu-app.seenode.app` |
| Host | `localhost` | `0.0.0.0` |
| Env Vars | `.env` file | Panel de Seenode |
| Base de datos | Turso cloud | Turso cloud (misma) |

---

## 🎉 **Después del Deploy**

Tu API estará disponible públicamente en:
```
https://tu-app.seenode.app
```

Podrás usarla desde:
- ✅ Cualquier frontend (React, Next.js, etc.)
- ✅ Apps móviles
- ✅ Postman/Insomnia
- ✅ Otros servicios

---

## 🔒 **Seguridad**

⚠️ **IMPORTANTE:**
- ✅ El token de Turso está seguro en las variables de entorno
- ✅ No subas el archivo `.env` a git (ya está en `.gitignore`)
- ✅ La base de datos Turso está protegida con autenticación

### Próximos pasos de seguridad (opcional):
1. Agregar rate limiting
2. Implementar autenticación JWT
3. Agregar CORS específico por dominio
4. Implementar HTTPS (Seenode lo hace automáticamente)

---

## 📞 **Soporte**

Si tienes problemas:
1. Revisa los logs en Seenode
2. Contacta a Seenode: help@seenode.com
3. Verifica la documentación de Turso

---

## ✨ **¡Listo para Deploy!**

Solo haz commit, push y configura en Seenode según esta guía.
