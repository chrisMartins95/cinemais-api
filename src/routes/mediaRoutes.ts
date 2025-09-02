/**
 * Define as rotas relacionadas à mídia para a API Fastify.
 * Conecta as rotas aos controllers responsáveis por cada operação.
 */

import { FastifyInstance } from 'fastify';
import { getAllMedia, createMedia, getMediaById } from '../controllers/mediaController';

export default async function mediaRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllMedia);      // Lista todas as mídias
  fastify.post('/', createMedia);     // Cria uma nova mídia
  fastify.get('/:id', getMediaById);  // Busca mídia por ID
}
