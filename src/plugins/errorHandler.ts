/**
 * Plugin de tratamento de erros para o Fastify na API cinemais.
 * Lida com erros de validação do Zod e erros internos do servidor.
 */

import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

export default function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      // Retorna erro de validação com detalhes formatados
      return reply.status(400).send({
        error: 'Erro de validação',
        details: error.format(),
      });
    }

    // Retorna erro interno do servidor
    console.error(error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  });
}
