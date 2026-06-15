window.renderResumo = function renderResumo(state) {
  window.elements.totalTimes.textContent = state.times.length;
  window.elements.totalJogadores.textContent = state.jogadores.length;
}

window.renderTimes = function renderTimes(times) {
  if (times.length === 0) {
    window.elements.timesTbody.innerHTML = emptyRow('Nenhum time cadastrado.', 5);
    return;
  }

  window.elements.timesTbody.innerHTML = times.map((time) => `
    <tr>
      <td class="fw-semibold">${escapeHtml(time.nome)}</td>
      <td>${escapeHtml(time.pais)}</td>
      <td>${escapeHtml(time.treinador || '-')}</td>
      <td>${time.jogadores?.length ?? 0}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary btn-action" data-action="editar-time" data-id="${time.id}">
          <i class="bi bi-pencil" aria-hidden="true"></i>
          Editar
        </button>
        <button class="btn btn-sm btn-outline-danger btn-action" data-action="remover-time" data-id="${time.id}">
          <i class="bi bi-trash" aria-hidden="true"></i>
          Excluir
        </button>
      </td>
    </tr>
  `).join('');
}

window.renderJogadores = function renderJogadores(jogadores) {
  if (jogadores.length === 0) {
    window.elements.jogadoresTbody.innerHTML = emptyRow('Nenhum jogador cadastrado.', 6);
    return;
  }

  window.elements.jogadoresTbody.innerHTML = jogadores.map((jogador) => `
    <tr>
      <td class="fw-semibold">${escapeHtml(jogador.nome)}</td>
      <td>${escapeHtml(jogador.time?.nome || '-')}</td>
      <td>${escapeHtml(jogador.posicao)}</td>
      <td>${jogador.idade}</td>
      <td><span class="badge text-bg-dark">${jogador.numeroDaCamisa}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-secondary btn-action" data-action="editar-jogador" data-id="${jogador.id}">
          <i class="bi bi-pencil" aria-hidden="true"></i>
          Editar
        </button>
        <button class="btn btn-sm btn-outline-danger btn-action" data-action="remover-jogador" data-id="${jogador.id}">
          <i class="bi bi-trash" aria-hidden="true"></i>
          Excluir
        </button>
      </td>
    </tr>
  `).join('');
}

window.renderSelects = function renderSelects(times, filtroTimeId) {
  const options = times.map((time) => `<option value="${time.id}">${escapeHtml(time.nome)}</option>`).join('');
  window.elements.jogadorTime.innerHTML = `<option value="">Selecione um time</option>${options}`;
  window.elements.editarJogadorTime.innerHTML = `<option value="">Selecione um time</option>${options}`;
  window.elements.filtroTime.innerHTML = `<option value="">Todos os times</option>${options}`;
  window.elements.filtroTime.value = filtroTimeId;
}

window.showAlert = function showAlert(message, type = 'success') {
  window.elements.alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${escapeHtml(message)}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    </div>
  `;
}

window.fillTimeForm = function fillTimeForm(time) {
  window.elements.timeId.value = time.id;
  window.elements.timeNome.value = time.nome;
  window.elements.timePais.value = time.pais;
  window.elements.timeTreinador.value = time.treinador || '';
  window.elements.timeSubmit.innerHTML = '<i class="bi bi-check2-circle" aria-hidden="true"></i>Atualizar time';
  window.elements.timeNome.focus();
}

window.clearTimeForm = function clearTimeForm() {
  window.elements.formTime.reset();
  window.elements.timeId.value = '';
  window.elements.timeSubmit.innerHTML = '<i class="bi bi-check2-circle" aria-hidden="true"></i>Salvar time';
}

window.fillJogadorForm = function fillJogadorForm(jogador) {
  window.elements.jogadorId.value = jogador.id;
  window.elements.jogadorNome.value = jogador.nome;
  window.elements.jogadorIdade.value = jogador.idade;
  window.elements.jogadorCamisa.value = jogador.numeroDaCamisa;
  window.elements.jogadorPosicao.value = jogador.posicao;
  window.elements.jogadorNacionalidade.value = jogador.nacionalidade;
  window.elements.jogadorTime.value = jogador.timeId;
  window.elements.jogadorSubmit.innerHTML = '<i class="bi bi-check2-circle" aria-hidden="true"></i>Atualizar jogador';
  window.elements.jogadorNome.focus();
}

window.clearJogadorForm = function clearJogadorForm() {
  window.elements.formJogador.reset();
  window.elements.jogadorId.value = '';
  window.elements.jogadorSubmit.innerHTML = '<i class="bi bi-check2-circle" aria-hidden="true"></i>Salvar jogador';
}

function emptyRow(message, colSpan) {
  return `
    <tr>
      <td colspan="${colSpan}" class="text-center text-secondary py-4">${message}</td>
    </tr>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
