# Especificação do Projeto - Censo Demográfico 2022 (BMAD Method)

## 1. Visão Geral
Aplicação Full-Stack para consulta e agregação de dados do Censo Demográfico 2022 do IBGE por município e por estado.

## 2. Requisitos Funcionais

### Tela 1: Busca e Consulta por Município
- [ ] **Autocomplete:** Busca dinâmica por nome do município (`nm_mun`). Exibir formato `Nome do Município - UF` para evitar ambiguidade entre cidades homônimas.
- [ ] **Agregação de Dados:**
  - População Total
  - Quantidade de Setores Censitários
  - Área Total ($km^2$)
  - Densidade Demográfica ($hab/km^2$)
  - Proporção/Divisão de Setores Urbanos vs Rurais (trata registros nulos como "Não informados")
  - Distribuição Populacional por Sexo (Homens vs Mulheres)

### Tela 2: Consulta e Ranking por Estado (UF)
- [ ] **Seleção de UF:** Dropdown/Select com as 27 UFs.
- [ ] **Agregação do Estado:**
  - População Total do Estado
  - Área Total do Estado ($km^2$)
  - Densidade Demográfica do Estado ($hab/km^2$)
- [ ] **Ranking de Municípios:** Lista ordenada por densidade demográfica (decrescente), com tratamento de performance para listas longas (ex: SP com 645 municípios).

## 3. Requisitos Não-Funcionais & Arquitetura
- **Performance SQL:** Criação automática de índices no SQLite (`cd_mun`, `cd_setor`, `cd_uf`) no boot da aplicação para consultas agregadas em milissegundos.
- **Containerização:** Docker + Docker Compose subindo aplicação completa via `docker compose up` em comando único sem etapas manuais.
- **E2E e Unit Tests:** Cobertura de testes unitários no backend (API/Queries) e frontend (Componentes/Fluxos).

## 4. Histórico de User Stories & Tarefas (BMAD Tasks)
- **US01:** Setup do ambiente, Dockerfile e otimização do banco SQLite via scripts de indexação.
- **US02:** Desenvolvimento da API REST em Node.js/Express + TypeScript com suporte a agregações SQL eficientes.
- **US03:** Interface em React com Tailwind CSS com suporte às telas de busca por município e ranking estadual.
- **US04:** Testes automatizados e documentação final no README.md.