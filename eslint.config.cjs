/**
 * Configuração do ESLint para o projeto cinemais-api.
 * Define regras, plugins e parser para garantir padronização e qualidade do código TypeScript/JavaScript.
 */

const globals = require("globals"); // Variáveis globais do Node.js
const tsPlugin = require("@typescript-eslint/eslint-plugin"); // Regras específicas para TypeScript
const prettierPlugin = require("eslint-plugin-prettier"); // Integração com Prettier
const tsParser = require("@typescript-eslint/parser"); // Parser para sintaxe TypeScript

module.exports = [
  {
    files: ["**/*.{ts,js}"], // Aplica regras para arquivos TypeScript e JavaScript
    languageOptions: {
      parser: tsParser,
      globals: globals.node
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error", // Erro se não seguir o padrão Prettier
      "@typescript-eslint/no-unused-vars": "warn", // Alerta para variáveis não utilizadas
      "@typescript-eslint/explicit-function-return-type": "off", // Não exige tipo de retorno explícito em funções
      "no-console": "warn" // Alerta ao utilizar console.log
    }
  }
];
