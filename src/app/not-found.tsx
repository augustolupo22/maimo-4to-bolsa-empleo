import Link from 'next/link'
import { Button } from '@/components/ui'
import { Briefcase, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-2">Pagina no encontrada</p>
        <p className="text-gray-500 mb-8">La pagina que buscas no existe o fue movida.</p>
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  )
}
