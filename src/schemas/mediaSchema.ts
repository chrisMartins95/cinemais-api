import { z } from 'zod';

export const createMediaSchema = z.object({
  title: z.string().min(1, 'Title é obrigatório'),
  description: z.string().min(1, 'Description é obrigatória'),
  type: z.enum(['movie', 'series'], "Type deve ser 'movie' ou 'series'"),
  releaseYear: z.number().int().gte(1800, 'Ano inválido'),
  genre: z.string().min(1, 'Genre é obrigatório'),
});

export type CreateMediaInput = z.infer<typeof createMediaSchema>;
