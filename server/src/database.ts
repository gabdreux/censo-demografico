import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../censo.sqlite');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

export function initDatabase() {
  console.log('Verificando e criando tabelas e índices no SQLite...');

  
  db.exec(`
    CREATE TABLE IF NOT EXISTS uf (
      cd_uf TEXT PRIMARY KEY,
      nm_uf TEXT NOT NULL
    ) WITHOUT ROWID;

    CREATE TABLE IF NOT EXISTS municipio (
      cd_mun TEXT PRIMARY KEY,
      nm_mun TEXT NOT NULL,
      cd_uf TEXT NOT NULL REFERENCES uf(cd_uf)
    ) WITHOUT ROWID;

    CREATE TABLE IF NOT EXISTS setor (
      cd_setor TEXT PRIMARY KEY,
      cd_mun TEXT NOT NULL REFERENCES municipio(cd_mun),
      situacao TEXT,
      area_km2 REAL,
      populacao INTEGER
    ) WITHOUT ROWID;

    CREATE TABLE IF NOT EXISTS demografia (
      cd_setor TEXT PRIMARY KEY REFERENCES setor(cd_setor),
      moradores INTEGER,
      homens INTEGER,
      mulheres INTEGER
    ) WITHOUT ROWID;
  `);


  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_municipio_cd_uf ON municipio(cd_uf);
    CREATE INDEX IF NOT EXISTS idx_municipio_nm_mun ON municipio(nm_mun);
    CREATE INDEX IF NOT EXISTS idx_setor_cd_mun ON setor(cd_mun);
    CREATE INDEX IF NOT EXISTS idx_demografia_cd_setor ON demografia(cd_setor);
  `);

  console.log('Tabelas e índices verificados/criados com sucesso!');
}

export default db;