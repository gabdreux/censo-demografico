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






const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});