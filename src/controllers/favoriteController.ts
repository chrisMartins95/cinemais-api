import { FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/database";
import { addFavoriteSchema } from "../schemas/favoriteSchema";

// Adicionar mídia aos favoritos
export const addFavorite = (
  req: FastifyRequest<{ Params: { userId: string }; Body: any }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  const { mediaId } = addFavoriteSchema.parse(req.body);

  db.get("SELECT * FROM media WHERE id = ?", [mediaId], (err, mediaRow) => {
    if (err) throw new Error(`Erro ao buscar mídia: ${err.message}`);
    if (!mediaRow) {
      const error = new Error("Mídia não encontrada");
      (error as any).statusCode = 404;
      throw error;
    }

    db.get(
      "SELECT * FROM favorites WHERE userId = ? AND mediaId = ?",
      [userId, mediaId],
      (err2, favRow) => {
        if (err2) throw new Error(`Erro ao verificar favoritos: ${err2.message}`);
        if (favRow) {
          reply.code(204).send();
          return;
        }

        db.run(
          "INSERT INTO favorites (userId, mediaId) VALUES (?, ?)",
          [userId, mediaId],
          function (err3) {
            if (err3) throw new Error(`Erro ao adicionar favorito: ${err3.message}`);
            reply.code(204).send();
          }
        );
      }
    );
  });
};

// Listar favoritos de um usuário
export const listFavorites = (
  req: FastifyRequest<{ Params: { userId: string } }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;

  db.all(
    "SELECT f.id, f.mediaId, m.title, m.type FROM favorites f JOIN media m ON f.mediaId = m.id WHERE f.userId = ?",
    [userId],
    (err, rows) => {
      if (err) {
        console.error(err);
        return reply.status(500).send({ error: "Erro ao buscar favoritos" });
      }
      return reply.send(rows);
    }
  );
};

// Remover mídia dos favoritos
export const removeFavorite = (
  req: FastifyRequest<{ Params: { userId: string; mediaId: string } }>,
  reply: FastifyReply
) => {
  const { userId, mediaId } = req.params;

  db.run(
    "DELETE FROM favorites WHERE userId = ? AND mediaId = ?",
    [userId, mediaId],
    function (err) {
      if (err) {
        console.error(err);
        return reply.status(500).send({ error: "Erro ao remover favorito" });
      }

      if (this.changes === 0) {
        return reply.status(404).send({ error: "Favorito não encontrado" });
      }

      return reply.code(204).send();
    }
  );
};
