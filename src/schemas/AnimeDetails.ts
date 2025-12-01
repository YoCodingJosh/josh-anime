import { z } from "zod";

export const LightweightFields = 'num_episodes,start_season,main_picture,genres,mean,alternative_titles'

export const LightweightAnimeDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  main_picture: z.object({
    medium: z.url(),
    large: z.url(),
  }),
  num_episodes: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  start_season: z.object({
    year: z.number(),
    season: z.enum(['winter', 'spring', 'summer', 'fall']),
  }),
  mean: z.number(),
  alternative_titles: z.object({
    synonyms: z.array(z.string()),
    en: z.string().min(1).optional().or(z.literal('')).transform(val => val || undefined),
    ja: z.string().min(1).optional().or(z.literal('')).transform(val => val || undefined),
  }),
});

export type LightweightAnimeDetails = z.infer<typeof LightweightAnimeDetailsSchema>;

export const DetailedFields = LightweightFields + ',synopsis,background,studios'

export const DetailedAnimeDetailsSchema = LightweightAnimeDetailsSchema.extend({
  synopsis: z.string().nullable(),
  background: z.string().nullable(),
  studios: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type DetailedAnimeDetails = z.infer<typeof DetailedAnimeDetailsSchema>;
  