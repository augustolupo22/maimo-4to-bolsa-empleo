'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Briefcase, Calendar, MapPin, Building2, Download, Eye, XCircle, CheckCircle, AlertCircle, Clock, FileText } from 'lucide-react'
import { formatRelativeTime, formatDate } from '@/lib/utils'

export default function StudentApplicationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 w-48 bg-gray-200 rounded" />
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
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
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesión para ver tus postulaciones</h2>
            <p className="text-gray-500 mb-6">Debes iniciar sesión para ver y gestionar tus aplicaciones a ofertas de trabajo.</p>
            <Link href="/auth/login">
              <Button>Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userRole = (session.user as any)?.role
  const isStudent = userRole === 'STUDENT'

  if (!isStudent) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Acceso no autorizado</h2>
            <p className="text-gray-500 mb-6">Esta página es solo para estudiantes. Si eres una empresa, visita tu panel de empresa.</p>
            <Link href="/dashboard/companies">
              <Button>Ir al panel de empresa</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Mock data - in a real app, this would come from an API
  const applications = [
    {
      id: '1',
      job: {
        id: 'job1',
        title: 'Pasantía Frontend React',
        slug: 'pasantia-frontend-react',
        company: {
          id: 'company1',
          name: 'TechCorp SA',
          logo: null,
          location: 'Buenos Aires (Híbrido)',
          verified: true,
        },
        jobType: 'internship',
        location: 'Buenos Aires (Híbrido)',
        experienceLevel: 'student',
        salaryMin: 150000,
        salaryMax: 200000,
        salaryCurrency: 'ARS',
        salaryPeriod: 'month',
        remoteType: 'hybrid',
        publishedAt: new Date(Date.now() - 86400000),
      },
      coverLetter: 'Estoy muy interesado en esta pasantía porque me apasiona el desarrollo frontend y creo que esta empresa es el lugar perfecto para empezar mi carrera.',
      resumeUrl: 'https://drive.google.com/file/d/1',
      status: 'PENDING',
      appliedAt: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      job: {
        id: 'job2',
        title: 'Junior Backend Developer',
        slug: 'junior-backend-developer',
        company: {
          id: 'company1',
          name: 'TechCorp SA',
          logo: null,
          location: 'Remoto',
          verified: true,
        },
        jobType: 'full-time',
        location: 'Remoto',
        experienceLevel: 'entry',
        salaryMin: 800000,
        salaryMax: 1200000,
        salaryCurrency: 'ARS',
        salaryPeriod: 'month',
        remoteType: 'remote',
        publishedAt: new Date(Date.now() - 172800000),
      },
      coverLetter: null,
      resumeUrl: null,
      status: 'REVIEWING',
      appliedAt: new Date(Date.now() - 172800000),
    },
    {
      id: '3',
      job: {
        id: 'job3',
        title: 'Pasantía UX/UI Design',
        slug: 'pasantia-ux-ui-design',
        company: {
          id: 'company2',
          name: 'DesignStudio',
          logo: null,
          location: 'Córdoba (Presencial)',
          verified: false,
        },
        jobType: 'internship',
        location: 'Córdoba (Presencial)',
        experienceLevel: 'student',
        salaryMin: 120000,
        salaryMax: 150000,
        salaryCurrency: 'ARS',
        salaryPeriod: 'month',
        remoteType: 'onsite',
        publishedAt: new Date(Date.now() - 259200000),
      },
      coverLetter: 'Mi experiencia en diseño de interfaces y mi pasión por la experiencia de usuario me hacen un candidato ideal para esta pasantía.',
      resumeUrl: 'https://drive.google.com/file/d/2',
      status: 'ACCEPTED',
      appliedAt: new Date(Date.now() - 259200000),
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock },
      REVIEWING: { label: 'En revisión', variant: 'info' as const, icon: AlertCircle },
      ACCEPTED: { label: 'Aceptado', variant: 'success' as const, icon: CheckCircle },
      REJECTED: { label: 'Rechazado', variant: 'destructive' as const, icon: XCircle },
      WITHDRAWN: { label: 'Retirado', variant: 'outline' as const, icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
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
              <span className="text-gray-900 font-medium">Mis postulaciones</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis postulaciones</h1>
            <p className="text-gray-600">
              {applications.length} {applications.length === 1 ? 'postulación' : 'postulaciones'}
            </p>
          </div>
        </section>

        {/* Applications List */}
        <section>
          {applications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No tienes postulaciones aún</h2>
              <p className="text-gray-500 mb-6">Explora ofertas de trabajo y postúlate para empezar tu carrera profesional.</p>
              <Link href="/jobs">
                <Button>Explorar ofertas</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {applications.map((application) => (
                <article key={application.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={application.job.company.logo}
                      alt={application.job.company.name}
                      fallback={application.job.company.name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <Link
                            href={`/jobs/${application.job.slug}`}
                            className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors"
                          >
                            {application.job.title}
                          </Link>
                          <Link
                            href={`/companies/${application.job.company.id}`}
                            className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
                          >
                            {application.job.company.name}
                            {application.job.company.verified && (
                              <Building2 className="h-4 w-4 text-green-500" />
                            )}
                          </Link>
                        </div>
                        {getStatusBadge(application.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {application.job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {formatRelativeTime(application.appliedAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" />
                          {application.job.jobType === 'internship' ? 'Pasantía' : application.job.jobType}
                        </span>
                        {(application.job.salaryMin || application.job.salaryMax) && (
                          <span className="flex items-center gap-1.5 font-medium text-gray-900">
                            ${application.job.salaryMin?.toLocaleString()} - ${application.job.salaryMax?.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {application.coverLetter && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700 line-clamp-2">
                            <strong>Carta de presentación:</strong> {application.coverLetter}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          {application.resumeUrl && (
                            <span className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              CV adjunto
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/jobs/${application.job.slug}`}
                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            Ver detalles →
                          </Link>
                          {application.status === 'PENDING' && (
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Cancelar postulación
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
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