import { EmptyState } from '@/components/empty-state'
import { PageContent } from '@/components/page-content'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { formatState } from '@/lib/formatters'
import {
  ArrowRight,
  CalendarCheck2Icon,
  CalendarCheckIcon,
  CalendarClockIcon,
  CalendarDaysIcon,
  MapPinnedIcon,
} from 'lucide-react'
import Link from 'next/link'
import { Overview, OverviewProps } from './_components/overview'

const longWeekday = (date: Date | null) => {
  return date?.toLocaleDateString('pt-BR', { weekday: 'short' }) || ''
}

export default async function Page() {
  const dateNextWeek = new Date(new Date().setDate(new Date().getDate() + 7))
  const dateCurrentMonth = new Date(new Date().setMonth(new Date().getMonth()))

  const [programmed, inProgress, finished, preProgrammed] = await Promise.all([
    db.trip.count({
      where: {
        draft: false,
        status: 'scheduled',
        createdAt: { lte: dateCurrentMonth },
      },
    }),
    db.trip.count({
      where: {
        draft: false,
        status: { in: ['loaded', 'departure', 'terminal', 'unloaded'] },
        createdAt: { lte: dateCurrentMonth },
      },
    }),
    db.trip.count({
      where: {
        draft: false,
        status: 'finished',
        createdAt: { lte: dateCurrentMonth },
      },
    }),
    db.trip.count({
      where: { draft: true, createdAt: { lte: dateCurrentMonth } },
    }),
  ])

  const tripsNextWeek = await db.trip.findMany({
    where: {
      draft: false,
      departedAt: { not: null },
      arrivedAt: { not: null },
      OR: [
        { departedAt: { gte: new Date(), lte: dateNextWeek } },
        { arrivedAt: { gte: new Date(), lte: dateNextWeek } },
      ],
    },
  })

  const tripsInProgress = await db.trip.findMany({
    where: {
      draft: false,
      status: { in: ['loaded', 'departure', 'terminal', 'unloaded'] },
    },
    include: {
      truck: { include: { vehicle: true } },
      semiTrailer: { include: { trailers: { include: { vehicle: true } } } },
      origin: { include: { company: { include: { address: true } } } },
      destination: { include: { company: { include: { address: true } } } },
    },
    take: 5,
  })

  const dataOverview = () => {
    const dataCurrent = new Date()

    const data: OverviewProps = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(new Date().setDate(dataCurrent.getDate() + i))

      let weekday = longWeekday(date)

      const departures = tripsNextWeek.filter(
        ({ departedAt }) => longWeekday(departedAt) === weekday,
      ).length

      const arrivals = tripsNextWeek.filter(
        ({ arrivedAt }) => longWeekday(arrivedAt) === weekday,
      ).length

      weekday += ` ${date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })}`

      data.push({ weekday, Saídas: departures, Entregas: arrivals })
    }

    return data
  }

  return (
    <PageContent>
      <header>
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-center">
            <h2 className="text-2xl font-bold sm:truncate sm:text-3xl sm:tracking-tight">
              Início
            </h2>

            <div>
              <Badge variant="secondary" className="ms-2">
                Beta
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <Separator />

      <main className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <div className="flex items-start justify-between space-x-4 p-6">
              <div>
                <div className="text-sm font-medium">Progamados</div>
                <div className="text-2xl font-bold">{programmed}</div>
              </div>

              <div className="rounded-lg bg-secondary p-2">
                <CalendarDaysIcon className="size-6 text-muted-foreground" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between space-x-4 p-6">
              <div>
                <div className="text-sm font-medium">Em progresso</div>
                <div className="text-2xl font-bold">{inProgress}</div>
              </div>

              <div className="rounded-lg bg-secondary p-2">
                <CalendarClockIcon className="size-6 text-muted-foreground" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between space-x-4 p-6">
              <div>
                <div className="text-sm font-medium">Finalizados</div>
                <div className="text-2xl font-bold">{finished}</div>
              </div>

              <div className="rounded-lg bg-secondary p-2">
                <CalendarCheckIcon className="size-6 text-muted-foreground" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between space-x-4 p-6">
              <div>
                <div className="text-sm font-medium">Pré-progamados</div>
                <div className="text-2xl font-bold">{preProgrammed}</div>
              </div>

              <div className="rounded-lg bg-secondary p-2">
                <CalendarCheck2Icon className="size-6 text-muted-foreground" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Visão geral</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={dataOverview()} />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Viagens</CardTitle>
              <CardDescription>
                Visulize as viagens em andamento
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-8">
                {!tripsInProgress.length && (
                  <EmptyState href="/trips/new">
                    <div className="py-16">
                      <MapPinnedIcon
                        strokeWidth={1.2}
                        size={42}
                        className="mx-auto text-muted-foreground"
                      />

                      <span className="mt-2 block text-sm font-semibold">
                        Programar uma nova viagem
                      </span>
                    </div>
                  </EmptyState>
                )}

                {tripsInProgress.map((trip, index) => (
                  <Link key={index} href={'/trips/' + trip.id}>
                    <div className="group space-y-2 text-xs uppercase hover:cursor-pointer">
                      <div className="flex justify-between space-x-6 *:rounded-md *:bg-secondary *:p-1">
                        <p className="-ms-1 text-nowrap">
                          {trip.truck?.vehicle.licensePlate}
                        </p>
                        <p className="-me-1 line-clamp-1">
                          {trip.semiTrailer?.trailers
                            .map(({ vehicle }) => vehicle?.licensePlate)
                            .join(' | ')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex-1 *:line-clamp-1">
                          <p className="font-medium leading-none">
                            {trip.origin?.company.tradeName ||
                              trip.origin?.company.name}
                          </p>
                          <p className="text-muted-foreground">
                            {[
                              trip.origin?.company.address?.city,
                              formatState(trip.origin?.company.address?.state),
                            ]
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        </div>

                        <ArrowRight className="size-4 text-muted-foreground group-hover:size-6" />

                        <div className="flex-1 *:line-clamp-1">
                          <p className="font-medium leading-none">
                            {trip.destination?.company.tradeName ||
                              trip.destination?.company.name}
                          </p>
                          <p className="text-muted-foreground">
                            {[
                              trip.destination?.company.address?.city,
                              formatState(
                                trip.destination?.company.address?.state,
                              ),
                            ]
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageContent>
  )
}
