/**
 * Configuração do Jest para o projeto cinemais-api.
 * Integra testes automatizados com suporte a TypeScript via ts-jest.
 */

const { createDefaultPreset } = require("ts-jest"); // Configuração padrão do ts-jest
const tsJestTransformCfg = createDefaultPreset().transform; // Transformação para arquivos TypeScript

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node", // Ambiente de testes Node.js
  transform: {
    ...tsJestTransformCfg, // Suporte a TypeScript nos testes
  },
};