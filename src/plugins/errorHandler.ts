import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

export default function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      // Usando método `.format()` para evitar problemas de tipagem
      return reply.status(400).send({
        error: 'Erro de validação',
        details: error.format(), // ✅ funciona sem cast
      });
    }

    // Qualquer outro erro
    console.error(error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  });
}
