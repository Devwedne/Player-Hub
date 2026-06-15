import { Router } from 'express';
import { jogadorController } from '../controllers/jogadorController.js';

const router = Router();

router.get('/', jogadorController.listarTodos);
router.get('/:id', jogadorController.buscarPorId);
router.post('/', jogadorController.criar);
router.put('/:id', jogadorController.atualizar);
router.delete('/:id', jogadorController.remover);

export default router;
