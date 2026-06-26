'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { AlertCircle, Home, RefreshCcw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Algo salio mal</h1>
        <p className="text-gray-600 mb-8">Ocurrio un error inesperado. Por favor, intenta de nuevo.</p>
        <div className="flex flex-col gap-3">
          <Button onClick={reset} className="w-full gap-2">
            <RefreshCcw className="h-4 w-4" />
            Intentar de nuevo
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full gap-2">
              <Home className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
