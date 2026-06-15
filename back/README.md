# Player Hub Server

API CRUD de jogadores de futebol usando JavaScript, Express, SQLite e SQL puro.

## Banco de dados

O banco fica em um arquivo local:

```text
banco.db
```

As tabelas sao criadas automaticamente em:

```text
src/db.js
```

Esse arquivo ativa `PRAGMA foreign_keys = ON` e cria as tabelas `times` e `jogadores`, com `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL` e `UNIQUE`.

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Inicie a API:

```bash
npm run dev
```

Ao iniciar, o SQLite cria o arquivo `banco.db` se ele ainda nao existir.

## Rotas

### Times

| Metodo | URL | Descricao |
| --- | --- | --- |
| GET | `/times` | Lista todos os times |
| POST | `/times` | Cria um time |
| GET | `/times/:id` | Busca um time |
| PUT | `/times/:id` | Atualiza um time |
| DELETE | `/times/:id` | Remove um time |

### Jogadores

| Metodo | URL | Descricao |
| --- | --- | --- |
| GET | `/jogadores` | Lista todos os jogadores |
| GET | `/jogadores?timeId=1` | Lista jogadores de um time |
| POST | `/jogadores` | Cria um jogador |
| GET | `/jogadores/:id` | Busca um jogador |
| PUT | `/jogadores/:id` | Atualiza um jogador |
| DELETE | `/jogadores/:id` | Remove um jogador |

## Teste de persistencia

1. Crie um time e um jogador pela API.
2. Pare o servidor.
3. Rode `npm run dev` novamente.
4. Acesse `GET /times` e `GET /jogadores`.

Se os dados ainda aparecerem, a persistencia no SQLite esta funcionando.
