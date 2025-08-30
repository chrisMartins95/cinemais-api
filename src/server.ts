// src/server.ts
import Fastify from "fastify";
import mediaRoutes from "./routes/mediaRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

export async function buildServer() {
  const server = Fastify({ logger: false }); // logger false para testes limpos
  // registrar rotas
  server.register(mediaRoutes, { prefix: "/media" });
  server.register(favoriteRoutes, { prefix: "/users" });
  return server;
}

// Se iniciarmos diretamente (node src/server.ts), sobe o servidor
if (require.main === module) {
  (async () => {
    const server = await buildServer();
    try {
      await server.listen({ port: 3000 });
      console.log("Servidor rodando em http://localhost:3000");
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  })();
}
