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
    Configuration: 'Error de configuracion del servidor. Por favor, intenta mas tarde.',
    AccessDenied: 'No tienes permiso para acceder a este recurso.',
    Verification: 'El enlace de verificacion ha expirado o ya fue utilizado.',
    Default: 'Ocurrio un error al iniciar sesion.',
  }

  const message = errorMessages[error || ''] || errorMessages.Default

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white py-8 px-6 shadow-sm rounded-xl border border-gray-200">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error de autenticacion</h1>
          <p className="text-gray-600 mb-8">{message}</p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login">
              <Button className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesion
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full gap-2">
                <Briefcase className="h-4 w-4" />
                Ir al inicio
              </Button>
            </Link>
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
