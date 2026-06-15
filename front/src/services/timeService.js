window.timeService = {
  listar() {
    return window.api.get('/times');
  },

  criar(dados) {
    validarTime(dados);
    return window.api.post('/times', dados);
  },

  atualizar(id, dados) {
    validarTime(dados);
    return window.api.put(`/times/${id}`, dados);
  },

  remover(id) {
    return window.api.delete(`/times/${id}`);
  },
};

function validarTime(dados) {
  if (!dados.nome) {
    throw new Error('Informe o nome do time.');
  }

  if (!dados.pais) {
    throw new Error('Informe o pais do time.');
  }
}
