'use client'

import Link from 'next/link'
import { formatSalary, formatRelativeTime } from '@/lib/utils'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Briefcase, MapPin, Calendar, Building2 } from 'lucide-react'
import type { JobWithRelations } from '@/types'

interface JobCardProps {
  job: JobWithRelations
  variant?: 'default' | 'compact'
}

export function JobCard({ job, variant = 'default' }: JobCardProps) {
  const skills = job.skills ? JSON.parse(job.skills) : []
  const isRemote = job.remoteType === 'remote'
  const isHybrid = job.remoteType === 'hybrid'

  if (variant === 'compact') {
    return (
      <Link
        href={`/jobs/${job.slug}`}
        className="block p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
      >
        <div className="flex items-start gap-3">
          <Avatar src={job.company.logo} alt={job.company.name} fallback={job.company.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-900 truncate">{job.title}</h3>
              <Badge variant="info" className="whitespace-nowrap">
                {job.jobType === 'internship' ? 'Pasantía' : job.jobType}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 truncate mt-0.5">{job.company.name}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {isRemote ? 'Remoto' : job.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatRelativeTime(job.publishedAt || job.createdAt)}
              </span>
              {job.salaryMin || job.salaryMax && (
                <span className="flex items-center gap-1 font-medium text-gray-700">
                  {formatSalary(job.salaryMin ?? undefined, job.salaryMax ?? undefined, job.salaryCurrency, job.salaryPeriod)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <article className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-start gap-3">
        <Avatar src={job.company.logo} alt={job.company.name} fallback={job.company.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/jobs/${job.slug}`} className="font-semibold text-lg text-gray-900 hover:text-primary transition-colors line-clamp-1">
                {job.title}
              </Link>
              <p className="text-gray-500 mt-0.5">{job.company.name}</p>
            </div>
            {job.company.verified && (
              <Badge variant="success" className="flex items-center gap-1 shrink-0">
                <Building2 className="h-3 w-3" />
                Verificada
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gray-400" />
              {isRemote ? (
                <>
                  <Badge variant="outline" className="px-2 py-0.5 text-xs">
                    Remoto
                  </Badge>
                </>
              ) : isHybrid ? (
                <>
                  <Badge variant="outline" className="px-2 py-0.5 text-xs">
                    Híbrido
                  </Badge>
                </>
              ) : (
                job.location
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gray-400" />
              {formatRelativeTime(job.publishedAt || job.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-gray-400" />
              {job.jobType === 'internship' ? 'Pasantía' : job.jobType}
            </span>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {skills.slice(0, 5).map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5">
                  {skill}
                </Badge>
              ))}
              {skills.length > 5 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 text-gray-500">
                  +{skills.length - 5} más
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        {job.salaryMin || job.salaryMax ? (
          <div className="font-semibold text-gray-900">
            {formatSalary(job.salaryMin ?? undefined, job.salaryMax ?? undefined, job.salaryCurrency, job.salaryPeriod)}
          </div>
        ) : (
          <Badge variant="secondary">A convenir</Badge>
        )}
        <Link
          href={`/jobs/${job.slug}`}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Ver detalles →
        </Link>
      </div>
    </article>
  )
}