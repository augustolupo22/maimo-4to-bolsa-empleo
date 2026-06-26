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
      name: 'Juan Perez',
      passwordHash,
      role: 'STUDENT',
    },
  })

  await prisma.candidateProfile.upsert({
    where: { userId: student.id },
    update: {},
    create: {
      userId: student.id,
      headline: 'Estudiante de Ingenieria en Sistemas',
      bio: 'Apasionado por el desarrollo web y movil.',
      location: 'Buenos Aires, Argentina',
      phone: '+54 11 1234-5678',
      website: 'https://portfolio.example.com',
      linkedin: 'https://linkedin.com/in/juanperez',
      github: 'https://github.com/juanperez',
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
      description: 'Empresa lider en soluciones tecnologicas, especializada en desarrollo web y movil.',
      location: 'Buenos Aires, Argentina',
      size: '51-200',
      industry: 'Tecnologia',
      verified: true,
      website: 'https://techcorp.example.com',
    },
  })

  // Create a second company
  const company2User = await prisma.user.upsert({
    where: { email: 'diseno@test.com' },
    update: {},
    create: {
      email: 'diseno@test.com',
      name: 'DesignStudio',
      passwordHash,
      role: 'COMPANY',
    },
  })

  const company2 = await prisma.companyProfile.upsert({
    where: { userId: company2User.id },
    update: {},
    create: {
      userId: company2User.id,
      name: 'DesignStudio',
      description: 'Estudio de diseno especializado en experiencia de usuario e interfaces digitales.',
      location: 'Cordoba, Argentina',
      size: '11-50',
      industry: 'Diseno',
      verified: true,
      website: 'https://designstudio.example.com',
    },
  })

  // Create test jobs
  const jobs = [
    {
      title: 'Pasantia Frontend React',
      slug: 'pasantia-frontend-react',
      description: 'Buscamos un estudiante apasionado por el frontend para unirse a nuestro equipo de desarrollo. Trabajaras en proyectos reales usando React, TypeScript y Tailwind CSS.',
      requirements: 'Cursando carreras afines a Sistemas/Informatica\nConocimientos basicos de React y JavaScript\nGanas de aprender y trabajar en equipo\nDisponibilidad 20-30hs semanales',
      benefits: 'Mentoria personalizada\nPosibilidad de continuidad laboral\nAmbiente joven y dinamico\nHorarios flexibles',
      location: 'Buenos Aires (Hibrido)',
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
      description: 'Unete a nuestro equipo backend desarrollando APIs escalables con Node.js y PostgreSQL. Ideal para recien graduados o estudiantes avanzados.',
      requirements: 'Titulo universitario o estudiante avanzado\nConocimientos de Node.js, Express\nExperiencia con bases de datos relacionales\nIngles tecnico (lectura)',
      benefits: 'Capacitacion continua\nCertificaciones pagas\nTrabajo 100% remoto\nEquipamiento provisto',
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
      title: 'Pasantia UX/UI Design',
      slug: 'pasantia-ux-ui-design',
      description: 'Buscamos un estudiante de diseno para crear experiencias de usuario increibles. Trabajaras codo a codo con product managers y developers.',
      requirements: 'Estudiante de Diseno Grafico, UX/UI o afines\nDominio de Figma\nPortfolio con proyectos academicos o personales\nSensibilidad por el detalle',
      benefits: 'Proyectos reales desde dia 1\nFeedback constante de senior designers\nPosibilidad de efectividad',
      location: 'Cordoba (Presencial)',
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
      companyId: company2.id,
    },
    {
      title: 'Asistente de Marketing Digital',
      slug: 'asistente-marketing-digital',
      description: 'Buscamos un estudiante para apoyar en estrategias de marketing digital, gestion de redes sociales y creacion de contenido.',
      requirements: 'Estudiante de Marketing, Publicidad o afines\nConocimiento de redes sociales\nCreatividad y proactividad\nManejo basico de herramientas de diseño',
      benefits: 'Capacitación en marketing digital\nHorarios flexibles\nPosibilidad de remoto parcial',
      location: 'Buenos Aires (Hibrido)',
      remoteType: 'hybrid',
      jobType: 'internship',
      experienceLevel: 'student',
      salaryMin: 100000,
      salaryMax: 140000,
      salaryCurrency: 'ARS',
      salaryPeriod: 'month',
      skills: JSON.stringify(['Social Media', 'Content Creation', 'Google Analytics', 'Canva']),
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 259200000),
      companyId: company.id,
    },
    {
      title: 'Desarrollador Full Stack Junior',
      slug: 'desarrollador-fullstack-junior',
      description: 'Unete a nuestro equipo para desarrollar soluciones web completas, desde el frontend hasta el backend. Ideal para recien graduados con ganas de aprender.',
      requirements: 'Recien graduado o estudiante avanzado de Sistemas\nConocimientos de JavaScript, React, Node.js\nBase de datos SQL o NoSQL\nGanas de aprender nuevas tecnologias',
      benefits: 'Onboarding personalizado\nHorario flexible\nAmbiente de trabajo colaborativo',
      location: 'Buenos Aires (Presencial)',
      remoteType: 'onsite',
      jobType: 'full-time',
      experienceLevel: 'entry',
      salaryMin: 600000,
      salaryMax: 900000,
      salaryCurrency: 'ARS',
      salaryPeriod: 'month',
      skills: JSON.stringify(['JavaScript', 'React', 'Node.js', 'MongoDB', 'Git']),
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 345600000),
      companyId: company2.id,
    },
  ]

  const createdJobs = []
  for (const job of jobs) {
    const created = await prisma.job.upsert({
      where: { slug: job.slug },
      update: {},
      create: job,
    })
    createdJobs.push(created)
  }

  // Create test applications
  if (createdJobs.length > 0) {
    await prisma.application.upsert({
      where: {
        jobId_candidateId: {
          jobId: createdJobs[0].id,
          candidateId: student.id,
        },
      },
      update: {},
      create: {
        jobId: createdJobs[0].id,
        candidateId: student.id,
        coverLetter: 'Estoy muy interesado en esta pasantia porque me apasiona el desarrollo frontend y creo que esta empresa es el lugar perfecto para empezar mi carrera.',
        status: 'PENDING',
      },
    })

    await prisma.application.upsert({
      where: {
        jobId_candidateId: {
          jobId: createdJobs[1].id,
          candidateId: student.id,
        },
      },
      update: {},
      create: {
        jobId: createdJobs[1].id,
        candidateId: student.id,
        status: 'REVIEWING',
      },
    })

    if (createdJobs.length > 2) {
      await prisma.application.upsert({
        where: {
          jobId_candidateId: {
            jobId: createdJobs[2].id,
            candidateId: student.id,
          },
        },
        update: {},
        create: {
          jobId: createdJobs[2].id,
          candidateId: student.id,
          coverLetter: 'Mi experiencia en diseno de interfaces y mi pasion por la experiencia de usuario me hacen un candidato ideal para esta pasantia.',
          resumeUrl: 'https://drive.google.com/file/d/1',
          status: 'ACCEPTED',
        },
      })
    }
  }

  console.log('Database seeded successfully!')
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
