import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatSalary, formatDate, formatRelativeTime } from '@/lib/utils'
import { MapPin, Calendar, Briefcase, Building2, Tag, DollarSign, Heart, Share2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Badge } from '@/components/ui'
import { JobApplicationForm } from './JobApplicationForm'

interface JobDetailPageProps {
  params: Promise<{ slug: string }>
}

async function getJob(slug: string) {
  return prisma.job.findUnique({
    where: { slug, status: 'PUBLISHED' },
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
          description: true,
          website: true,
          linkedin: true,
        },
      },
    },
  })
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const job = await getJob(resolvedParams.slug)
  
  if (!job) {
    return { title: 'Oferta no encontrada' }
  }

  return {
    title: job.title,
    description: job.description.slice(0, 160),
    openGraph: {
      title: `${job.title} en ${job.company.name}`,
      description: job.description.slice(0, 160),
      type: 'article',
    },
  }
}

function JobSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-5 w-1/2 bg-gray-200 rounded" />
          <div className="flex gap-4">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="h-32 bg-gray-200 rounded" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded" />
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const resolvedParams = await params
  const job = await getJob(resolvedParams.slug)

  if (!job) {
    notFound()
  }

  const skills = job.skills ? JSON.parse(job.skills) : []
  const isRemote = job.remoteType === 'remote'
  const isHybrid = job.remoteType === 'hybrid'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-main py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-primary transition-colors">Ofertas</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">{job.title}</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="section">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Details - Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company & Title */}
              <article className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <Avatar src={job.company.logo} alt={job.company.name} fallback={job.company.name} size="xl" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {job.company.verified && (
                        <Badge variant="success" className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          Verificada
                        </Badge>
                      )}
                      <Badge variant="info">
                        {job.jobType === 'internship' ? 'Pasantía' : job.jobType}
                      </Badge>
                      {isRemote && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Remoto
                        </Badge>
                      )}
                      {isHybrid && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Híbrido
                        </Badge>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{job.title}</h1>
                    <Link
                      href={`/companies/${job.company.id}`}
                      className="text-lg text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
                    >
                      {job.company.name}
                      {job.company.verified && <Building2 className="h-4 w-4 text-green-500" />}
                    </Link>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {isRemote ? 'Remoto' : job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Publicada {formatRelativeTime(job.publishedAt || job.createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    {job.experienceLevel === 'student' ? 'Estudiante (sin experiencia)' : job.experienceLevel}
                  </span>
                  {(job.salaryMin || job.salaryMax) && (
                    <span className="flex items-center gap-1.5 font-medium text-gray-900">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      {formatSalary(job.salaryMin ?? undefined, job.salaryMax ?? undefined, job.salaryCurrency, job.salaryPeriod)}
                    </span>
                  )}
                </div>

                {skills.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </article>

              {/* Description */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del puesto</h2>
                <div className="prose prose-gray max-w-none whitespace-pre-wrap text-gray-700">
                  {job.description}
                </div>
              </section>

              {/* Requirements */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Requisitos
                </h2>
                <div className="prose prose-gray max-w-none whitespace-pre-wrap text-gray-700">
                  {job.requirements}
                </div>
              </section>

              {/* Benefits */}
              {job.benefits && (
                <section className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Beneficios
                  </h2>
                  <div className="prose prose-gray max-w-none whitespace-pre-wrap text-gray-700">
                    {job.benefits}
                  </div>
                </section>
              )}

              {/* Company Info */}
              <section className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sobre la empresa</h2>
                <div className="flex items-start gap-4">
                  <Avatar src={job.company.logo} alt={job.company.name} fallback={job.company.name} size="xl" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{job.company.name}</h3>
                    {job.company.industry && (
                      <p className="text-sm text-gray-500 mt-1">{job.company.industry}</p>
                    )}
                    {job.company.description && (
                      <p className="mt-4 text-gray-700 line-clamp-4">{job.company.description}</p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      {job.company.size && (
                        <span className="flex items-center gap-1.5">
                          <Building2 className="h-4 w-4" />
                          {job.company.size} empleados
                        </span>
                      )}
                      {job.company.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {job.company.location}
                        </span>
                      )}
                    </div>
                    {job.company.website && (
                      <Link
                        href={job.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        Sitio web
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar - Apply */}
            <div className="lg:col-span-1">
              <JobApplicationForm job={job as any} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}