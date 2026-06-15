import { timeModel } from '../models/time.js';

function criarErro(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export const timeService = {
  listarTodos() {
    return timeModel.listarTodos();
  },

  async buscarPorId(id) {
    const time = await timeModel.buscarPorId(id);
    if (!time) {
      throw criarErro('Time nao encontrado', 404);
    }
    return time;
  },

  async criar({ nome, pais, treinador }) {
    if (!nome || !pais) {
      throw criarErro('Campos "nome" e "pais" sao obrigatorios', 400);
    }

    const existente = await timeModel.buscarPorNome(nome);
    if (existente) {
      throw criarErro('Ja existe um time com este nome', 409);
    }

    return timeModel.inserir({ nome, pais, treinador });
  },

  async atualizar(id, dados) {
    try {
      return await timeModel.atualizar(id, dados);
    } catch (err) {
      if (err.code === 'NOT_FOUND') {
        throw criarErro('Time nao encontrado', 404);
      }
      if (err.code === 'ERR_SQLITE_CONSTRAINT_UNIQUE') {
        throw criarErro('Ja existe um time com este nome', 409);
      }
      throw err;
    }
  },

  async remover(id) {
    try {
      await timeModel.remover(id);
    } catch (err) {
      if (err.code === 'NOT_FOUND') {
        throw criarErro('Time nao encontrado', 404);
      }
      throw err;
    }
  },
};
