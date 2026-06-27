'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui'
import { AlertCircle, Briefcase, ArrowLeft } from 'lucide-react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    Configuration: 'Error de configuración del servidor. Por favor, intentá más tarde.',
    AccessDenied: 'No tenés permiso para acceder a este recurso.',
    Verification: 'El enlace de verificación ha expirado o ya fue utilizado.',
    Default: 'Ocurrió un error al iniciar sesión.',
  }

  const message = errorMessages[error || ''] || errorMessages.Default

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-xl py-10 px-8 shadow-xl rounded-2xl border border-white/60">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-red-50 mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de autenticación</h1>
            <p className="text-gray-600 mb-8">{message}</p>
            <div className="flex flex-col gap-3">
              <Link href="/auth/login">
                <Button className="w-full gap-2 rounded-xl shadow-lg shadow-primary/25">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio de sesión
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full gap-2 rounded-xl">
                  <Briefcase className="h-4 w-4" />
                  Ir al inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>}>
      <ErrorContent />
    </Suspense>
  )
}
