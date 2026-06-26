import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userRole = (session.user as any).role
    if (userRole !== 'COMPANY') {
      return NextResponse.json({ error: 'Solo las empresas pueden ver sus ofertas' }, { status: 403 })
    }

    const companyProfile = await prisma.companyProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!companyProfile) {
      return NextResponse.json({ error: 'Perfil de empresa no encontrado' }, { status: 404 })
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: companyProfile.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true }
        }
      }
    })

    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userRole = (session.user as any).role
    if (userRole !== 'COMPANY') {
      return NextResponse.json({ error: 'Solo las empresas pueden publicar ofertas' }, { status: 403 })
    }

    const companyProfile = await prisma.companyProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!companyProfile) {
      return NextResponse.json({ error: 'Perfil de empresa no encontrado' }, { status: 404 })
    }

    const body = await request.json()
    const {
      title,
      description,
      requirements,
      benefits,
      location,
      remoteType,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
      salaryCurrency,
      salaryPeriod,
      skills,
      expiresAt
    } = body

    if (!title || !description || !requirements || !location || !remoteType || !jobType || !experienceLevel) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now()

    const job = await prisma.job.create({
      data: {
        title,
        slug,
        description,
        requirements,
        benefits,
        location,
        remoteType,
        jobType,
        experienceLevel,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryMax: salaryMax ? parseInt(salaryMax) : null,
        salaryCurrency: salaryCurrency || 'ARS',
        salaryPeriod: salaryPeriod || 'month',
        skills: JSON.stringify(skills || []),
        status: 'PUBLISHED',
        publishedAt: new Date(),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        companyId: companyProfile.id,
      },
    })

    return NextResponse.json({
      message: 'Oferta publicada correctamente',
      job: {
        id: job.id,
        title: job.title,
        slug: job.slug,
      }
    })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
