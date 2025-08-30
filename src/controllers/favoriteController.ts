import { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db/database';
import { addFavoriteSchema } from '../schemas/favoriteSchema';

// Adicionar mídia aos favoritos
export const addFavorite = (
  req: FastifyRequest<{ Params: { userId: string }; Body: any }>,
  reply: FastifyReply,
) => {
  const { userId } = req.params;

  // Validação do body (lança ZodError se inválido)
  const { mediaId } = addFavoriteSchema.parse(req.body);

  // Verificar se a mídia existe
  db.get('SELECT * FROM media WHERE id = ?', [mediaId], (err, mediaRow) => {
    if (err) throw new Error(`Erro ao buscar mídia: ${err.message}`);
    if (!mediaRow) {
      const error = new Error('Mídia não encontrada');
      (error as any).statusCode = 404; // para o errorHandler retornar 404
      throw error;
    }

    // Verificar se já está favoritado
    db.get(
      'SELECT * FROM favorites WHERE userId = ? AND mediaId = ?',
      [userId, mediaId],
      (err2, favRow) => {
        if (err2) throw new Error(`Erro ao verificar favoritos: ${err2.message}`);
        if (favRow) {
          reply.code(204).send(); // já está favoritado
          return;
        }

        // Inserir favorito
        db.run(
          'INSERT INTO favorites (userId, mediaId) VALUES (?, ?)',
          [userId, mediaId],
          function (err3) {
            if (err3) throw new Error(`Erro ao adicionar favorito: ${err3.message}`);
            reply.code(204).send();
          },
        );
      },
    );
  });
};
