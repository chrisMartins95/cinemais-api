import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/database";
import { Media } from "../models/Media";
import { createMediaSchema, CreateMediaInput } from "../schemas/mediaSchema";

// Listar todas as mídias
export const getAllMedia = (req: FastifyRequest, reply: FastifyReply) => {
  db.all("SELECT * FROM media", [], (err, rows) => {
    if (err) {
      reply.code(500).send({ message: "Erro ao buscar mídias", error: err.message });
      return;
    }
    reply.send(rows);
  });
};

// Criar nova mídia com validação
export const createMedia = (req: FastifyRequest<{ Body: CreateMediaInput }>, reply: FastifyReply) => {
  try {
    // 1️⃣ Valida o body usando Zod
    const validatedData = createMediaSchema.parse(req.body);

    // 2️⃣ Desestrutura os dados validados
    const { title, description, type, releaseYear, genre } = validatedData;

    // 3️⃣ Inserção no SQLite
    db.run(
      `INSERT INTO media (title, description, type, releaseYear, genre) VALUES (?, ?, ?, ?, ?)`,
      [title, description, type, releaseYear, genre],
      function (err) {
        if (err) {
          reply.code(500).send({ message: "Erro ao criar mídia", error: err.message });
          return;
        }

        const newMedia: Media = {
          id: this.lastID,
          title,
          description,
          type,
          releaseYear,
          genre,
        };

        reply.code(201).send(newMedia);
      }
    );
  } catch (err) {
    // 4️⃣ Retorna erro de validação caso falhe
    if (err instanceof Error) {
      reply.code(400).send({ message: "Erro de validação", error: err.message });
    }
  }
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
