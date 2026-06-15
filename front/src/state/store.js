window.state = {
  times: [],
  jogadores: [],
  filtroTimeId: '',
  timeEditandoId: null,
  jogadorEditandoId: null,
  timeParaExcluirId: null,
  jogadorParaExcluirId: null,
};

window.setTimes = function setTimes(times) {
  window.state.times = times;
}

window.setJogadores = function setJogadores(jogadores) {
  window.state.jogadores = jogadores;
}

window.setFiltroTimeId = function setFiltroTimeId(timeId) {
  window.state.filtroTimeId = timeId;
}

window.setTimeEditandoId = function setTimeEditandoId(id) {
  window.state.timeEditandoId = id;
}

window.setJogadorEditandoId = function setJogadorEditandoId(id) {
  window.state.jogadorEditandoId = id;
}

window.setTimeParaExcluirId = function setTimeParaExcluirId(id) {
  window.state.timeParaExcluirId = id;
}

window.setJogadorParaExcluirId = function setJogadorParaExcluirId(id) {
  window.state.jogadorParaExcluirId = id;
}
