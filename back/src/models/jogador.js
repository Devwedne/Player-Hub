import { db } from '../db.js';

function mapearTime(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.time_id,
    nome: row.time_nome,
    pais: row.time_pais,
    treinador: row.time_treinador,
    criadoEm: row.time_criadoEm,
  };
}

function mapearJogador(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    nome: row.nome,
    idade: row.idade,
    posicao: row.posicao,
    numeroDaCamisa: row.numeroDaCamisa,
    nacionalidade: row.nacionalidade,
    timeId: row.timeId,
    criadoEm: row.criadoEm,
    atualizadoEm: row.atualizadoEm,
    time: mapearTime(row),
  };
}

const LISTAR_TODOS_SQL = `
  SELECT
    j.*,
    t.id AS time_id,
    t.nome AS time_nome,
    t.pais AS time_pais,
    t.treinador AS time_treinador,
    t.criadoEm AS time_criadoEm
  FROM jogadores j
  JOIN times t ON t.id = j.timeId
  ORDER BY j.id ASC
`;

const LISTAR_POR_TIME_SQL = `
  SELECT
    j.*,
    t.id AS time_id,
    t.nome AS time_nome,
    t.pais AS time_pais,
    t.treinador AS time_treinador,
    t.criadoEm AS time_criadoEm
  FROM jogadores j
  JOIN times t ON t.id = j.timeId
  WHERE j.timeId = ?
  ORDER BY j.id ASC
`;

const BUSCAR_POR_ID_SQL = `
  SELECT
    j.*,
    t.id AS time_id,
    t.nome AS time_nome,
    t.pais AS time_pais,
    t.treinador AS time_treinador,
    t.criadoEm AS time_criadoEm
  FROM jogadores j
  JOIN times t ON t.id = j.timeId
  WHERE j.id = ?
`;

const BUSCAR_POR_CAMISA_SQL = `
  SELECT
    j.*,
    t.id AS time_id,
    t.nome AS time_nome,
    t.pais AS time_pais,
    t.treinador AS time_treinador,
    t.criadoEm AS time_criadoEm
  FROM jogadores j
  JOIN times t ON t.id = j.timeId
  WHERE j.timeId = ? AND j.numeroDaCamisa = ?
`;

class JogadorModel {
  listarTodos() {
    return db
      .prepare(LISTAR_TODOS_SQL)
      .all()
      .map(mapearJogador);
  }

  listarPorTime(timeId) {
    return db
      .prepare(LISTAR_POR_TIME_SQL)
      .all(timeId)
      .map(mapearJogador);
  }

  buscarPorId(id) {
    return mapearJogador(db.prepare(BUSCAR_POR_ID_SQL).get(id));
  }

  buscarPorCamisaNoTime(timeId, numeroDaCamisa) {
    return mapearJogador(
      db
        .prepare(BUSCAR_POR_CAMISA_SQL)
        .get(timeId, numeroDaCamisa),
    );
  }

  inserir({ nome, idade, posicao, numeroDaCamisa, nacionalidade, timeId }) {
    const result = db
      .prepare(
        `INSERT INTO jogadores
          (nome, idade, posicao, numeroDaCamisa, nacionalidade, timeId, atualizadoEm)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      )
      .run(nome, idade, posicao, numeroDaCamisa, nacionalidade, timeId);

    return this.buscarPorId(Number(result.lastInsertRowid));
  }

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) {
      const err = new Error('Jogador nao encontrado');
      err.code = 'NOT_FOUND';
      throw err;
    }

    db.prepare(
      `UPDATE jogadores
       SET nome = ?,
           idade = ?,
           posicao = ?,
           numeroDaCamisa = ?,
           nacionalidade = ?,
           timeId = ?,
           atualizadoEm = CURRENT_TIMESTAMP
       WHERE id = ?`,
    ).run(
      dados.nome ?? atual.nome,
      dados.idade ?? atual.idade,
      dados.posicao ?? atual.posicao,
      dados.numeroDaCamisa ?? atual.numeroDaCamisa,
      dados.nacionalidade ?? atual.nacionalidade,
      dados.timeId ?? atual.timeId,
      id,
    );

    return this.buscarPorId(id);
  }

  remover(id) {
    const result = db.prepare('DELETE FROM jogadores WHERE id = ?').run(id);
    if (result.changes === 0) {
      const err = new Error('Jogador nao encontrado');
      err.code = 'NOT_FOUND';
      throw err;
    }
  }
}

export const jogadorModel = new JogadorModel();
