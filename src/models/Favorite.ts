/**
 * Modelo Favorite utilizado na API cinemais.
 * Representa o relacionamento entre um usuário e uma mídia favorita.
 */

export interface Favorite {
  id?: number;      // Identificador único (opcional)
  userId: string;   // ID do usuário
  mediaId: number;  // ID da mídia favorita
}
