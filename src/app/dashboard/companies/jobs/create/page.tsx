'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Select } from '@/components/ui'
import { Briefcase, Building2, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { JOB_TYPES, REMOTE_TYPES, EXPERIENCE_LEVELS, SALARY_PERIODS } from '@/lib/utils'

export default function CreateJobPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    benefits: '',
    location: '',
    remoteType: 'onsite',
    jobType: 'internship',
    experienceLevel: 'student',
    salaryMin: '',
    salaryMax: '',
    salaryCurrency: 'ARS',
    salaryPeriod: 'month',
    skills: '',
  })

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-24 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesion para publicar ofertas</h2>
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
            <p className="text-gray-500 mb-6">Solo las empresas pueden publicar ofertas.</p>
            <Link href="/dashboard/companies">
              <Button>Ir al panel de empresa</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const skillsArray = formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skills: skillsArray,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al publicar la oferta')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/companies')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al publicar la oferta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main max-w-3xl">
        <div className="mb-6">
          <Link href="/dashboard/companies" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver al panel
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nueva oferta de trabajo</h1>
              <p className="text-sm text-gray-500">Completa los datos para publicar una oferta</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">Oferta publicada correctamente. Redirigiendo...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Titulo de la oferta *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Pasantía Frontend React"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Descripcion del puesto *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe las responsabilidades, el dia a dia y lo que buscas en el candidato..."
                rows={5}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Requisitos *
              </label>
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Lista los requisitos: estudios, experiencia, habilidades necesarias..."
                rows={4}
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Beneficios
              </label>
              <Textarea
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="Beneficios que ofreces: capacitacion, horarios flexibles, etc."
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Tipo de trabajo *"
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                options={JOB_TYPES}
                disabled={isLoading}
              />
              <Select
                label="Modalidad *"
                value={formData.remoteType}
                onChange={(e) => setFormData({ ...formData, remoteType: e.target.value })}
                options={REMOTE_TYPES}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Nivel de experiencia *"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                options={EXPERIENCE_LEVELS}
                disabled={isLoading}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ubicacion *
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ej: Buenos Aires"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Salario minimo
                </label>
                <Input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  placeholder="150000"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Salario maximo
                </label>
                <Input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  placeholder="250000"
                  disabled={isLoading}
                />
              </div>
              <Select
                label="Periodo"
                value={formData.salaryPeriod}
                onChange={(e) => setFormData({ ...formData, salaryPeriod: e.target.value })}
                options={SALARY_PERIODS}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Habilidades (separadas por coma)
              </label>
              <Input
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, TypeScript, Node.js, SQL"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Link href="/dashboard/companies" className="flex-1">
                <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" className="flex-1" loading={isLoading}>
                {isLoading ? 'Publicando...' : 'Publicar oferta'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
