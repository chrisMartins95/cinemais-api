/**
 * Define as rotas de favoritos para a API Fastify.
 * Conecta as rotas aos controllers responsáveis por adicionar, listar e remover favoritos.
 */

import { FastifyInstance } from 'fastify';
import { addFavorite, listFavorites, removeFavorite } from '../controllers/favoriteController';

export default async function favoriteRoutes(fastify: FastifyInstance) {
  fastify.post('/:userId/favorites', addFavorite); // Adiciona mídia aos favoritos do usuário
  fastify.get('/:userId/favorites', listFavorites); // Lista mídias favoritas do usuário
  fastify.delete('/:userId/favorites/:mediaId', removeFavorite); // Remove mídia dos favoritos do usuário
}
