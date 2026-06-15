import { Router } from 'express';
import { timeController } from '../controllers/timeController.js';

const router = Router();

router.get('/', timeController.listarTodos);
router.get('/:id', timeController.buscarPorId);
router.post('/', timeController.criar);
router.put('/:id', timeController.atualizar);
router.delete('/:id', timeController.remover);

export default router;
