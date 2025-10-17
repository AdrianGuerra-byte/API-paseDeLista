import express from 'express';
import {
  marcarAsistencia,
  quitarAsistencia,
  moverAParticipantes,
  moverAListaEspera,
  getEstadisticas
} from '../controllers/asistenciaController.js';

const router = express.Router();

// Marcar/quitar asistencia
router.post('/marcar/:id', marcarAsistencia);
router.post('/quitar/:id', quitarAsistencia);

// Mover entre listas
router.post('/promover/:id', moverAParticipantes);
router.post('/relegar/:id', moverAListaEspera);

// Estadísticas
router.get('/estadisticas', getEstadisticas);

export default router;
