import { FastifyInstance } from 'fastify';
import { getAllMedia, createMedia, getMediaById } from '../controllers/mediaController';

export default async function mediaRoutes(fastify: FastifyInstance) {
  fastify.get('/', getAllMedia);
  fastify.post('/', createMedia);
  fastify.get('/:id', getMediaById);
}
