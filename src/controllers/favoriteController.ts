// src/controllers/favoriteController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/database";
import { Media } from "../models/Media";

type AddFavoriteBody = { mediaId: number };

// POST /users/:userId/favorites
export const addFavorite = (req: FastifyRequest<{ Params: { userId: string }, Body: AddFavoriteBody }>, reply: FastifyReply) => {
  const { userId } = req.params;
  const { mediaId } = req.body;

  if (typeof mediaId !== "number") {
    reply.code(400).send({ message: "mediaId deve ser number" });
    return;
  }

  // 1) Verificar se a mídia existe
  db.get("SELECT * FROM media WHERE id = ?", [mediaId], (err, mediaRow) => {
    if (err) {
      reply.code(500).send({ message: "Erro ao buscar mídia", error: err.message });
      return;
    }
    if (!mediaRow) {
      reply.code(404).send({ message: "Mídia não encontrada" });
      return;
    }

    // 2) Verificar se já está favoritado
    db.get("SELECT * FROM favorites WHERE userId = ? AND mediaId = ?", [userId, mediaId], (err2, favRow) => {
      if (err2) {
        reply.code(500).send({ message: "Erro ao verificar favoritos", error: err2.message });
        return;
      }
      if (favRow) {
        // Já favoritado: conforme spec, podemos retornar 204 No Content
        reply.code(204).send();
        return;
      }

      // 3) Inserir favorito
      db.run("INSERT INTO favorites (userId, mediaId) VALUES (?, ?)", [userId, mediaId], function (err3) {
        if (err3) {
          reply.code(500).send({ message: "Erro ao adicionar favorito", error: err3.message });
          return;
        }
        // Sucesso: spec pede 204 No Content
        reply.code(204).send();
      });
    });
  });
};

// GET /users/:userId/favorites
export const listFavorites = (req: FastifyRequest<{ Params: { userId: string } }>, reply: FastifyReply) => {
  const { userId } = req.params;

  // Busca os objetos completos do catálogo (JOIN)
  const sql = `
    SELECT m.* FROM media m
    INNER JOIN favorites f ON m.id = f.mediaId
    WHERE f.userId = ?
  `;
  db.all(sql, [userId], (err, rows: Media[]) => {
    if (err) {
      reply.code(500).send({ message: "Erro ao listar favoritos", error: err.message });
      return;
    }
    reply.send(rows); // array de objetos Media (pode ser vazio)
  });
};

// DELETE /users/:userId/favorites/:mediaId
export const removeFavorite = (req: FastifyRequest<{ Params: { userId: string, mediaId: string } }>, reply: FastifyReply) => {
  const { userId, mediaId } = req.params;

  db.run("DELETE FROM favorites WHERE userId = ? AND mediaId = ?", [userId, mediaId], function (err) {
    if (err) {
      reply.code(500).send({ message: "Erro ao remover favorito", error: err.message });
      return;
    }
    if (this.changes === 0) {
      // Não encontrou nada para remover
      reply.code(404).send({ message: "Favorito não encontrado" });
      return;
    }
    reply.code(204).send(); // Remoção bem-sucedida
  });
};
