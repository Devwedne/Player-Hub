# ⚽ PlayerHub - Sistema de Cadastro de Jogadores

## 📌 Descrição do Projeto

O projeto consiste em uma Single Page Application (SPA) desenvolvida para a disciplina de Programação Web.

A aplicação terá como objetivo realizar o cadastro de jogadores de futebol, permitindo adicionar, visualizar, editar e remover jogadores do sistema através de uma interface simples e intuitiva.

O sistema foi pensado para fugir dos exemplos tradicionais de cadastro de livros, utilizando uma temática esportiva.

---

# 🚀 Funcionalidades

- Cadastro de jogadores
- Listagem de jogadores cadastrados
- Edição de informações
- Exclusão de jogadores
- Busca por nome do jogador

---

# 🖥️ Tecnologias Utilizadas

- HTML5
- CSS3
- Bootstrap
- TypeScript
- Express.js
- Node.js

---

# 📂 Estrutura Inicial do Sistema

O sistema será composto inicialmente por três classes principais:

---

## 🧩 Classe: Jogador

Responsável por representar um jogador dentro do sistema.

### Atributos

- id
- nome
- idade
- posição
- número da camisa
- nacionalidade
- time

### Métodos

- cadastrar()
- editar()
- excluir()
- visualizar()

---

## 🧩 Classe: Time

Responsável por representar o clube associado ao jogador.

### Atributos

- id
- nome
- país
- treinador

### Métodos

- adicionarJogador()
- removerJogador()
- listarJogadores()

---

## 🧩 Classe: SistemaCadastro

Responsável pelo gerenciamento geral do sistema.

### Atributos

- listaJogadores
- listaTimes

### Métodos

- adicionarJogador()
- buscarJogador()
- atualizarJogador()
- deletarJogador()
- listarJogadores()

---

# 🎯 Objetivo Acadêmico

Aplicar os conceitos de desenvolvimento SPA, integração entre front-end e back-end, manipulação de rotas e consumo de API utilizando TypeScript e Express.js.

---

# 👨‍💻 Autor

Wedne Morais de Araújo
Curso de Ciência da Computação - UEPB
