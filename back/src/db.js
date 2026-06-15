import { dirname, isAbsolute, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(__dirname, '..');
const dbPath = process.env.SQLITE_PATH
  ? isAbsolute(process.env.SQLITE_PATH)
    ? process.env.SQLITE_PATH
    : join(backendRoot, process.env.SQLITE_PATH)
  : join(backendRoot, 'banco.db');

export const db = new DatabaseSync(dbPath);

db.exec('PRAGMA foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS times (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    pais TEXT NOT NULL,
    treinador TEXT,
    criadoEm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS jogadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    posicao TEXT NOT NULL,
    numeroDaCamisa INTEGER NOT NULL,
    nacionalidade TEXT NOT NULL,
    timeId INTEGER NOT NULL,
    criadoEm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizadoEm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (timeId) REFERENCES times(id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (timeId, numeroDaCamisa)
  );
`);

export function closeDatabase() {
  db.close();
}
