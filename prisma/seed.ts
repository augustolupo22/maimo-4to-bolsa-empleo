import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12)

  // Create test student
  const student = await prisma.user.upsert({
    where: { email: 'estudiante@test.com' },
    update: {},
    create: {
      email: 'estudiante@test.com',
      name: 'Juan Pérez',
      passwordHash,
      role: 'STUDENT',
    },
  })

  await prisma.candidateProfile.upsert({
    where: { userId: student.id },
    update: {},
    create: {
      userId: student.id,
      headline: 'Estudiante de Ingeniería en Sistemas',
      bio: 'Apasionado por el desarrollo web y móvil.',
      location: 'Buenos Aires, Argentina',
      skills: JSON.stringify(['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python']),
    },
  })

  // Create test company
  const companyUser = await prisma.user.upsert({
    where: { email: 'empresa@test.com' },
    update: {},
    create: {
      email: 'empresa@test.com',
      name: 'TechCorp SA',
      passwordHash,
      role: 'COMPANY',
    },
  })

  const company = await prisma.companyProfile.upsert({
    where: { userId: companyUser.id },
    update: {},
    create: {
      userId: companyUser.id,
      name: 'TechCorp SA',
      description: 'Empresa líder en soluciones tecnológicas.',
      location: 'Buenos Aires, Argentina',
      size: '51-200',
      industry: 'Tecnología',
      verified: true,
      website: 'https://techcorp.example.com',
    },
  })

  // Create test jobs
  const jobs = [
    {
      title: 'Pasantía Frontend React',
      slug: 'pasantia-frontend-react',
      description: 'Buscamos un estudiante apasionado por el frontend para unirse a nuestro equipo de desarrollo. Trabajarás en proyectos reales usando React, TypeScript y Tailwind CSS.',
      requirements: '• Cursando carreras afines a Sistemas/Informática\n• Conocimientos básicos de React y JavaScript\n• Ganas de aprender y trabajar en equipo\n• Disponibilidad 20-30hs semanales',
      benefits: '• Mentoría personalizada\n• Posibilidad de continuidad laboral\n• Ambiente joven y dinámico\n• Horarios flexibles',
      location: 'Buenos Aires (Híbrido)',
      remoteType: 'hybrid',
      jobType: 'internship',
      experienceLevel: 'student',
      salaryMin: 150000,
      salaryMax: 200000,
      salaryCurrency: 'ARS',
      salaryPeriod: 'month',
      skills: JSON.stringify(['React', 'TypeScript', 'Tailwind CSS', 'Git']),
      status: 'PUBLISHED',
      publishedAt: new Date(),
      companyId: company.id,
    },
    {
      title: 'Junior Backend Developer',
      slug: 'junior-backend-developer',
      description: 'Únete a nuestro equipo backend desarrollando APIs escalables con Node.js y PostgreSQL. Ideal para recién graduados o estudiantes avanzados.',
      requirements: '• Título universitario o estudiante avanzado\n• Conocimientos de Node.js, Express\n• Experiencia con bases de datos relacionales\n• Inglés técnico (lectura)',
      benefits: '• Capacitación continua\n• Certificaciones pagas\n• Trabajo 100% remoto\n• Equipamiento provisto',
      location: 'Remoto',
      remoteType: 'remote',
      jobType: 'full-time',
      experienceLevel: 'entry',
      salaryMin: 800000,
      salaryMax: 1200000,
      salaryCurrency: 'ARS',
      salaryPeriod: 'month',
      skills: JSON.stringify(['Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'AWS']),
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 86400000),
      companyId: company.id,
    },
    {
      title: 'Pasantía UX/UI Design',
      slug: 'pasantia-ux-ui-design',
      description: 'Buscamos un estudiante de diseño para crear experiencias de usuario increíbles. Trabajarás codo a codo con product managers y developers.',
      requirements: '• Estudiante de Diseño Gráfico, UX/UI o afines\n• Dominio de Figma\n• Portfolio con proyectos académicos o personales\n• Sensibilidad por el detalle',
      benefits: '• Proyectos reales desde día 1\n• Feedback constante de senior designers\n• Posibilidad de efectividad',
      location: 'Córdoba (Presencial)',
      remoteType: 'onsite',
      jobType: 'internship',
      experienceLevel: 'student',
      salaryMin: 120000,
      salaryMax: 150000,
      salaryCurrency: 'ARS',
      salaryPeriod: 'month',
      skills: JSON.stringify(['Figma', 'User Research', 'Prototyping', 'Design Systems']),
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 172800000),
      companyId: company.id,
    },
  ]

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      create: job,
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('Student: estudiante@test.com / password123')
  console.log('Company: empresa@test.com / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })