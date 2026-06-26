import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
  role: z.enum(['STUDENT', 'COMPANY']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      const firstError = parsed.error.issues?.[0]?.message || 'Datos invalidos'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { name, email, password, role } = parsed.data

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'Ya existe una cuenta con este email' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
      },
    })

    if (role === 'STUDENT') {
      await prisma.candidateProfile.create({
        data: {
          userId: user.id,
          skills: '[]',
        },
      })
    } else {
      await prisma.companyProfile.create({
        data: {
          userId: user.id,
          name: name,
        },
      })
    }

    return NextResponse.json({
      message: 'Cuenta creada correctamente',
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
