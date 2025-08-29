import sqlite3 from "sqlite3";
import path from "path";

// Caminho do arquivo do banco
const dbPath = path.resolve(__dirname, "cinemais.db");

// Abrir banco de dados
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao SQLite:", err.message);
    return;
  }
  console.log("Conectado ao banco SQLite!");
});

// Criar tabela de mídias, se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    releaseYear INTEGER,
    genre TEXT
  )
`, (err) => {
  if (err) {
    console.error("Erro ao criar tabela de mídias:", err.message);
  } else {
    console.log("Tabela de mídias pronta!");
  }
});

// Criar tabela de favoritos
db.run(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    mediaId INTEGER NOT NULL,
    FOREIGN KEY (mediaId) REFERENCES media (id)
  )
`, (err) => {
  if (err) {
    console.error("Erro ao criar tabela de favoritos:", err.message);
  } else {
    console.log("Tabela de favoritos pronta!");
  }
});
