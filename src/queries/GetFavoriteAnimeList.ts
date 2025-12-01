import { getFavoriteAnime } from "@/server/favoriteAnime";
import { queryOptions } from "@tanstack/react-query";

export const getFavoriteAnimeList = queryOptions({
  queryKey: ["anime", 'favorites'],
  queryFn: () => getFavoriteAnime(),
});
