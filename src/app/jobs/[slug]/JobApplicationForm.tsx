'use client'

import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Loader2, Send, AlertCircle, CheckCircle, User, Building2, Lock, ExternalLink } from 'lucide-react'
import type { JobWithRelations } from '@/types'

interface JobApplicationFormProps {
  job: JobWithRelations
}

export function JobApplicationForm({ job }: JobApplicationFormProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isApplying, setIsApplying] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [resumeUrl, setResumeUrl] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const userRole = (session?.user as any)?.role
  const isCompany = userRole === 'COMPANY'
  const isAdmin = userRole === 'ADMIN'

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (status === 'loading') return
    
    if (!session) {
      setShowLogin(true)
      return
    }

    if (isCompany || isAdmin) {
      setMessage({ type: 'error', text: 'Las empresas y administradores no pueden postularse a ofertas.' })
      return
    }

    setIsApplying(true)
    setMessage(null)

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          coverLetter: coverLetter || undefined,
          resumeUrl: resumeUrl || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al postularse')
      }

      setMessage({ type: 'success', text: '¡Postulación enviada correctamente!' })
      setCoverLetter('')
      setResumeUrl('')
      
      setTimeout(() => {
        router.refresh()
      }, 1500)
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Error al postularse' })
    } finally {
      setIsApplying(false)
    }
  }

  const handleLogin = (callbackUrl?: string) => {
    signIn('credentials', { callbackUrl: callbackUrl || `/jobs/${job.slug}` })
  }

  if (status === 'loading') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
        <div className="h-6 w-1/4 bg-gray-200 rounded mb-4" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
        <div className="h-10 bg-gray-200 rounded mt-4" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Postularse a esta oferta</h3>

      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      {!session ? (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">¿Estudiante?</p>
                <p className="text-sm text-gray-500">Inicia sesión para postularte en un clic</p>
              </div>
            </div>
            <Button className="w-full gap-2" onClick={() => handleLogin(`/jobs/${job.slug}`)}>
              <Lock className="h-4 w-4" />
              Iniciar sesión y postularse
            </Button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900">¿Empresa?</p>
                <p className="text-sm text-gray-500">Publica tus ofertas de empleo</p>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2" onClick={() => router.push('/auth/register?role=company')}>
              <ExternalLink className="h-4 w-4" />
              Registrar empresa
            </Button>
          </div>

          <Button variant="ghost" className="w-full text-sm" onClick={() => handleLogin(`/jobs/${job.slug}`)}>
            ¿Ya tienes cuenta? Iniciar sesión
          </Button>
        </div>
      ) : isCompany || isAdmin ? (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">
              {isCompany ? 'Como empresa no puedes postularte a ofertas.' : 'Los administradores no pueden postularse a ofertas.'}
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1.5">
              Carta de presentación (opcional)
            </label>
            <Textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Cuéntanos por qué te interesa esta posición..."
              rows={4}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700 mb-1.5">
              URL de tu CV / LinkedIn / Portfolio (opcional)
            </label>
            <Input
              id="resumeUrl"
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://linkedin.com/in/tu-perfil"
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full gap-2" loading={isApplying}>
            <Send className="h-4 w-4" />
            {isApplying ? 'Enviando...' : 'Enviar postulación'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Al postularte, tu perfil y datos de contacto se compartirán con la empresa.
          </p>
        </form>
      )}
    </div>
  )
}