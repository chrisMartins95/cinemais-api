// src/routes/favoriteRoutes.ts
import { FastifyInstance } from 'fastify';
import { addFavorite, listFavorites, removeFavorite } from '../controllers/favoriteController';

export default async function favoriteRoutes(fastify: FastifyInstance) {
  fastify.post('/:userId/favorites', addFavorite);
  fastify.get('/:userId/favorites', listFavorites);
  fastify.delete('/:userId/favorites/:mediaId', removeFavorite);
}
