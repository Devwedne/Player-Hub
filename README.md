# ⚽ PlayerHub - Sistema de Cadastro de Jogadores

## 📌 Descrição do Projeto

O projeto consiste em uma Single Page Application (SPA) desenvolvida para a disciplina de Programação Web.

A aplicação terá como objetivo realizar o cadastro de jogadores de futebol, permitindo adicionar, visualizar, editar e remover jogadores do sistema através de uma interface simples e intuitiva.

O sistema foi pensado para fugir dos exemplos tradicionais de cadastro de livros, utilizando uma temática esportiva.

---

# 🚀 Tecnologias Utilizadas

- HTML5
- CSS3
- Bootstrap
- TypeScript
- Node.js
- Express.js

---

# 📂 Modelagem do Projeto

## 🧩 Classe Abstrata: Pessoa

A classe `Pessoa` será utilizada como abstração principal do sistema, servindo como base para outras entidades.

### Atributos

- nome
- idade

### Métodos

- exibirInformacoes()

---

## 🧩 Classe: Jogador

A classe `Jogador` herda da classe `Pessoa`.

### Atributos

- posicao
- numeroCamisa
- nacionalidade
- time

### Métodos

- cadastrar()
- editar()
- excluir()

---

## 🧩 Classe: Time

Responsável por representar um clube de futebol.

### Atributos

- nome
- pais
- treinador

### Métodos

- adicionarJogador()
- removerJogador()
- listarJogadores()

---

# 🧠 Aplicação do SRP (Single Responsibility Principle)

Cada classe possui apenas uma responsabilidade no sistema:

- `Pessoa` → abstração de dados básicos de uma pessoa
- `Jogador` → gerenciamento de informações do jogador
- `Time` → gerenciamento de informações do clube

---

# 🔄 Aplicação do DIP (Dependency Inversion Principle)

O sistema utilizará abstrações para reduzir acoplamento entre as classes.

## Relação entre as classes

```text id="zq4l9e"
Pessoa (abstrata)
       ↑
       |
    Jogador
```

A classe `Jogador` depende da abstração `Pessoa`, permitindo reutilização e extensibilidade do sistema.

---

# 👨‍💻 Autor

Wedne Morais de Araújo
Curso de Ciência da Computação - UEPB
