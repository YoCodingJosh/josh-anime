import { getFavoriteAnimeList } from '@/queries/GetFavoriteAnimeList'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AnimeCard } from '@/components/AnimeCard'

export const Route = createFileRoute('/catalog/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(getFavoriteAnimeList)
  },
})

function RouteComponent() {
  const { data: animeList } = useSuspenseQuery(getFavoriteAnimeList);

  const nav = useNavigate();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {animeList?.map((anime) => {
          // use english title if available
          const normalizedTitle = anime.alternative_titles.en || anime.title;

          return (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={normalizedTitle}
              posterUrl={anime.main_picture.large}
              episodes={anime.num_episodes}
              genres={anime.genres.map((genre) => genre.name)}
              startSeason={`${anime.start_season.season} ${anime.start_season.year}`}
              score={anime.mean}
              jpTitle={anime.alternative_titles.ja}
              onClick={() => nav({ to: `/catalog/${anime.id}` })}
            />
          )
        })}
      </div>
    </div>
  )
}
