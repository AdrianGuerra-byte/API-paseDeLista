import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db/database.js';
import participantesRoutes from './routes/participantes.js';
import listaEsperaRoutes from './routes/listaEspera.js';
import asistenciaRoutes from './routes/asistencia.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
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
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Pase de Lista Torneo CUH',
    endpoints: {
      participantes: '/api/participantes',
      listaEspera: '/api/lista-espera',
      asistencia: '/api/asistencia'
    }
  });
});

app.use('/api/participantes', participantesRoutes);
app.use('/api/lista-espera', listaEsperaRoutes);
app.use('/api/asistencia', asistenciaRoutes);

// Inicializar base de datos y servidor
async function start() {
  try {
    await initDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`🌍 Accesible en todas las interfaces de red`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

start();
