const globals = require("globals");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");
const tsParser = require("@typescript-eslint/parser"); // 👈 IMPORTAR O PARSER

module.exports = [
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tsParser,      // 👈 USAR O OBJETO, NÃO STRING
      globals: globals.node
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "no-console": "warn"
    }
  }
];
