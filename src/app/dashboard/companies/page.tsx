'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Briefcase, Users, Building2, Plus, Calendar, MapPin, Globe, AlertCircle, Loader2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface CompanyJob {
  id: string
  title: string
  slug: string
  location: string
  jobType: string
  experienceLevel: string
  publishedAt: string | null
  status: string
  _count: { applications: number }
}

interface CompanyProfile {
  id: string
  name: string
  description: string | null
  location: string | null
  size: string | null
  industry: string | null
  verified: boolean
}

export default function CompanyDashboardPage() {
  const { data: session, status } = useSession()
  const [jobs, setJobs] = useState<CompanyJob[]>([])
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      Promise.all([
        fetch('/api/jobs').then((r) => r.json()),
        fetch('/api/profile').then((r) => r.json()),
      ])
        .then(([jobsData, profileData]) => {
          setJobs(jobsData.jobs || [])
          setProfile(profileData.profile)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesion para acceder al panel de empresa</h2>
            <Link href="/auth/login">
              <Button>Iniciar sesion</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userRole = (session.user as any)?.role
  if (userRole !== 'COMPANY') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Acceso no autorizado</h2>
            <p className="text-gray-500 mb-6">Esta pagina es solo para empresas.</p>
            <Link href="/dashboard/applications">
              <Button>Ir al panel de estudiante</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getJobTypeLabel = (type: string) => {
    const config: Record<string, string> = {
      internship: 'Pasantia',
      'full-time': 'Full-time',
      'part-time': 'Part-time',
      contract: 'Contrato',
    }
    return config[type] || type
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        <section className="bg-white border-b border-gray-200 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
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
        </section>

        {profile && (
          <section className="mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start gap-6">
                <Avatar src={profile.name} alt={profile.name} fallback={profile.name.charAt(0)} size="xl" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-semibold text-gray-900">{profile.name}</h2>
                    {profile.verified && (
                      <Badge variant="success" className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        Verificada
                      </Badge>
                    )}
                  </div>
                  {profile.description && <p className="text-gray-600 mb-4">{profile.description}</p>}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    {profile.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </span>
                    )}
                    {profile.size && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        {profile.size} empleados
                      </span>
                    )}
                    {profile.industry && (
                      <span className="flex items-center gap-1.5">
                        <Globe className="h-4 w-4" />
                        {profile.industry}
                      </span>
                    )}
                  </div>
                </div>
                <Link href="/dashboard/companies/profile">
                  <Button variant="outline">Editar perfil</Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mis ofertas de trabajo</h2>
            <p className="text-sm text-gray-500">
              {jobs.length} {jobs.length === 1 ? 'oferta' : 'ofertas'}
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No tienes ofertas aun</h2>
              <p className="text-gray-500 mb-6">Crea tu primera oferta de trabajo para empezar a recibir postulantes.</p>
              <Link href="/dashboard/companies/jobs/create">
                <Button>Crear primera oferta</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <article key={job.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Link href={`/jobs/${job.slug}`} className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1">
                        {job.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">{job.location}</p>
                    </div>
                    <Badge variant={job.status === 'PUBLISHED' ? 'success' : 'secondary'}>
                      {job.status === 'PUBLISHED' ? 'Publicada' : 'Borrador'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    {job.publishedAt && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDate(job.publishedAt)}
                      </span>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {getJobTypeLabel(job.jobType)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      {job._count.applications} {job._count.applications === 1 ? 'postulante' : 'postulantes'}
                    </div>
                    <Link href={`/jobs/${job.slug}`} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Ver detalles
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
