window.jogadorService = {
  listar(timeId = '') {
    const query = timeId ? `?timeId=${timeId}` : '';
    return window.api.get(`/jogadores${query}`);
  },

  criar(dados) {
    validarJogador(dados);
    return window.api.post('/jogadores', dados);
  },

  atualizar(id, dados) {
    validarJogador(dados);
    return window.api.put(`/jogadores/${id}`, dados);
  },

  remover(id) {
    return window.api.delete(`/jogadores/${id}`);
  },
};

function validarJogador(dados) {
  if (!dados.nome) {
    throw new Error('Informe o nome do jogador.');
  }

  if (!Number.isInteger(dados.idade) || dados.idade < 15 || dados.idade > 50) {
    throw new Error('A idade deve ser um numero inteiro entre 15 e 50.');
  }

  if (!dados.posicao) {
    throw new Error('Informe a posicao do jogador.');
  }

  if (!Number.isInteger(dados.numeroDaCamisa) || dados.numeroDaCamisa < 1 || dados.numeroDaCamisa > 99) {
    throw new Error('A camisa deve ser um numero inteiro entre 1 e 99.');
  }

  if (!dados.nacionalidade) {
    throw new Error('Informe a nacionalidade do jogador.');
  }

  if (!Number.isInteger(dados.timeId) || dados.timeId <= 0) {
    throw new Error('Selecione um time para o jogador.');
  }
}
