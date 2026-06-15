document.addEventListener('DOMContentLoaded', init);

let modalExcluirTime;
let modalExcluirJogador;
let modalEditarTime;
let modalEditarJogador;

async function init() {
  bindEvents();
  modalExcluirTime = new bootstrap.Modal(window.elements.modalExcluirTime);
  modalExcluirJogador = new bootstrap.Modal(window.elements.modalExcluirJogador);
  modalEditarTime = new bootstrap.Modal(window.elements.modalEditarTime);
  modalEditarJogador = new bootstrap.Modal(window.elements.modalEditarJogador);
  await carregarTudo();
}

function bindEvents() {
  window.elements.formTime.addEventListener('submit', salvarTime);
  window.elements.formJogador.addEventListener('submit', salvarJogador);
  window.elements.formEditarTime.addEventListener('submit', salvarEdicaoTime);
  window.elements.formEditarJogador.addEventListener('submit', salvarEdicaoJogador);
  window.elements.timeCancelar.addEventListener('click', cancelarEdicaoTime);
  window.elements.jogadorCancelar.addEventListener('click', cancelarEdicaoJogador);
  window.elements.recarregarTimes.addEventListener('click', carregarTimes);
  window.elements.recarregarJogadores.addEventListener('click', carregarJogadores);
  window.elements.confirmarExcluirTime.addEventListener('click', confirmarRemocaoTime);
  window.elements.confirmarExcluirJogador.addEventListener('click', confirmarRemocaoJogador);
  window.elements.filtroTime.addEventListener('change', filtrarJogadores);
  window.elements.timesTbody.addEventListener('click', handleTimesTableClick);
  window.elements.jogadoresTbody.addEventListener('click', handleJogadoresTableClick);
}

async function carregarTudo() {
  try {
    await carregarTimes();
    await carregarJogadores();
  } catch (error) {
    window.showAlert(`Nao foi possivel carregar a API: ${error.message}`, 'danger');
  }
}

async function carregarTimes() {
  const times = await window.timeService.listar();
  window.setTimes(times);
  window.renderTimes(window.state.times);
  window.renderSelects(window.state.times, window.state.filtroTimeId);
  window.renderResumo(window.state);
}

async function carregarJogadores() {
  const jogadores = await window.jogadorService.listar(window.state.filtroTimeId);
  window.setJogadores(jogadores);
  window.renderJogadores(window.state.jogadores);
  window.renderResumo(window.state);
}

async function salvarTime(event) {
  event.preventDefault();

  const dados = {
    nome: window.elements.timeNome.value.trim(),
    pais: window.elements.timePais.value.trim(),
    treinador: window.elements.timeTreinador.value.trim(),
  };

  try {
    if (window.state.timeEditandoId) {
      await window.timeService.atualizar(window.state.timeEditandoId, dados);
      window.showAlert('Time atualizado com sucesso.');
    } else {
      await window.timeService.criar(dados);
      window.showAlert('Time cadastrado com sucesso.');
    }

    cancelarEdicaoTime();
    await carregarTimes();
    await carregarJogadores();
  } catch (error) {
    window.showAlert(error.message, 'danger');
  }
}

async function salvarJogador(event) {
  event.preventDefault();

  const dados = {
    nome: window.elements.jogadorNome.value.trim(),
    idade: Number(window.elements.jogadorIdade.value),
    posicao: window.elements.jogadorPosicao.value.trim(),
    numeroDaCamisa: Number(window.elements.jogadorCamisa.value),
    nacionalidade: window.elements.jogadorNacionalidade.value.trim(),
    timeId: Number(window.elements.jogadorTime.value),
  };

  try {
    if (window.state.jogadorEditandoId) {
      await window.jogadorService.atualizar(window.state.jogadorEditandoId, dados);
      window.showAlert('Jogador atualizado com sucesso.');
    } else {
      await window.jogadorService.criar(dados);
      window.showAlert('Jogador cadastrado com sucesso.');
    }

    cancelarEdicaoJogador();
    await carregarTimes();
    await carregarJogadores();
  } catch (error) {
    window.showAlert(error.message, 'danger');
  }
}

async function filtrarJogadores() {
  window.setFiltroTimeId(window.elements.filtroTime.value);
  await carregarJogadores();
}

function handleTimesTableClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === 'editar-time') {
    const time = window.state.times.find((item) => item.id === id);
    if (time) {
      abrirModalEditarTime(time);
    }
  }

  if (action === 'remover-time') {
    abrirModalRemoverTime(id);
  }
}

function handleJogadoresTableClick(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === 'editar-jogador') {
    const jogador = window.state.jogadores.find((item) => item.id === id);
    if (jogador) {
      abrirModalEditarJogador(jogador);
    }
  }

  if (action === 'remover-jogador') {
    abrirModalRemoverJogador(id);
  }
}

function abrirModalRemoverTime(id) {
  window.setTimeParaExcluirId(id);
  modalExcluirTime.show();
}

function abrirModalEditarTime(time) {
  window.setTimeEditandoId(time.id);
  window.elements.editarTimeNome.value = time.nome;
  window.elements.editarTimePais.value = time.pais;
  window.elements.editarTimeTreinador.value = time.treinador || '';
  modalEditarTime.show();
}

async function salvarEdicaoTime(event) {
  event.preventDefault();
  if (!window.state.timeEditandoId) return;

  const dados = {
    nome: window.elements.editarTimeNome.value.trim(),
    pais: window.elements.editarTimePais.value.trim(),
    treinador: window.elements.editarTimeTreinador.value.trim(),
  };

  try {
    await window.timeService.atualizar(window.state.timeEditandoId, dados);
    window.showAlert('Time atualizado com sucesso.');
    modalEditarTime.hide();
    window.setTimeEditandoId(null);
    await carregarTimes();
    await carregarJogadores();
  } catch (error) {
    window.showAlert(error.message, 'danger');
  }
}

async function confirmarRemocaoTime() {
  if (!window.state.timeParaExcluirId) return;

  try {
    await window.timeService.remover(window.state.timeParaExcluirId);
    window.showAlert('Time removido com sucesso.');
    modalExcluirTime.hide();
    window.setTimeParaExcluirId(null);
    await carregarTimes();
    await carregarJogadores();
  } catch (error) {
    window.showAlert(error.message, 'danger');
  }
}

function abrirModalRemoverJogador(id) {
  window.setJogadorParaExcluirId(id);
  modalExcluirJogador.show();
}

function abrirModalEditarJogador(jogador) {
  window.setJogadorEditandoId(jogador.id);
  window.elements.editarJogadorNome.value = jogador.nome;
  window.elements.editarJogadorIdade.value = jogador.idade;
  window.elements.editarJogadorCamisa.value = jogador.numeroDaCamisa;
  window.elements.editarJogadorPosicao.value = jogador.posicao;
  window.elements.editarJogadorNacionalidade.value = jogador.nacionalidade;
  window.elements.editarJogadorTime.value = jogador.timeId;
  modalEditarJogador.show();
}

async function salvarEdicaoJogador(event) {
  event.preventDefault();
  if (!window.state.jogadorEditandoId) return;

  const dados = {
    nome: window.elements.editarJogadorNome.value.trim(),
    idade: Number(window.elements.editarJogadorIdade.value),
    posicao: window.elements.editarJogadorPosicao.value.trim(),
    numeroDaCamisa: Number(window.elements.editarJogadorCamisa.value),
    nacionalidade: window.elements.editarJogadorNacionalidade.value.trim(),
    timeId: Number(window.elements.editarJogadorTime.value),
  };

  try {
    await window.jogadorService.atualizar(window.state.jogadorEditandoId, dados);
    window.showAlert('Jogador atualizado com sucesso.');
    modalEditarJogador.hide();
    window.setJogadorEditandoId(null);
    await carregarTimes();
    await carregarJogadores();
  } catch (error) {
    window.showAlert(error.message, 'danger');
  }
}

async function confirmarRemocaoJogador() {
  if (!window.state.jogadorParaExcluirId) return;

  try {
    await window.jogadorService.remover(window.state.jogadorParaExcluirId);
    window.showAlert('Jogador removido com sucesso.');
    modalExcluirJogador.hide();
    window.setJogadorParaExcluirId(null);
    await carregarTimes();
    await carregarJogadores();
  } catch (error) {
    window.showAlert(error.message, 'danger');
  }
}

function cancelarEdicaoTime() {
  window.setTimeEditandoId(null);
  window.clearTimeForm();
}

function cancelarEdicaoJogador() {
  window.setJogadorEditandoId(null);
  window.clearJogadorForm();
}
