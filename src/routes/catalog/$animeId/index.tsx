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
    <div>
      <img src={data.main_picture.large} alt={data.title} />
      <h1 className="text-2xl font-bold mt-4">{data.title}</h1>
      {data.alternative_titles.en && (
        <h2 className="text-xl italic text-gray-600">
          {data.alternative_titles.en}
        </h2>
      )}
      {data.background && (
        <Alert className="w-fit" variant='default'>
          <InfoIcon />
          <AlertTitle>Background</AlertTitle>
          <AlertDescription>{data.background}</AlertDescription>
        </Alert>
      )}
      <p className="mt-4">{data.synopsis}</p>
    </div>
  )
}
