import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/database";
import { Media } from "../models/Media";
import { createMediaSchema, CreateMediaInput } from "../schemas/mediaSchema";

// Listar todas as mídias
export const getAllMedia = (req: FastifyRequest, reply: FastifyReply) => {
  db.all("SELECT * FROM media", [], (err, rows) => {
    if (err) throw new Error(`Erro ao buscar mídias: ${err.message}`);
    reply.send(rows);
  });
};

// Criar nova mídia com validação
export const createMedia = (req: FastifyRequest<{ Body: CreateMediaInput }>, reply: FastifyReply) => {
  // Validação do body (lança ZodError se falhar)
  const validatedData = createMediaSchema.parse(req.body);

  const { title, description, type, releaseYear, genre } = validatedData;

  db.run(
    `INSERT INTO media (title, description, type, releaseYear, genre) VALUES (?, ?, ?, ?, ?)`,
    [title, description, type, releaseYear, genre],
    function (err) {
      if (err) throw new Error(`Erro ao criar mídia: ${err.message}`);

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
};

// Buscar mídia por ID
export const getMediaById = (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = req.params;

  db.get("SELECT * FROM media WHERE id = ?", [id], (err, row) => {
    if (err) throw new Error(`Erro ao buscar mídia: ${err.message}`);
    if (!row) {
      const error = new Error("Mídia não encontrada");
      (error as any).statusCode = 404; // statusCode personalizado para errorHandler
      throw error;
    }
    reply.send(row);
  });
};
