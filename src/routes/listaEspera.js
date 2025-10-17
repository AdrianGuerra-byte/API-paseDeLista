import express from 'express';
import {
  getListaEspera,
  getListaEsperaById,
  createListaEspera,
  updateListaEspera,
  patchListaEspera,
  deleteListaEspera
} from '../controllers/listaEsperaController.js';

const router = express.Router();

router.get('/', getListaEspera);
router.get('/:id', getListaEsperaById);
router.post('/', createListaEspera);
router.put('/:id', updateListaEspera);
router.patch('/:id', patchListaEspera);
router.delete('/:id', deleteListaEspera);

export default router;
