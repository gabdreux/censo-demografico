import express from 'express';
import cors from 'cors';
import db, { initDatabase } from './database';

const app = express();
app.use(cors());
app.use(express.json());


initDatabase();


// Autocomplete de Municípios
app.get('/api/municipios/busca', (req, res) => {
  const query = req.query.q as string;
  if (!query || query.length < 2) return res.json([]);

  const stmt = db.prepare(`
    SELECT m.cd_mun, m.nm_mun, u.nm_uf, u.cd_uf
    FROM municipio m
    JOIN uf u ON m.cd_uf = u.cd_uf
    WHERE m.nm_mun LIKE ?
    LIMIT 15
  `);

  const resultados = stmt.all(`%${query}%`);
  res.json(resultados);
});



// Agregação do Município
app.get('/api/municipios/:cd_mun', (req, res) => {
  const { cd_mun } = req.params;

  const stmt = db.prepare(`
    SELECT 
      m.cd_mun,
      m.nm_mun,
      u.nm_uf,
      u.cd_uf,
      COUNT(s.cd_setor) as total_setores,
      COALESCE(SUM(s.area_km2), 0) as area_total,
      COALESCE(SUM(s.populacao), 0) as populacao_total,
      COALESCE(SUM(CASE WHEN s.situacao = 'Urbana' THEN 1 ELSE 0 END), 0) as setores_urbanos,
      COALESCE(SUM(CASE WHEN s.situacao = 'Rural' THEN 1 ELSE 0 END), 0) as setores_rurais,
      COALESCE(SUM(d.homens), 0) as total_homens,
      COALESCE(SUM(d.mulheres), 0) as total_mulheres
    FROM municipio m
    JOIN uf u ON m.cd_uf = u.cd_uf
    LEFT JOIN setor s ON m.cd_mun = s.cd_mun
    LEFT JOIN demografia d ON s.cd_setor = d.cd_setor
    WHERE m.cd_mun = ?
    GROUP BY m.cd_mun
  `);

  const dados = stmt.get(cd_mun) as any;
  if (!dados) return res.status(404).json({ error: 'Município não encontrado' });

  dados.densidade_demografica = dados.area_total > 0 ? dados.populacao_total / dados.area_total : 0;

  res.json(dados);
});




// Lista de UFs
app.get('/api/ufs', (req, res) => {
  const stmt = db.prepare('SELECT * FROM uf ORDER BY nm_uf ASC');
  res.json(stmt.all());
});







const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});