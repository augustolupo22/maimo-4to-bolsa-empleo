'use client'

import Link from 'next/link'
import { formatSalary, formatRelativeTime } from '@/lib/utils'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Briefcase, MapPin, Calendar, Building2, ArrowUpRight } from 'lucide-react'
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
        className="block p-4 hover:bg-gray-50/80 transition-all duration-200 border-b border-gray-100 last:border-0 group"
      >
        <div className="flex items-start gap-3">
          <Avatar src={job.company.logo} alt={job.company.name} fallback={job.company.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-900 truncate group-hover:text-primary transition-colors">{job.title}</h3>
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
    <article className="border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col bg-white group card-hover">
      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar src={job.company.logo} alt={job.company.name} fallback={job.company.name} size="lg" />
          {job.company.verified && (
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
              <Building2 className="h-2.5 w-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link href={`/jobs/${job.slug}`} className="font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-1 group-hover:text-primary">
                {job.title}
              </Link>
              <p className="text-gray-500 mt-0.5 text-sm">{job.company.name}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {isRemote ? (
              <Badge variant="info" className="px-2.5 py-0.5 text-xs rounded-lg">
                Remoto
              </Badge>
            ) : isHybrid ? (
              <Badge variant="info" className="px-2.5 py-0.5 text-xs rounded-lg">
                Híbrido
              </Badge>
            ) : job.location ? (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                {job.location}
              </span>
            ) : null}
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Briefcase className="h-3 w-3" />
              {job.jobType === 'internship' ? 'Pasantía' : job.jobType}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {formatRelativeTime(job.publishedAt || job.createdAt)}
            </span>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {skills.slice(0, 4).map((skill: string) => (
                <span key={skill} className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="px-2 py-0.5 text-xs text-gray-400">
                  +{skills.length - 4} más
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          {job.salaryMin || job.salaryMax ? (
            <div className="font-semibold text-gray-900 text-sm">
              {formatSalary(job.salaryMin ?? undefined, job.salaryMax ?? undefined, job.salaryCurrency, job.salaryPeriod)}
            </div>
          ) : (
            <Badge variant="secondary" className="text-xs">A convenir</Badge>
          )}
        </div>
        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200 group/link"
        >
          Ver detalles
          <ArrowUpRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  )
}
