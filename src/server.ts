import Fastify from "fastify";
import mediaRoutes from "./routes/mediaRoutes"; // <-- importar rotas

const app = Fastify({ logger: true });

// Rota raiz
app.get("/", async () => {
  return { message: "API Cinemais rodando 🚀" };
});

// Registrar rotas de mídia
app.register(mediaRoutes, { prefix: "/media" });

// Iniciar servidor
const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Servidor rodando em http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

