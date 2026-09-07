import request from 'supertest';
import { app } from './index';

describe('Suíte de Testes da API - Censo Demográfico', () => {
  // Teste do Autocomplete
  test('GET /api/municipios/busca - deve retornar autocomplete de cidades', async () => {
    const response = await request(app).get('/api/municipios/busca?q=Campinas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('nm_mun');
    expect(response.body[0]).toHaveProperty('cd_uf');
  });

  // Teste da Agregação por Município
  test('GET /api/municipios/:cd_mun - deve retornar detalhes agregados de um município', async () => {
    // Código 3550308 = São Paulo - SP
    const response = await request(app).get('/api/municipios/3550308');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('populacao_total');
    expect(response.body).toHaveProperty('densidade_demografica');
  });

  // Teste da Listagem de UFs
  test('GET /api/ufs - deve retornar a lista completa com 27 UFs', async () => {
    const response = await request(app).get('/api/ufs');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(27);
  });

  // Teste do Ranking e Totais por Estado
  test('GET /api/ufs/:cd_uf - deve retornar totais do estado e ranking de municípios', async () => {
    // Código 35 = SP
    const response = await request(app).get('/api/ufs/35');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('estado');
    expect(response.body).toHaveProperty('municipios');
    expect(Array.isArray(response.body.municipios)).toBe(true);
  });
});