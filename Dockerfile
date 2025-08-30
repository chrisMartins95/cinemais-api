# 1. Usar Node 18 (não alpine)
FROM node:18

# 2. Diretório de trabalho
WORKDIR /usr/src/app

# 3. Copiar só package.json e package-lock.json
COPY package*.json ./

# 4. Instalar dependências dentro do container
RUN npm install

# 5. Copiar o restante do código (sem node_modules)
COPY . .

# 6. Compilar TypeScript (gera dist/)
RUN npm run build

# 7. Expor porta
EXPOSE 3000

# 8. Rodar app
CMD ["node", "dist/server.js"]
