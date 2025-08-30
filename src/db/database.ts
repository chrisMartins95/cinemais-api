// src/db/database.ts
import sqlite3 from "sqlite3";
import path from "path";

const isTest = process.env.NODE_ENV === "test";
const dbPath = isTest ? ":memory:" : path.resolve(__dirname, "cinemais.db");

// Conectar ao banco SQLite
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao SQLite:", err.message);
    return;
  }
  console.log(`Conectado ao banco SQLite (${isTest ? "in-memory" : dbPath})`);
});

// Habilitar foreign keys
db.run(`PRAGMA foreign_keys = ON;`, (err) => {
  if (err) {
    console.error("Erro habilitando foreign_keys:", err.message);
  }
});

// Criar tabelas (media + favorites)
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      releaseYear INTEGER,
      genre TEXT
    )`,
    (err) => {
      if (err) console.error("Erro ao criar tabela media:", err.message);
    }
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      mediaId INTEGER NOT NULL,
      UNIQUE(userId, mediaId),
      FOREIGN KEY(mediaId) REFERENCES media(id) ON DELETE CASCADE
    )`,
    (err) => {
      if (err) console.error("Erro ao criar tabela favorites:", err.message);
    }
  );
});

// Helpers para testes
export const clearTables = (cb?: () => void) => {
  db.serialize(() => {
    db.run("DELETE FROM favorites");
    db.run("DELETE FROM media", cb);
  });
};

export const closeDb = (cb?: (err?: Error | null) => void) => {
  db.close((err) => {
    if (err) console.error("Erro fechando DB:", err.message);
    if (cb) cb(err ?? null);
  });
};
