import { jogadorService } from '../services/jogadorService.js';

export const jogadorController = {
  async listarTodos(req, res) {
    const jogadores = await jogadorService.listarTodos(req.query.timeId);
    res.json(jogadores);
  },

  async buscarPorId(req, res) {
    const jogador = await jogadorService.buscarPorId(Number(req.params.id));
    res.json(jogador);
  },

  async criar(req, res) {
    const novo = await jogadorService.criar(req.body);
    res.status(201).json(novo);
  },

  async atualizar(req, res) {
    const atualizado = await jogadorService.atualizar(Number(req.params.id), req.body);
    res.json(atualizado);
  },

  async remover(req, res) {
    await jogadorService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
