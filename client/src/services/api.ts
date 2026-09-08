import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
});

export interface MunicipioBusca {
  cd_mun: string;
  nm_mun: string;
  cd_uf: string;
  nm_uf: string;
}

export interface MunicipioDetalhe {
  cd_mun: string;
  nm_mun: string;
  cd_uf: string;
  nm_uf: string;
  total_setores: number;
  area_total: number;
  populacao_total: number;
  densidade_demografica: number;
  setores_urbanos: number;
  setores_rurais: number;
  total_homens: number;
  total_mulheres: number;
}

export interface UF {
  cd_uf: string;
  nm_uf: string;
}

export interface EstadoDetalhe {
  estado: {
    cd_uf: string;
    nm_uf: string;
    area_total: number;
    populacao_total: number;
    densidade_demografica: number;
  };
  municipios: Array<{
    cd_mun: string;
    nm_mun: string;
    populacao_total: number;
    area_total: number;
    densidade_demografica: number;
  }>;
}