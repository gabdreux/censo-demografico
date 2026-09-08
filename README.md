# Censo Demográfico 2022 — Teste Técnico Full Stack

Aplicação web desenvolvida como solução para o teste técnico de Desenvolvedor(a) Full Stack, permitindo a consulta detalhada de dados do **Censo Demográfico 2022 do IBGE** por município e por estado.

---

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js, Express, TypeScript, Better-SQLite3
* **Frontend:** React, Vite, TailwindCSS, Lucide Icons
* **Banco de Dados:** SQLite (`censo.sqlite` na raiz do projeto)
* **Infraestrutura:** Docker e Docker Compose

---

## 📦 Como Executar com Docker

O projeto está totalmente conteinerizado e pode ser executado com um único comando em uma máquina limpa que possua o Docker instalado.

Na raiz do repositório, execute:

```bash
docker compose up --build
```

Após a construção e inicialização dos containers, os serviços estarão disponíveis em:

* **Frontend:** http://localhost:5173
* **Backend API:** http://localhost:3001

Para encerrar os serviços, pressione `Ctrl + C` no terminal ou execute, em outra aba:

```bash
docker compose down
```

---

## 🎯 Escopo Desenvolvido

A aplicação atende aos fluxos exigidos no teste técnico:

### Busca por Município — Tela 1

Campo de autocomplete inteligente com suporte a **homônimos**, exibindo a UF correspondente para facilitar a identificação do município.

A consulta retorna indicadores agregados, incluindo:

* População total
* Quantidade de setores censitários
* Área total
* Densidade demográfica
* Divisão entre população urbana e rural
* Distribuição por sexo

### Busca por Estado — Tela 2

Seleção de uma **Unidade Federativa (UF)** com listagem de todos os seus municípios, ranqueados por **densidade demográfica**, do mais denso para o menos denso.

A tela também apresenta os **totais consolidados do estado**.

### Testes Automatizados

Implementação de testes unitários e de integração/E2E para validação dos principais fluxos e regras de negócio da aplicação.

### Histórico de Commits

Histórico de desenvolvimento organizado utilizando o padrão **Conventional Commits**, com categorias como:

* `feat`
* `fix`
* `docs`
* `test`
* `refactor`
* `chore`

---

## 💡 Decisões Técnicas

### SQLite + Better-SQLite3

O **SQLite**, utilizando `Better-SQLite3` no backend, foi escolhido pela alta performance de operações síncronas em Node.js e pela simplicidade operacional.

A solução é adequada para consultas analíticas rápidas sobre os mais de **468 mil registros** da tabela de setores, sem a necessidade de gerenciar um servidor de banco de dados externo.

### Índices de Performance sob Demanda

Como o arquivo SQLite original não possui índices adicionais além das chaves primárias, o backend verifica e cria, quando necessário, índices otimizados nas principais colunas utilizadas nas consultas:

* `cd_uf`
* `cd_mun`
* `cd_setor`

A criação utiliza `CREATE INDEX IF NOT EXISTS`, garantindo que os índices sejam configurados automaticamente na inicialização sem necessidade de intervenção manual.

Essa estratégia otimiza principalmente as consultas de listagem por estado e os fluxos de autocomplete.

### Docker Multi-Container

A aplicação é executada em dois containers independentes:

* **Frontend:** aplicação React/Vite
* **Backend:** API Node.js/Express

O arquivo SQLite é disponibilizado por meio de volume, garantindo portabilidade e permitindo que todo o ambiente seja iniciado sem configuração manual adicional.

---

## 🔮 Melhorias Futuras

Com mais tempo disponível, algumas melhorias poderiam ser implementadas:

* **Cache em memória**, utilizando Redis ou LRU Cache, para reduzir o custo de consultas repetidas e massivas.
* **Paginação ou virtualização** no frontend para tornar a navegação mais fluida em listas extensas.
* **Gráficos interativos**, como gráficos de pizza para distribuição por sexo e gráficos de barras para comparação entre população urbana e rural, utilizando bibliotecas como Chart.js ou Recharts.
