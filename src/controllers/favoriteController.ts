import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/database";
import { addFavoriteSchema } from "../schemas/favoriteSchema";

export const addFavorite = (req: FastifyRequest<{ Params: { userId: string }, Body: any }>, reply: FastifyReply) => {
  const { userId } = req.params;

  // ✅ Validação com Zod
  let mediaId: number;
  try {
    mediaId = addFavoriteSchema.parse(req.body).mediaId;
  } catch (err) {
    // Zod lança ZodError se algo estiver errado
    return reply.code(400).send({ error: err instanceof Error ? err.message : "Dados inválidos" });
  }

  // 1) Verificar se a mídia existe
  db.get("SELECT * FROM media WHERE id = ?", [mediaId], (err, mediaRow) => {
    if (err) return reply.code(500).send({ message: "Erro ao buscar mídia", error: err.message });
    if (!mediaRow) return reply.code(404).send({ message: "Mídia não encontrada" });

    // 2) Verificar se já está favoritado
    db.get("SELECT * FROM favorites WHERE userId = ? AND mediaId = ?", [userId, mediaId], (err2, favRow) => {
      if (err2) return reply.code(500).send({ message: "Erro ao verificar favoritos", error: err2.message });
      if (favRow) return reply.code(204).send();

      // 3) Inserir favorito
      db.run("INSERT INTO favorites (userId, mediaId) VALUES (?, ?)", [userId, mediaId], function (err3) {
        if (err3) return reply.code(500).send({ message: "Erro ao adicionar favorito", error: err3.message });
        reply.code(204).send();
      });
    });
  });
};
