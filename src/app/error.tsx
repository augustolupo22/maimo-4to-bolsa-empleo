'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-red-50 mb-6">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Ocurrió un error inesperado. Por favor, intentá de nuevo.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button onClick={reset} className="gap-2 rounded-xl shadow-lg shadow-primary/25">
            <RefreshCw className="h-4 w-4" />
            Intentar de nuevo
          </Button>
          <Button variant="outline" className="gap-2 rounded-xl" onClick={() => window.location.href = '/'}>
            <Home className="h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
