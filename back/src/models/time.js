import { db } from '../db.js';

function mapearTime(row, jogadores = []) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    nome: row.nome,
    pais: row.pais,
    treinador: row.treinador,
    criadoEm: row.criadoEm,
    jogadores,
  };
}

function mapearJogador(row) {
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
  };
}

class TimeModel {
  buscarJogadores(timeId) {
    return db
      .prepare('SELECT * FROM jogadores WHERE timeId = ? ORDER BY id ASC')
      .all(timeId)
      .map(mapearJogador);
  }

  listarTodos() {
    return db
      .prepare('SELECT * FROM times ORDER BY id ASC')
      .all()
      .map((time) => mapearTime(time, this.buscarJogadores(time.id)));
  }

  buscarPorId(id) {
    const time = db.prepare('SELECT * FROM times WHERE id = ?').get(id);
    return mapearTime(time, time ? this.buscarJogadores(time.id) : []);
  }

  buscarPorNome(nome) {
    return mapearTime(db.prepare('SELECT * FROM times WHERE nome = ?').get(nome));
  }

  inserir({ nome, pais, treinador }) {
    const result = db
      .prepare('INSERT INTO times (nome, pais, treinador) VALUES (?, ?, ?)')
      .run(nome, pais, treinador || null);

    return this.buscarPorId(Number(result.lastInsertRowid));
  }

  atualizar(id, dados) {
    const atual = this.buscarPorId(id);
    if (!atual) {
      const err = new Error('Time nao encontrado');
      err.code = 'NOT_FOUND';
      throw err;
    }

    db.prepare('UPDATE times SET nome = ?, pais = ?, treinador = ? WHERE id = ?').run(
      dados.nome ?? atual.nome,
      dados.pais ?? atual.pais,
      dados.treinador ?? atual.treinador,
      id,
    );

    return this.buscarPorId(id);
  }

  remover(id) {
    const result = db.prepare('DELETE FROM times WHERE id = ?').run(id);
    if (result.changes === 0) {
      const err = new Error('Time nao encontrado');
      err.code = 'NOT_FOUND';
      throw err;
    }
  }
}

export const timeModel = new TimeModel();
