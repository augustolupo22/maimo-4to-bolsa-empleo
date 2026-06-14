import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { JobCard } from '@/components/job'
import { JobFilters } from '@/components/job'
import { formatSalary } from '@/lib/utils'
import { Briefcase, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Ofertas de empleo',
  description: 'Explora cientos de ofertas de pasantías, trabajos part-time y primeras experiencias laborales para estudiantes.',
}

interface JobsPageProps {
  searchParams: Promise<{
    search?: string
    jobType?: string
    remoteType?: string
    experienceLevel?: string
    location?: string
    page?: string
  }>
}

const ITEMS_PER_PAGE = 12

async function getJobs(searchParams: {
  search?: string
  jobType?: string
  remoteType?: string
  experienceLevel?: string
  location?: string
  page?: string
}) {
  const page = parseInt(searchParams.page || '1')
  const skip = (page - 1) * ITEMS_PER_PAGE

  const where: any = {
    status: 'PUBLISHED',
  }

  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search, mode: 'insensitive' } },
      { description: { contains: searchParams.search, mode: 'insensitive' } },
      { company: { name: { contains: searchParams.search, mode: 'insensitive' } } },
      { skills: { contains: searchParams.search, mode: 'insensitive' } },
    ]
  }

  if (searchParams.jobType) {
    where.jobType = searchParams.jobType
  }

  if (searchParams.remoteType) {
    where.remoteType = searchParams.remoteType
  }

  if (searchParams.experienceLevel) {
    where.experienceLevel = searchParams.experienceLevel
  }

  if (searchParams.location) {
    where.location = { contains: searchParams.location, mode: 'insensitive' }
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            location: true,
            size: true,
            industry: true,
            verified: true,
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.job.count({ where }),
  ])

  return {
    jobs,
    total,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    currentPage: page,
  }
}

function JobSkeleton() {
  return (
    <article className="border border-gray-200 rounded-lg p-5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-3" />
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          <div className="flex gap-2 mt-3">
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <div className="h-6 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded" />
      </div>
    </article>
  )
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const resolvedParams = await searchParams
  const { jobs, total, totalPages, currentPage } = await getJobs(resolvedParams)

  const hasFilters = resolvedParams.search || resolvedParams.jobType || resolvedParams.remoteType || resolvedParams.experienceLevel || resolvedParams.location

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-main py-12 lg:py-16">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Ofertas</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Ofertas de empleo</h1>
            <p className="text-lg text-gray-600">
              {total} {total === 1 ? 'oferta' : 'ofertas'} encontradas
              {hasFilters && <span className="text-primary font-medium"> con tus filtros</span>}
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="section">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <JobFilters initialParams={resolvedParams} />
            </aside>

            {/* Jobs List */}
            <div className="flex-1 min-w-0">
              {jobs.length === 0 ? (
                <div className="text-center py-16">
                  <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron ofertas</h2>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    {hasFilters
                      ? 'Intenta ajustar tus filtros o ampliar tu búsqueda.'
                      : 'Aún no hay ofertas publicadas. Vuelve pronto.'}
                  </p>
                  {hasFilters && (
                    <Button variant="outline" onClick={() => window.location.href = '/jobs'}>
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job as any} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginación">
                      {currentPage > 1 && (
                        <Link
                          href={`/jobs?${new URLSearchParams({ ...resolvedParams, page: String(currentPage - 1) }).toString()}`}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Anterior
                        </Link>
                      )}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum: number
                          if (totalPages <= 5) {
                            pageNum = i + 1
                          } else if (currentPage <= 3) {
                            pageNum = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i
                          } else {
                            pageNum = currentPage - 2 + i
                          }
                          return (
                            <Link
                              key={pageNum}
                              href={`/jobs?${new URLSearchParams({ ...resolvedParams, page: String(pageNum) }).toString()}`}
                              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                pageNum === currentPage
                                  ? 'bg-primary text-white'
                                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </Link>
                          )
                        })}
                      </div>
                      {currentPage < totalPages && (
                        <Link
                          href={`/jobs?${new URLSearchParams({ ...resolvedParams, page: String(currentPage + 1) }).toString()}`}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Siguiente
                        </Link>
                      )}
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white section">
        <div className="container-main text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">¿No encontraste lo que buscabas?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Regístrate gratis y recibe alertas personalizadas cuando se publiquen ofertas que coincidan con tu perfil.
          </p>
          <Link href="/auth/register?role=student">
            <Button size="lg" variant="secondary" className="gap-2" rightIcon={<Briefcase className="h-4 w-4" />}>
              Crear alertas de empleo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}