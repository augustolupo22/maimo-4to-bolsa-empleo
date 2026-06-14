import { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}

export type UserRole = 'STUDENT' | 'COMPANY' | 'ADMIN'

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED'

export type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN'

export interface JobWithRelations {
  id: string
  title: string
  slug: string
  description: string
  requirements: string
  benefits: string | null
  location: string
  remoteType: string
  jobType: string
  experienceLevel: string
  salaryMin: number | null
  salaryMax: number | null
  salaryCurrency: string
  salaryPeriod: string
  skills: string
  status: JobStatus
  publishedAt: Date | null
  expiresAt: Date | null
  viewsCount: number
  applicationsCount: number
  createdAt: Date
  updatedAt: Date
  company: {
    id: string
    name: string
    logo: string | null
    location: string | null
    size: string | null
    industry: string | null
    verified: boolean
  }
}

export interface CompanyWithRelations {
  id: string
  name: string
  description: string | null
  logo: string | null
  website: string | null
  location: string | null
  size: string | null
  industry: string | null
  foundedYear: number | null
  linkedin: string | null
  twitter: string | null
  verified: boolean
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    email: string
    name: string
  }
  _count: {
    jobs: number
  }
}

export interface ApplicationWithRelations {
  id: string
  coverLetter: string | null
  resumeUrl: string | null
  status: ApplicationStatus
  appliedAt: Date
  updatedAt: Date
  job: {
    id: string
    title: string
    slug: string
    location: string
    remoteType: string
    jobType: string
    company: {
      id: string
      name: string
      logo: string | null
    }
  }
  candidate: {
    id: string
    name: string
    email: string
    image: string | null
  }
}

export interface StudentProfile {
  id: string
  headline: string | null
  bio: string | null
  location: string | null
  phone: string | null
  website: string | null
  linkedin: string | null
  github: string | null
  skills: string[]
  experience: Array<{
    company: string
    role: string
    startDate: string
    endDate: string | null
    current: boolean
    description: string
  }>
  education: Array<{
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string | null
    current: boolean
  }>
  resumeUrl: string | null
}