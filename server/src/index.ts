import express from 'express';
import cors from 'cors';
import db, { initDatabase } from './database';

const app = express();
app.use(cors());
app.use(express.json());


initDatabase();





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});