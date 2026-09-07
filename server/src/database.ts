import Database from 'better-sqlite3';
import path from 'path';


const dbPath = path.resolve(__dirname, '../../censo.sqlite');
const db = new Database(dbPath);


db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

export function initDatabase() {
  console.log('Verificando e criando índices de alta performance no SQLite...');

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_setor_cd_mun ON setor(cd_mun);
    CREATE INDEX IF NOT EXISTS idx_demografia_cd_setor ON demografia(cd_setor);
    CREATE INDEX IF NOT EXISTS idx_municipio_cd_uf ON municipio(cd_uf);
    CREATE INDEX IF NOT EXISTS idx_municipio_nm_mun ON municipio(nm_mun);
  `);

  console.log('Índices verificados/criados com sucesso!');
}


export default db;