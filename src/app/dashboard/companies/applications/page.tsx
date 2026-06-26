'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Users, Briefcase, Building2, Calendar, Mail, FileText, AlertCircle, Loader2 } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

interface Application {
  id: string
  status: string
  coverLetter: string | null
  resumeUrl: string | null
  appliedAt: string
  job: {
    id: string
    title: string
    slug: string
    company: {
      id: string
      name: string
      logo: string | null
    }
  }
  candidate: {
    id: string
    name: string
    email: string
    image: string | null
  }
}

export default function CompanyApplicationsPage() {
  const { data: session, status } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/applications')
        .then((res) => res.json())
        .then((data) => {
          setApplications(data.applications || [])
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
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesion para ver postulantes</h2>
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

  const getStatusBadge = (status: string) => {
    const config: Record<string, { label: string; variant: 'secondary' | 'info' | 'success' | 'destructive' | 'outline' }> = {
      PENDING: { label: 'Pendiente', variant: 'secondary' },
      REVIEWING: { label: 'En revision', variant: 'info' },
      ACCEPTED: { label: 'Aceptado', variant: 'success' },
      REJECTED: { label: 'Rechazado', variant: 'destructive' },
      WITHDRAWN: { label: 'Retirado', variant: 'outline' },
    }
    const c = config[status] || config.PENDING
    return <Badge variant={c.variant}>{c.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        <section className="bg-white border-b border-gray-200 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Postulantes</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Postulantes</h1>
          <p className="text-gray-600">
            {applications.length} {applications.length === 1 ? 'postulante' : 'postulantes'} en total
          </p>
        </section>

        {applications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay postulantes aun</h2>
            <p className="text-gray-500 mb-6">Cuando alguien se postule a tus ofertas, aparecera aqui.</p>
            <Link href="/dashboard/companies/jobs/create">
              <Button>Crear oferta</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <article key={app.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <Avatar
                    src={app.candidate.image}
                    alt={app.candidate.name}
                    fallback={app.candidate.name.charAt(0)}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{app.candidate.name}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {app.candidate.email}
                        </p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        {app.job.title}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatRelativeTime(app.appliedAt)}
                      </span>
                    </div>

                    {app.coverLetter && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          <strong>Carta de presentacion:</strong> {app.coverLetter}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                      <Link href={`/jobs/${app.job.slug}`} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Ver oferta
                      </Link>
                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Descargar CV
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
