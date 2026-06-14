import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSalary(min?: number, max?: number, currency = 'ARS', period = 'month') {
  if (!min && !max) return 'A convenir'
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  })
  const periodLabel = period === 'hour' ? '/hs' : period === 'month' ? '/mes' : '/año'
  if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}${periodLabel}`
  if (min) return `Desde ${formatter.format(min)}${periodLabel}`
  return `Hasta ${formatter.format(max!)}${periodLabel}`
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffDays > 7) return formatDate(date)
  if (diffDays > 0) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
  if (diffHours > 0) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
  if (diffMinutes > 0) return `hace ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`
  return 'ahora mismo'
}

export const JOB_TYPES = [
  { value: 'internship', label: 'Pasantía' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'contract', label: 'Contrato' },
] as const

export const REMOTE_TYPES = [
  { value: 'onsite', label: 'Presencial' },
  { value: 'hybrid', label: 'Híbrido' },
  { value: 'remote', label: 'Remoto' },
] as const

export const EXPERIENCE_LEVELS = [
  { value: 'student', label: 'Estudiante (sin experiencia)' },
  { value: 'entry', label: 'Junior (0-1 año)' },
  { value: 'mid', label: 'Semi-senior (1-3 años)' },
] as const

export const SALARY_PERIODS = [
  { value: 'hour', label: 'Por hora' },
  { value: 'month', label: 'Por mes' },
  { value: 'year', label: 'Por año' },
] as const

export const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '201-500', label: '201-500 empleados' },
  { value: '500+', label: '500+ empleados' },
] as const