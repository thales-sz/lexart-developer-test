# Lexart Developer Test

## Descrição do Projeto

Bem-vindo ao Lexart Developer Test! Este projeto é uma oportunidade para demonstrar suas habilidades como desenvolvedor fullstack. Aqui, você encontrará uma API completa para gerenciar produtos, incluindo operações como seleção, adição e exclusão de produtos. Além disso, há um sistema de autenticação e autorização para criar novos usuários.

## Funcionalidades

- **Seleção de Produtos:** A API permite a busca e visualização de produtos disponíveis.
- **Adição de Produtos:** É possível adicionar novos produtos à base de dados através da API.
- **Exclusão de Produtos:** Produtos indesejados podem ser removidos do sistema facilmente.
- **Autenticação:** Para utilizar as funcionalidades da API, é necessário autenticar-se.
- **Autorização:** Além da autenticação, há um sistema de autorização para proteger operações sensíveis.

## Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Express
  - NestJs
  - Postgres Vercel

- **Frontend:**
  - React
  - Axios
  - NextJS

## Como Utilizar

### Pré-requisitos
- Node.js

### Passos

1. Clone o repositório do projeto:
   ```sh
   git clone https://github.com/thales-sz/lexart-developer-test.git
   ```

2. Inicie a aplicação backend:
   ```sh
   cd lexart-developer-test/server
   docker compose up -d
   ```

3. Acesse a aplicação em:
   ```sh
   https://lexart-developer-test.vercel.app/home
   ```

4. Caso queira fazer requisições diretamente para a API, utilize o endereço:
   ```sh
    http://localhost:9999
   ```


## API Endpoints

- `GET /products`: Retorna todos os produtos disponíveis.
- `POST /products`: Adiciona um novo produto.
- `PUT /products/:id`: Atualiza um produto pelo ID.
- `DELETE /products/:id`: Remove um produto pelo ID.

- `POST /auth/signup`: Cria um novo usuário.
- `POST /auth/signin`: Autentica um usuário.

Para utilizar esses endpoints, é necessário autenticação.

## Conclusão

O Lexart Developer Test é uma oportunidade para demonstrar suas habilidades em desenvolvimento fullstack. Sinta-se à vontade para explorar e expandir este projeto conforme necessário. Boa sorte!