import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        candidateProfile: true,
        companyProfile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
      profile: user.candidateProfile || user.companyProfile,
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const userRole = (session.user as any).role

    if (userRole === 'STUDENT') {
      const { headline, bio, location, phone, website, linkedin, github, skills, image } = body

      if (image !== undefined) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { image },
        })
      }

      const profile = await prisma.candidateProfile.upsert({
        where: { userId: session.user.id },
        update: {
          headline,
          bio,
          location,
          phone,
          website,
          linkedin,
          github,
          skills: JSON.stringify(skills || []),
        },
        create: {
          userId: session.user.id,
          headline,
          bio,
          location,
          phone,
          website,
          linkedin,
          github,
          skills: JSON.stringify(skills || []),
        },
      })

      return NextResponse.json({ message: 'Perfil actualizado', profile })
    } else if (userRole === 'COMPANY') {
      const { name, description, website, location, size, industry, linkedin, logo } = body

      if (logo !== undefined) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { image: logo },
        })
      }

      const profile = await prisma.companyProfile.upsert({
        where: { userId: session.user.id },
        update: {
          name,
          description,
          website,
          location,
          size,
          industry,
          linkedin,
          logo,
        },
        create: {
          userId: session.user.id,
          name: name || '',
          description,
          website,
          location,
          size,
          industry,
          linkedin,
          logo,
        },
      })

      return NextResponse.json({ message: 'Perfil actualizado', profile })
    }

    return NextResponse.json({ error: 'Rol no valido' }, { status: 400 })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
