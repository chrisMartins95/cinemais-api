/**
 * Modelo Media utilizado na API cinemais.
 * Representa uma mídia (filme ou série) com seus principais atributos.
 */

export interface Media {
  id?: number; // Identificador único (opcional)
  title: string; // Título da mídia
  description?: string; // Descrição da mídia (opcional)
  type: 'movie' | 'series'; // Tipo da mídia: filme ou série
  releaseYear?: number; // Ano de lançamento (opcional)
  genre?: string; // Gênero da mídia
}
