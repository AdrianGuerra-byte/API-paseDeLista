import express from 'express';
import {
  getParticipantes,
  getParticipanteById,
  createParticipante,
  updateParticipante,
  patchParticipante,
  deleteParticipante
} from '../controllers/participantesController.js';

const router = express.Router();

router.get('/', getParticipantes);
router.get('/:id', getParticipanteById);
router.post('/', createParticipante);
router.put('/:id', updateParticipante);
router.patch('/:id', patchParticipante);
router.delete('/:id', deleteParticipante);

export default router;
