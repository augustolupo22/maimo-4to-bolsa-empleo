'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { Select } from '@/components/ui'
import { Button } from '@/components/ui'
import { X, Filter, ChevronDown } from 'lucide-react'
import { JOB_TYPES, REMOTE_TYPES, EXPERIENCE_LEVELS } from '@/lib/utils'

interface JobFiltersProps {
  initialParams?: {
    search?: string
    jobType?: string
    remoteType?: string
    experienceLevel?: string
    location?: string
  }
}

export function JobFilters({ initialParams = {} }: JobFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentParams = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString())
    return {
      search: params.get('search') || initialParams.search || '',
      jobType: params.get('jobType') || initialParams.jobType || '',
      remoteType: params.get('remoteType') || initialParams.remoteType || '',
      experienceLevel: params.get('experienceLevel') || initialParams.experienceLevel || '',
      location: params.get('location') || initialParams.location || '',
    }
  }, [searchParams, initialParams])

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/jobs?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = useCallback(() => {
    router.push('/jobs')
  }, [router])

  const hasActiveFilters = useMemo(() => 
    currentParams.search || currentParams.jobType || currentParams.remoteType || 
    currentParams.experienceLevel || currentParams.location
  , [currentParams])

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtros
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-gray-600 hover:text-gray-900">
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1.5">
            Buscar
          </label>
          <input
            id="search"
            type="text"
            value={currentParams.search}
            onChange={(e) => updateParam('search', e.target.value)}
            placeholder="Título, empresa, habilidades..."
            className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Tipo de trabajo"
            value={currentParams.jobType}
            onChange={(e) => updateParam('jobType', e.target.value)}
            options={[{ value: '', label: 'Todos' }, ...JOB_TYPES]}
            placeholder="Seleccionar"
          />
          
          <Select
            label="Modalidad"
            value={currentParams.remoteType}
            onChange={(e) => updateParam('remoteType', e.target.value)}
            options={[{ value: '', label: 'Todas' }, ...REMOTE_TYPES]}
            placeholder="Seleccionar"
          />
        </div>

        <div>
          <Select
            label="Nivel de experiencia"
            value={currentParams.experienceLevel}
            onChange={(e) => updateParam('experienceLevel', e.target.value)}
            options={[{ value: '', label: 'Todos' }, ...EXPERIENCE_LEVELS]}
            placeholder="Seleccionar"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
            Ubicación
          </label>
          <input
            id="location"
            type="text"
            value={currentParams.location}
            onChange={(e) => updateParam('location', e.target.value)}
            placeholder="Ciudad, provincia..."
            className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </div>
  )
}