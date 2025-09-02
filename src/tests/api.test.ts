/**
 * Testes automatizados dos endpoints da API cinemais.
 * Garante o funcionamento correto das rotas de mídia e favoritos usando Fastify em memória.
 */

import { buildServer } from '../server';
import { db, clearTables, closeDb } from '../db/database';
import type { FastifyInstance } from 'fastify';

let server: FastifyInstance;

// Inicializa o servidor antes de todos os testes
beforeAll(async () => {
  server = await buildServer();
  await server.ready();
});

// Finaliza o servidor e o banco após todos os testes
afterAll(async () => {
  await server.close();
  closeDb();
});

// Limpa as tabelas do banco antes de cada teste
beforeEach((done) => {
  clearTables(() => done());
});

describe('Media endpoints', () => {
  // Testa criação de mídia
  it('POST /media cria uma mídia e retorna 201 com o objeto', async () => {
    const payload = {
      title: 'Matrix',
      description: 'Filme de ficção científica',
      type: 'movie',
      releaseYear: 1999,
      genre: 'Sci-Fi',
    };

    const res = await server.inject({
      method: 'POST',
      url: '/media',
      payload,
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(payload.title);
  });

  // Testa listagem de mídias
  it('GET /media lista as mídias criadas', async () => {
    // Cria uma mídia
    const createRes = await server.inject({
      method: 'POST',
      url: '/media',
      payload: {
        title: 'Toy Story',
        description: 'Animação',
        type: 'movie',
        releaseYear: 1995,
        genre: 'Animation',
      },
    });
    expect(createRes.statusCode).toBe(201);

    // Lista as mídias
    const listRes = await server.inject({ method: 'GET', url: '/media' });
    expect(listRes.statusCode).toBe(200);
    const arr = JSON.parse(listRes.body);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(1);
    expect(arr[0].title).toBe('Toy Story');
  });

  // Testa busca por mídia inexistente
  it('GET /media/:id retorna 404 quando não existe', async () => {
    const res = await server.inject({ method: 'GET', url: '/media/9999' });
    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.body);
    expect(body).toHaveProperty('message', 'Mídia não encontrada');
  });
});

describe('Favorites endpoints', () => {
  // Testa adicionar favorito
  it('POST /users/:userId/favorites adiciona um favorito (204)', async () => {
    // Cria uma mídia
    const createRes = await server.inject({
      method: 'POST',
      url: '/media',
      payload: {
        title: 'Inception',
        description: 'Thriller',
        type: 'movie',
        releaseYear: 2010,
        genre: 'Sci-Fi',
      },
    });
    const media = JSON.parse(createRes.body);

    // Adiciona favorito
    const favRes = await server.inject({
      method: 'POST',
      url: `/users/alice/favorites`,
      payload: { mediaId: media.id },
    });

    expect(favRes.statusCode).toBe(204);
  });

  // Testa listagem de favoritos
  it('GET /users/:userId/favorites retorna mídias completas', async () => {
    // Cria uma mídia
    const createRes = await server.inject({
      method: 'POST',
      url: '/media',
      payload: {
        title: 'Parasite',
        description: 'Drama',
        type: 'movie',
        releaseYear: 2019,
        genre: 'Drama',
      },
    });
    const media = JSON.parse(createRes.body);

    // Adiciona favorito
    await server.inject({
      method: 'POST',
      url: `/users/bob/favorites`,
      payload: { mediaId: media.id },
    });

    // Lista favoritos
    const listRes = await server.inject({
      method: 'GET',
      url: `/users/bob/favorites`,
    });

    expect(listRes.statusCode).toBe(200);
    const arr = JSON.parse(listRes.body);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(1);
    expect(arr[0].id).toBe(media.id);
    expect(arr[0].title).toBe('Parasite');
  });

  // Testa remoção de favorito
  it('DELETE /users/:userId/favorites/:mediaId remove favorito', async () => {
    // Cria uma mídia
    const createRes = await server.inject({
      method: 'POST',
      url: '/media',
      payload: {
        title: 'The Matrix Reloaded',
        description: 'Sequência',
        type: 'movie',
        releaseYear: 2003,
        genre: 'Sci-Fi',
      },
    });
    const media = JSON.parse(createRes.body);

    // Adiciona favorito
    await server.inject({
      method: 'POST',
      url: `/users/carol/favorites`,
      payload: { mediaId: media.id },
    });

    // Remove favorito
    const delRes = await server.inject({
      method: 'DELETE',
      url: `/users/carol/favorites/${media.id}`,
    });
    expect(delRes.statusCode).toBe(204);

    // Confirma que não há mais favoritos
    const listRes = await server.inject({ method: 'GET', url: `/users/carol/favorites` });
    expect(listRes.statusCode).toBe(200);
    const arr = JSON.parse(listRes.body);
    expect(arr.length).toBe(0);
  });

  // Testa adicionar favorito com mídia inexistente
  it('POST /users/:userId/favorites com media inexistente retorna 404', async () => {
    const res = await server.inject({
      method: 'POST',
      url: `/users/dan/favorites`,
      payload: { mediaId: 9999 },
    });
    expect(res.statusCode).toBe(404);
    const body = JSON.parse(res.body);
    expect(body).toHaveProperty('message', 'Mídia não encontrada');
  });
});
