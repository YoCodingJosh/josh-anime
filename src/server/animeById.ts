import { createServerFn } from '@tanstack/react-start'

import __favoritesList from '@/data/anime.json'
import { FavoriteAnimeList } from '@/schemas/FavoriteAnimeList';
import { env } from 'cloudflare:workers';
import { DetailedAnimeDetailsSchema, DetailedFields } from '@/schemas/AnimeDetails';

const { my_favorites: favoritesList }: FavoriteAnimeList = __favoritesList as FavoriteAnimeList;

export const getAnimeById = createServerFn({
  method: 'GET',
}).inputValidator((d: number) => d).handler(async ({ data }) => {
  if (!favoritesList.includes(data)) {
    throw new Error(`Anime ID ${data} is not in the favorites list`);
  }

  const res = await fetch(`https://api.myanimelist.net/v2/anime/${data}?fields=${DetailedFields}`, {
    headers: {
      'X-MAL-CLIENT-ID': `${env.MAL_CLIENT_ID}`,
    },
  });

  return DetailedAnimeDetailsSchema.parseAsync(await res.json());
});
