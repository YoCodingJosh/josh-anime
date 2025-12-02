import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { createAnimeDetailsQuery } from '@/queries/GetAnimeDetails'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { InfoIcon } from 'lucide-react'

export const Route = createFileRoute('/catalog/$animeId/')({
  loader: async ({ params: { animeId }, context }) => {
    const data = await context.queryClient.ensureQueryData(
      createAnimeDetailsQuery(Number(animeId))
    )

    return { data }
  },
  component: RouteComponent,
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.data.title }] : undefined,
  }),
})

function RouteComponent() {
  const { animeId } = Route.useParams();

  const { data } = useSuspenseQuery(
    createAnimeDetailsQuery(Number(animeId))
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="shrink-0 mx-auto md:mx-0">
          <img 
            src={data.main_picture.large} 
            alt={data.title}
            className="w-full max-w-xs md:max-w-sm rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold wrap-break-word">{data.title}</h1>
          {data.alternative_titles.en && (
            <h2 className="text-lg sm:text-xl italic text-gray-600 wrap-break-word">
              {data.alternative_titles.en}
            </h2>
          )}
          {data.alternative_titles.ja && (
            <h3 className="text-base sm:text-lg italic text-gray-500 wrap-break-word">
              ({data.alternative_titles.ja})
            </h3>
          )}
          <div className="mt-4 space-y-2 text-sm sm:text-base">
            <p>
              <span className="font-semibold">Episodes:</span> {data.num_episodes ?? 'Unknown'}
            </p>
            <p>
              <span className="font-semibold">Season Aired:</span> <span className="capitalize">{data.start_season && `${data.start_season.season} ${data.start_season.year}`}</span>
            </p>
            <p>
              <span className="font-semibold">Score:</span> {data.mean ?? 'N/A'}
            </p>
            <p className="wrap-break-word">
              <span className="font-semibold">Studio{data.studios.length !== 1 ? 's' : ''}:</span>{' '}
              {data.studios.map((studio) => studio.name).join(', ') || 'N/A'}
            </p>
            {data.producers && (
              <p className="wrap-break-word">
                <span className="font-semibold">Producer{data.producers.length !== 1 ? 's' : ''}:</span>{' '}
                {data.producers.map((producer) => producer.name).join(', ') || 'N/A'}
              </p>
            )}
          </div>
          {data.background && (
            <Alert className="mt-4" variant='default'>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Background</AlertTitle>
              <AlertDescription className="text-sm">{data.background}</AlertDescription>
            </Alert>
          )}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold">Synopsis</h3>
            <p className="text-sm sm:text-base leading-relaxed">{data.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
