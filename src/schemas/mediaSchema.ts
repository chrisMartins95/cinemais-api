/**
 * Schema de validação para criação de mídia na API cinemais.
 * Garante que os dados enviados estejam no formato correto usando Zod.
 */

import { z } from 'zod';

export const createMediaSchema = z.object({
  title: z.string().min(1, 'Title é obrigatório'), // Título obrigatório
  description: z.string().min(1, 'Description é obrigatória'), // Descrição obrigatória
  type: z.enum(['movie', 'series'], "Type deve ser 'movie' ou 'series'"), // Tipo deve ser 'movie' ou 'series'
  releaseYear: z.number().int().gte(1800, 'Ano inválido'), // Ano deve ser inteiro >= 1800
  genre: z.string().min(1, 'Genre é obrigatório'), // Gênero obrigatório
});

export type CreateMediaInput = z.infer<typeof createMediaSchema>; // Tipo TypeScript gerado a partir do schema
