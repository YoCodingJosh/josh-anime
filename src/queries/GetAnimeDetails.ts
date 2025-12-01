import { queryOptions } from "@tanstack/react-query";

import { getAnimeById } from "@/server/animeById";

export const createAnimeDetailsQuery = (animeId: number) =>
  queryOptions({
    queryKey: ["anime", animeId],
    queryFn: async () => getAnimeById({ data: animeId }),
  });
