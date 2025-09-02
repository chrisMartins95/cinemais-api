/**
 * Schema de validação para adicionar favoritos na API cinemais.
 * Garante que o mediaId enviado seja um número inteiro positivo usando Zod.
 */

import { z } from 'zod';

// Schema para adicionar favorito
export const addFavoriteSchema = z.object({
  mediaId: z.number().int().positive('mediaId deve ser um número positivo'), // mediaId obrigatório e positivo
});

// Tipo TypeScript gerado a partir do schema
export type AddFavoriteInput = z.infer<typeof addFavoriteSchema>;
