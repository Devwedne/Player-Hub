export class Pessoa {
  constructor({ nome, idade, nacionalidade } = {}) {
    this.nome = nome;
    this.idade = idade === undefined ? undefined : Number(idade);
    this.nacionalidade = nacionalidade;
  }

  toJSON() {
    return {
      nome: this.nome,
      idade: this.idade,
      nacionalidade: this.nacionalidade,
    };
  }
}
