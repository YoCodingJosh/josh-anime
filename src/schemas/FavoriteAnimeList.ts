import { z } from "zod";

export const FavoriteAnimeListSchema = z.object({
  my_favorites: z.array(z.number()),
});

export type FavoriteAnimeList = z.infer<typeof FavoriteAnimeListSchema>;
