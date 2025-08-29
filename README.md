🎬 Cinemais API

Este é um projeto desenvolvido como parte de um desafio técnico para praticar Node.js com TypeScript.
O objetivo é criar uma API para catálogo de filmes e séries, onde também será possível gerenciar favoritos de usuários.

No momento, o projeto está em fase inicial. Já configurei o ambiente com Node.js, TypeScript e Fastify e estruturei as pastas principais.

📂 Estrutura do Projeto

A estrutura de diretórios está organizada assim:

src/
  routes/        -> rotas da aplicação
  controllers/   -> lógica das rotas
  models/        -> modelos/dados
  db/            -> conexão ou mock em memória
  tests/         -> testes unitários
  server.ts      -> inicialização do servidor Fastify

🛠️ Tecnologias usadas

Node.js

TypeScript

Fastify

ts-node-dev (para rodar em modo desenvolvimento)

🚀 Como rodar o projeto (até aqui)

Clonar o repositório:

git clone https://github.com/SEU-USUARIO/cinemais-api.git
cd cinemais-api


Instalar dependências:

npm install


Rodar em modo desenvolvimento:

npm run dev

✅ Próximos passos

Implementar os endpoints do catálogo de mídias (/media)

Criar os endpoints de favoritos (/users/:userId/favorites)

Escrever os primeiros testes unitários

👉 Esse README ainda é inicial e será atualizado conforme o projeto avançar.