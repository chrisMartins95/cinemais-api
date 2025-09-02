# Dockerfile para o projeto cinemais-api.
# Define o ambiente, instala dependências, compila o TypeScript e inicia o servidor.

# Usar imagem oficial do Node.js 18
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências do projeto
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Compila o TypeScript (gera dist/)
RUN npm run build

# Expõe a porta 3000 para acesso externo
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "dist/server.js"]
