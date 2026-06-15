import { Jogador } from '../models/jogadorEntidade.js';
import { jogadorModel } from '../models/jogador.js';
import { timeModel } from '../models/time.js';

function criarErro(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function normalizarJogador(dados) {
  return new Jogador(dados).toJSON();
}

export const jogadorService = {
  listarTodos(timeId) {
    if (timeId) {
      return jogadorModel.listarPorTime(Number(timeId));
    }
    return jogadorModel.listarTodos();
  },

  async buscarPorId(id) {
    const jogador = await jogadorModel.buscarPorId(id);
    if (!jogador) {
      throw criarErro('Jogador nao encontrado', 404);
    }
    return jogador;
  },

  async criar(dados) {
    const jogador = normalizarJogador(dados);
    const camposObrigatorios = ['nome', 'idade', 'posicao', 'numeroDaCamisa', 'nacionalidade', 'timeId'];
    const faltando = camposObrigatorios.filter((campo) => jogador[campo] === undefined || jogador[campo] === '');

    if (faltando.length > 0) {
      throw criarErro(`Campos obrigatorios ausentes: ${faltando.join(', ')}`, 400);
    }

    if (!Number.isInteger(jogador.idade) || jogador.idade < 15 || jogador.idade > 50) {
      throw criarErro('A idade deve ser um numero inteiro entre 15 e 50', 400);
    }

    if (!Number.isInteger(jogador.numeroDaCamisa) || jogador.numeroDaCamisa < 1 || jogador.numeroDaCamisa > 99) {
      throw criarErro('O numero da camisa deve ser um inteiro entre 1 e 99', 400);
    }

    const time = await timeModel.buscarPorId(jogador.timeId);
    if (!time) {
      throw criarErro('Time informado nao existe', 422);
    }

    const camisaEmUso = await jogadorModel.buscarPorCamisaNoTime(jogador.timeId, jogador.numeroDaCamisa);
    if (camisaEmUso) {
      throw criarErro('Este numero de camisa ja esta em uso neste time', 409);
    }

    return jogadorModel.inserir(jogador);
  },

  async atualizar(id, dados) {
    const atual = await this.buscarPorId(id);
    const jogador = normalizarJogador(dados);
    const timeId = jogador.timeId ?? atual.timeId;
    const numeroDaCamisa = jogador.numeroDaCamisa ?? atual.numeroDaCamisa;

    if (jogador.idade !== undefined && (!Number.isInteger(jogador.idade) || jogador.idade < 15 || jogador.idade > 50)) {
      throw criarErro('A idade deve ser um numero inteiro entre 15 e 50', 400);
    }

    if (jogador.numeroDaCamisa !== undefined && (!Number.isInteger(jogador.numeroDaCamisa) || jogador.numeroDaCamisa < 1 || jogador.numeroDaCamisa > 99)) {
      throw criarErro('O numero da camisa deve ser um inteiro entre 1 e 99', 400);
    }

    if (jogador.timeId !== undefined) {
      const time = await timeModel.buscarPorId(jogador.timeId);
      if (!time) {
        throw criarErro('Time informado nao existe', 422);
      }
    }

    const camisaEmUso = await jogadorModel.buscarPorCamisaNoTime(timeId, numeroDaCamisa);
    if (camisaEmUso && camisaEmUso.id !== id) {
      throw criarErro('Este numero de camisa ja esta em uso neste time', 409);
    }

    try {
      return await jogadorModel.atualizar(id, jogador);
    } catch (err) {
      if (err.code === 'NOT_FOUND') {
        throw criarErro('Jogador nao encontrado', 404);
      }
      throw err;
    }
  },

  async remover(id) {
    try {
      await jogadorModel.remover(id);
    } catch (err) {
      if (err.code === 'NOT_FOUND') {
        throw criarErro('Jogador nao encontrado', 404);
      }
      throw err;
    }
  },
};
