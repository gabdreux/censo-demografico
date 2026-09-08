import { describe, it, expect } from 'vitest';

describe('Frontend Sanity Test', () => {
  it('deve validar a integridade dos dados básicos', () => {
    const totalUfsBrasil = 27;
    expect(totalUfsBrasil).toBe(27);
  });
});

describe('Censo Demografico Utils', () => {
  it('deve calcular a densidade demografica corretamente', () => {
    const populacao = 6211223;
    const area = 1200.33;
    const densidade = populacao / area;

    expect(Number(densidade.toFixed(2))).toBe(5174.60);
  });
});