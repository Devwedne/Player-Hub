import { Pessoa } from './pessoa.js';

export class Jogador extends Pessoa {
  constructor({ posicao, numeroDaCamisa, timeId, ...pessoa } = {}) {
    super(pessoa);
    this.posicao = posicao;
    this.numeroDaCamisa = numeroDaCamisa === undefined ? undefined : Number(numeroDaCamisa);
    this.timeId = timeId === undefined ? undefined : Number(timeId);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      posicao: this.posicao,
      numeroDaCamisa: this.numeroDaCamisa,
      timeId: this.timeId,
    };
  }
}
