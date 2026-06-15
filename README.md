# Player Hub

Sistema CRUD para cadastro de times e jogadores de futebol.

## Objetivo

O projeto implementa uma API em Node.js e Express com persistencia em SQLite. A API permite cadastrar, listar, buscar, atualizar e remover times e jogadores.

## Tecnologias

- Node.js
- Express
- SQLite
- JavaScript com ES Modules

## Estrutura principal

```text
back/
  src/
    controllers/
    services/
    models/
    routes/
    db.js
    app.js
    server.js
```

## Banco de dados

O arquivo [back/src/db.js](back/src/db.js) cria e configura o banco SQLite.

Configuracoes e restricoes implementadas:

- `PRAGMA foreign_keys = ON`
- `PRIMARY KEY` nas tabelas `times` e `jogadores`
- `FOREIGN KEY` de `jogadores.timeId` para `times.id`
- campos obrigatorios com `NOT NULL`
- `UNIQUE` para nome de time
- `UNIQUE` para numero de camisa por time

O banco local gerado pela aplicacao se chama:

```text
back/banco.db
```

Esse arquivo esta no `.gitignore` e nao deve ser enviado para o repositorio.

## Como executar

Entre na pasta do backend:

```bash
cd back
```

Instale as dependencias:

```bash
npm install
```

Inicie a API:

```bash
npm run dev
```

A API ficara disponivel em:

```text
http://localhost:3000
```

## Rotas

### Times

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/times` | Lista todos os times |
| POST | `/times` | Cria um time |
| GET | `/times/:id` | Busca um time por id |
| PUT | `/times/:id` | Atualiza um time |
| DELETE | `/times/:id` | Remove um time |

### Jogadores

| Metodo | Rota | Descricao |
| --- | --- | --- |
| GET | `/jogadores` | Lista todos os jogadores |
| GET | `/jogadores?timeId=1` | Lista jogadores de um time |
| POST | `/jogadores` | Cria um jogador |
| GET | `/jogadores/:id` | Busca um jogador por id |
| PUT | `/jogadores/:id` | Atualiza um jogador |
| DELETE | `/jogadores/:id` | Remove um jogador |

## Persistencia

Para confirmar a persistencia:

1. Inicie a API.
2. Cadastre um time e um jogador.
3. Pare o servidor.
4. Inicie a API novamente.
5. Consulte `/times` e `/jogadores`.

Se os dados ainda aparecerem, o SQLite esta persistindo corretamente no arquivo `banco.db`.

## Autor

Wedne Morais de Araujo
