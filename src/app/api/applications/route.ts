import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const userRole = (session.user as any).role
    if (userRole === 'COMPANY' || userRole === 'ADMIN') {
      return NextResponse.json({ error: 'Las empresas no pueden postularse' }, { status: 403 })
    }

    const body = await request.json()
    const { jobId, coverLetter, resumeUrl } = body

    if (!jobId) {
      return NextResponse.json({ error: 'ID de oferta requerido' }, { status: 400 })
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId, status: 'PUBLISHED' },
    })

    if (!job) {
      return NextResponse.json({ error: 'Oferta no encontrada o no publicada' }, { status: 404 })
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_candidateId: {
          jobId,
          candidateId: session.user.id,
        },
      },
    })

    if (existingApplication) {
      return NextResponse.json({ error: 'Ya te has postulado a esta oferta' }, { status: 400 })
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        candidateId: session.user.id,
        coverLetter,
        resumeUrl,
        status: 'PENDING',
      },
    })

    await prisma.job.update({
      where: { id: jobId },
      data: { applicationsCount: { increment: 1 } },
    })

    return NextResponse.json({ 
      message: 'Postulación enviada correctamente',
      application: {
        id: application.id,
        status: application.status,
        appliedAt: application.appliedAt,
      }
    })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')
    const userId = session.user.id
    const userRole = (session.user as any).role

    const where: any = {}

    if (userRole === 'STUDENT') {
      where.candidateId = userId
    } else if (userRole === 'COMPANY') {
      const companyProfile = await prisma.companyProfile.findUnique({
        where: { userId },
      })
      if (!companyProfile) {
        return NextResponse.json({ error: 'Perfil de empresa no encontrado' }, { status: 404 })
      }
      where.job = { companyId: companyProfile.id }
    } else if (userRole === 'ADMIN') {
      // Admin can see all
    }

    if (jobId) {
      where.jobId = jobId
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        job: {
          include: {
            company: {
              select: { id: true, name: true, logo: true },
            },
          },
        },
        candidate: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
      orderBy: { appliedAt: 'desc' },
    })

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}