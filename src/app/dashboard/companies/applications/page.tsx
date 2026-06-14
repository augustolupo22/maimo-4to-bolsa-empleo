'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Users, Briefcase, Building2, Calendar, MapPin, Download, FileText, Mail, Phone, Award, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'
import { formatDate, formatRelativeTime } from '@/lib/utils'

export default function CompanyApplicationsPage() {
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
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesión para ver postulantes</h2>
            <p className="text-gray-500 mb-6">Debes iniciar sesión para ver y gestionar los postulantes de tus ofertas.</p>
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
  const applications = [
    {
      id: 'app1',
      job: {
        id: 'job1',
        title: 'Pasantía Frontend React',
        slug: 'pasantia-frontend-react',
        company: {
          id: 'company1',
          name: 'TechCorp SA',
          logo: null,
        },
      },
      candidate: {
        id: 'cand1',
        name: 'María García',
        email: 'maria.garcia@email.com',
        image: null,
        university: 'Universidad Maimónides',
        career: 'Ingeniería en Sistemas',
        year: '3er año',
      },
      coverLetter: 'Estoy muy interesada en esta pasantía porque me apasiona el desarrollo frontend y creo que esta empresa es el lugar perfecto para empezar mi carrera.',
      resumeUrl: 'https://drive.google.com/file/d/1',
      status: 'PENDING',
      appliedAt: new Date(Date.now() - 86400000),
    },
    {
      id: 'app2',
      job: {
        id: 'job2',
        title: 'Junior Backend Developer',
        slug: 'junior-backend-developer',
        company: {
          id: 'company1',
          name: 'TechCorp SA',
          logo: null,
        },
      },
      candidate: {
        id: 'cand2',
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@email.com',
        image: null,
        university: 'Universidad Maimónides',
        career: 'Ingeniería en Sistemas',
        year: '4to año',
      },
      coverLetter: null,
      resumeUrl: 'https://drive.google.com/file/d/2',
      status: 'REVIEWING',
      appliedAt: new Date(Date.now() - 172800000),
    },
    {
      id: 'app3',
      job: {
        id: 'job3',
        title: 'Pasantía UX/UI Design',
        slug: 'pasantia-ux-ui-design',
        company: {
          id: 'company2',
          name: 'DesignStudio',
          logo: null,
        },
      },
      candidate: {
        id: 'cand3',
        name: 'Ana Martínez',
        email: 'ana.martinez@email.com',
        image: null,
        university: 'Universidad Maimónides',
        career: 'Diseño Gráfico',
        year: '2do año',
      },
      coverLetter: 'Mi experiencia en diseño de interfaces y mi pasión por la experiencia de usuario me hacen un candidato ideal para esta pasantía.',
      resumeUrl: 'https://drive.google.com/file/d/3',
      status: 'ACCEPTED',
      appliedAt: new Date(Date.now() - 259200000),
    },
    {
      id: 'app4',
      job: {
        id: 'job1',
        title: 'Pasantía Frontend React',
        slug: 'pasantia-frontend-react',
        company: {
          id: 'company1',
          name: 'TechCorp SA',
          logo: null,
        },
      },
      candidate: {
        id: 'cand4',
        name: 'Luis Fernández',
        email: 'luis.fernandez@email.com',
        image: null,
        university: 'Universidad Maimónides',
        career: 'Ingeniería en Sistemas',
        year: '3er año',
      },
      coverLetter: 'Tengo experiencia en React y me gustaría aprender más sobre desarrollo frontend en una empresa líder.',
      resumeUrl: 'https://drive.google.com/file/d/4',
      status: 'REJECTED',
      appliedAt: new Date(Date.now() - 345600000),
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
              <span className="text-gray-900 font-medium">Postulantes</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Postulantes</h1>
            <p className="text-gray-600">
              {applications.length} {applications.length === 1 ? 'postulante' : 'postulantes'} en total
            </p>
          </div>
        </section>

        {/* Applications List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Todos los postulantes</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Briefcase className="h-4 w-4" />
              {applications.length} ofertas
            </div>
          </div>

          <div className="grid gap-6">
            {applications.map((application) => (
              <article key={application.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <Avatar
                    src={application.candidate.image}
                    alt={application.candidate.name}
                    fallback={application.candidate.name.charAt(0)}
                    size="lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <Link
                          href={`/dashboard/applications?candidate=${application.candidate.id}`}
                          className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors"
                        >
                          {application.candidate.name}
                        </Link>
                        <p className="text-gray-600">
                          {application.candidate.university} - {application.candidate.career} ({application.candidate.year})
                        </p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-4 w-4" />
                        {application.candidate.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatRelativeTime(application.appliedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        {application.job.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <Link
                        href={`/jobs/${application.job.slug}`}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Ver oferta →
                      </Link>
                      {application.resumeUrl && (
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          Descargar CV
                        </a>
                      )}
                      {application.coverLetter && (
                        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Ver carta de presentación
                        </button>
                      )}
                      <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Enviar mensaje
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}