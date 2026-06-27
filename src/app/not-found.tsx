'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 mb-8">
          <span className="text-6xl font-bold text-gradient">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Página no encontrada</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          La página que buscás no existe o fue movida. Volvé al inicio para explorar nuestras ofertas.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Button className="gap-2 rounded-xl shadow-lg shadow-primary/25">
              <Home className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          <Button variant="outline" className="gap-2 rounded-xl" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>
    </div>
  )
}
