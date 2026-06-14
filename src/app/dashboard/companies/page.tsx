'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Briefcase, Users, Building2, Plus, Calendar, MapPin, Eye, Download, FileText, AlertCircle, CheckCircle, Globe } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function CompanyDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesión para acceder al panel de empresa</h2>
            <p className="text-gray-500 mb-6">Debes iniciar sesión para gestionar tus ofertas de trabajo y ver postulantes.</p>
            <Link href="/auth/login">
              <Button>Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userRole = (session.user as any)?.role
  const isCompany = userRole === 'COMPANY'

  if (!isCompany) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Acceso no autorizado</h2>
            <p className="text-gray-500 mb-6">Esta página es solo para empresas. Si eres un estudiante, visita tu panel de estudiante.</p>
            <Link href="/dashboard/applications">
              <Button>Ir al panel de estudiante</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Mock data - in a real app, this would come from an API
  const company = {
    id: '1',
    userId: 'user1',
    name: 'TechCorp SA',
    description: 'Empresa líder en soluciones tecnológicas, especializada en desarrollo web y móvil.',
    logo: null,
    website: 'https://techcorp.example.com',
    location: 'Buenos Aires, Argentina',
    size: '51-200',
    industry: 'Tecnología',
    foundedYear: 2015,
    linkedin: 'https://linkedin.com/company/techcorp-sa',
    verified: true,
    createdAt: new Date('2023-01-01'),
  }

  const jobs = [
    {
      id: 'job1',
      title: 'Pasantía Frontend React',
      slug: 'pasantia-frontend-react',
      location: 'Buenos Aires (Híbrido)',
      jobType: 'internship',
      experienceLevel: 'student',
      publishedAt: new Date(Date.now() - 86400000),
      applicationsCount: 12,
      status: 'PUBLISHED',
    },
    {
      id: 'job2',
      title: 'Junior Backend Developer',
      slug: 'junior-backend-developer',
      location: 'Remoto',
      jobType: 'full-time',
      experienceLevel: 'entry',
      publishedAt: new Date(Date.now() - 172800000),
      applicationsCount: 8,
      status: 'PUBLISHED',
    },
    {
      id: 'job3',
      title: 'Pasantía UX/UI Design',
      slug: 'pasantia-ux-ui-design',
      location: 'Córdoba (Presencial)',
      jobType: 'internship',
      experienceLevel: 'student',
      publishedAt: new Date(Date.now() - 259200000),
      applicationsCount: 5,
      status: 'DRAFT',
    },
  ]

  const getJobTypeBadge = (type: string) => {
    const config = {
      internship: 'success' as const,
      'full-time': 'default' as const,
      'part-time': 'outline' as const,
      contract: 'secondary' as const,
    }
    return config[type as keyof typeof config] || 'default'
  }

  const getJobTypeLabel = (type: string) => {
    const config = {
      internship: 'Pasantía',
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      contract: 'Contrato',
    }
    return config[type as keyof typeof config] || 'Full-time'
  }

  const getStatusBadge = (status: string) => {
    const config = {
      PUBLISHED: 'success' as const,
      DRAFT: 'secondary' as const,
      CLOSED: 'destructive' as const,
      ARCHIVED: 'outline' as const,
    }
    return config[status as keyof typeof config] || 'success'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        {/* Page Header */}
        <section className="bg-white border-b border-gray-200 mb-8">
          <div className="container-main py-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Panel de empresa</span>
            </nav>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de empresa</h1>
                <p className="text-gray-600">Gestiona tus ofertas de trabajo y postulantes</p>
              </div>
              <Link href="/dashboard/companies/jobs/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva oferta
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Company Profile */}
        <section className="mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-6">
              <Avatar
                src={company.logo}
                alt={company.name}
                fallback={company.name.charAt(0)}
                size="xl"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-semibold text-gray-900">{company.name}</h2>
                  {company.verified && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      Verificada
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{company.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {company.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {company.size} empleados
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    Fundada en {company.foundedYear}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    {company.industry}
                  </span>
                </div>
              </div>
              <Link href="/dashboard/companies/profile">
                <Button variant="outline">Editar perfil</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Jobs Management */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mis ofertas de trabajo</h2>
            <p className="text-sm text-gray-500">
              {jobs.length} {jobs.length === 1 ? 'oferta' : 'ofertas'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article key={job.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1"
                    >
                      {job.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5">{job.location}</p>
                  </div>
                  <Badge variant={getStatusBadge(job.status)}>
                    {getStatusBadge(job.status)}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(job.publishedAt)}
                  </span>
                  <Badge variant={getJobTypeBadge(job.jobType)} className="text-xs">
                    {getJobTypeLabel(job.jobType)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    {job.applicationsCount} {job.applicationsCount === 1 ? 'postulante' : 'postulantes'}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Ver detalles →
                    </Link>
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                      Editar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No tienes ofertas aún</h2>
              <p className="text-gray-500 mb-6">Crea tu primera oferta de trabajo para empezar a recibir postulantes.</p>
              <Link href="/dashboard/companies/jobs/create">
                <Button>Crear primera oferta</Button>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}