/**
 * Inicializa e configura o servidor Fastify da API cinemais.
 * Registra plugins de tratamento de erro, rotas e inicia o servidor na porta 3000.
 */

import Fastify from 'fastify';
import mediaRoutes from './routes/mediaRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import errorHandler from './plugins/errorHandler';

export async function buildServer() {
  const server = Fastify({ logger: false }); // Logger desativado para testes limpos
  errorHandler(server); // Registra o handler de erros
  server.register(mediaRoutes, { prefix: '/media' }); // Rotas de mídia
  server.register(favoriteRoutes, { prefix: '/users' }); // Rotas de favoritos
  return server;
}

// Inicializa o servidor se o arquivo for executado diretamente
if (require.main === module) {
  (async () => {
    const server = await buildServer();
    try {
      await server.listen({ port: 3000 });
      console.log('Servidor rodando em http://localhost:3000');
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  })();
}
