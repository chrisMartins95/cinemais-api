import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/database";
import { Media } from "../models/Media";

// Listar todas as mídias
export const getAllMedia = (req: FastifyRequest, reply: FastifyReply) => {
  db.all("SELECT * FROM media", [], (err, rows) => {
    if (err) {
      reply.code(500).send({ message: "Erro ao buscar mídias", error: err.message });
      return;
    }
    reply.send(rows); // rows é um array de mídias
  });
};

// Criar nova mídia
export const createMedia = (req: FastifyRequest<{ Body: Media }>, reply: FastifyReply) => {
  const { title, description, type, releaseYear, genre } = req.body;

  db.run(
    `INSERT INTO media (title, description, type, releaseYear, genre) VALUES (?, ?, ?, ?, ?)`,
    [title, description, type, releaseYear, genre],
    function (err) {
      if (err) {
        reply.code(500).send({ message: "Erro ao criar mídia", error: err.message });
        return;
      }
      const newMedia: Media = {
        id: this.lastID, // this.lastID retorna o ID do registro criado
        title,
        description,
        type,
        releaseYear,
        genre,
      };
      reply.code(201).send(newMedia);
    }
  );
};

// Buscar mídia por ID
export const getMediaById = (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = req.params;

  db.get("SELECT * FROM media WHERE id = ?", [id], (err, row) => {
    if (err) {
      reply.code(500).send({ message: "Erro ao buscar mídia", error: err.message });
      return;
    }
    if (!row) {
      reply.code(404).send({ message: "Mídia não encontrada" });
      return;
    }
    reply.send(row);
  });
};
