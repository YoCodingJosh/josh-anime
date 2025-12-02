import { createServerFn } from '@tanstack/react-start'

import __favoritesList from '@/data/anime.json'
import { FavoriteAnimeList } from '@/schemas/FavoriteAnimeList';
import { sleep } from '@/lib/utils';
import { env } from 'cloudflare:workers';
import { LightweightAnimeDetailsSchema, LightweightFields } from '@/schemas/AnimeDetails';

/** MAL anime id array */
const { my_favorites: favoritesList }: FavoriteAnimeList = __favoritesList as FavoriteAnimeList;

export const getFavoriteAnime = createServerFn({
  method: 'GET',
}).handler(async ({ signal }) => {
  const promises = favoritesList.map(async (animeId, index) => {
    // Rate limit by adding a delay between requests
    if (index > 0) await sleep(index + 10);

    return fetch(`https://api.myanimelist.net/v2/anime/${animeId}?fields=${LightweightFields}`, {
      headers: {
        'X-MAL-CLIENT-ID': `${env.MAL_CLIENT_ID}`,
      },
      signal,
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch anime details for ID ${animeId}`);
      }

      return LightweightAnimeDetailsSchema.parseAsync(await res.json());
    });
  });

  return await Promise.all(promises);
});
