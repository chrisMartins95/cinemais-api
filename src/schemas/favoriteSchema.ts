import { z } from "zod";

// Para adicionar favorito
export const addFavoriteSchema = z.object({
  mediaId: z.number().int().positive("mediaId deve ser um número positivo"),
});

// Tipo TypeScript inferido do schema
export type AddFavoriteInput = z.infer<typeof addFavoriteSchema>;
