import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const jobType = searchParams.get('jobType') || ''
    const remoteType = searchParams.get('remoteType') || ''
    const experienceLevel = searchParams.get('experienceLevel') || ''
    const location = searchParams.get('location') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where: any = {
      status: 'PUBLISHED',
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { skills: { contains: search } },
        { company: { name: { contains: search } } },
      ]
    }

    if (jobType) {
      where.jobType = jobType
    }

    if (remoteType) {
      where.remoteType = remoteType
    }

    if (experienceLevel) {
      where.experienceLevel = experienceLevel
    }

    if (location) {
      where.location = { contains: location }
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
              location: true,
              size: true,
              industry: true,
              verified: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.job.count({ where }),
    ])

    return NextResponse.json({
      jobs,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
