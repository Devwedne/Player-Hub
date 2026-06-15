import { timeService } from '../services/timeService.js';

export const timeController = {
  async listarTodos(req, res) {
    const times = await timeService.listarTodos();
    res.json(times);
  },

  async buscarPorId(req, res) {
    const time = await timeService.buscarPorId(Number(req.params.id));
    res.json(time);
  },

  async criar(req, res) {
    const novo = await timeService.criar(req.body);
    res.status(201).json(novo);
  },

  async atualizar(req, res) {
    const atualizado = await timeService.atualizar(Number(req.params.id), req.body);
    res.json(atualizado);
  },

  async remover(req, res) {
    await timeService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
