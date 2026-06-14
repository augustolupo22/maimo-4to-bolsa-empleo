'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Camera, Save, User, GraduationCap, MapPin, Phone, Globe, ExternalLink, FileText, Edit, X, BookOpen } from 'lucide-react'

export default function StudentProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 w-32 bg-gray-200 rounded" />
                  <div className="h-4 w-48 bg-gray-200 rounded" />
                  <div className="h-4 w-36 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesión para ver tu perfil</h2>
            <p className="text-gray-500 mb-6">Debes iniciar sesión para ver y editar tu perfil de estudiante.</p>
            <Link href="/auth/login">
              <Button>Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userRole = (session.user as any)?.role
  const isStudent = userRole === 'STUDENT'

  if (!isStudent) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Acceso no autorizado</h2>
            <p className="text-gray-500 mb-6">Esta página es solo para estudiantes. Si eres una empresa, visita tu perfil de empresa.</p>
            <Link href="/dashboard/companies/profile">
              <Button>Ir al perfil de empresa</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Mock data - in a real app, this would come from an API
  const studentProfile = {
    id: '1',
    userId: 'user1',
    headline: 'Estudiante de Ingeniería en Sistemas',
    bio: 'Apasionado por el desarrollo web y móvil. Me encanta resolver problemas complejos y crear soluciones innovadoras.',
    location: 'Buenos Aires, Argentina',
    phone: '+54 11 1234-5678',
    website: 'https://portfolio.example.com',
    linkedin: 'https://linkedin.com/in/juanperez',
    github: 'https://github.com/juanperez',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'HTML', 'CSS', 'Git'],
    experience: [
      {
        company: 'TechCorp SA',
        role: 'Pasantía Frontend',
        startDate: '2023-01-15',
        endDate: '2023-12-15',
        current: false,
        description: 'Desarrollo de interfaces de usuario con React y TypeScript. Colaboración con equipos de diseño para crear componentes reutilizables.',
      },
      {
        company: 'StartupXYZ',
        role: 'Desarrollador Web Junior',
        startDate: '2022-03-01',
        endDate: '2022-12-31',
        current: false,
        description: 'Desarrollo de aplicaciones web con JavaScript y Node.js. Implementación de APIs RESTful y bases de datos SQL.',
      },
    ],
    education: [
      {
        institution: 'Universidad Maimónides',
        degree: 'Ingeniería en Sistemas',
        field: 'Informática',
        startDate: '2020',
        endDate: '2024',
        current: false,
      },
      {
        institution: 'Instituto Tecnológico de Buenos Aires',
        degree: 'Bachiller en Ciencias Naturales',
        field: 'Matemáticas',
        startDate: '2015',
        endDate: '2019',
        current: false,
      },
    ],
    resumeUrl: 'https://drive.google.com/file/d/1',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-15'),
  }

  const [formData, setFormData] = useState({
    headline: studentProfile.headline || '',
    bio: studentProfile.bio || '',
    location: studentProfile.location || '',
    phone: studentProfile.phone || '',
    website: studentProfile.website || '',
    linkedin: studentProfile.linkedin || '',
    github: studentProfile.github || '',
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      headline: studentProfile.headline || '',
      bio: studentProfile.bio || '',
      location: studentProfile.location || '',
      phone: studentProfile.phone || '',
      website: studentProfile.website || '',
      linkedin: studentProfile.linkedin || '',
      github: studentProfile.github || '',
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        {/* Page Header */}
        <section className="bg-white border-b border-gray-200 mb-8">
          <div className="container-main py-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Mi perfil</span>
            </nav>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi perfil de estudiante</h1>
                <p className="text-gray-600">Gestiona tu información académica y profesional</p>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} loading={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar cambios
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar perfil
                </Button>
              )}
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar
                    src={session?.user?.image || undefined}
                    alt={session?.user?.name || 'Usuario'}
                    fallback={session?.user?.name?.charAt(0) || 'U'}
                    size="xl"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">
                  {session?.user?.name || 'Estudiante UNM'}
                </h2>
                <p className="text-gray-500 text-sm">ID: {studentProfile.id}</p>
                <Badge variant="success" className="mt-2">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Estudiante UNM Verificado
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{studentProfile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{studentProfile.phone}</span>
                </div>
      <div className="flex items-center gap-3 text-sm">
        <Globe className="h-4 w-4 text-gray-400" />
        <a href={studentProfile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Mi portafolio
        </a>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <ExternalLink className="h-4 w-4 text-gray-400" />
        <a href={studentProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          LinkedIn
        </a>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <ExternalLink className="h-4 w-4 text-gray-400" />
        <a href={studentProfile.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          GitHub
        </a>
      </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {studentProfile.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">CV y Documentos</h3>
                {studentProfile.resumeUrl ? (
                  <a
                    href={studentProfile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Mi CV</span>
                  </a>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-500">No hay CV subido</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Título profesional</label>
                    <Input
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      placeholder="Ej: Estudiante de Ingeniería en Sistemas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Biografía</label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Cuéntanos sobre ti, tus intereses y objetivos profesionales"
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Título profesional</label>
                    <p className="text-gray-900 mt-1">{studentProfile.headline}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Biografía</label>
                    <p className="text-gray-900 mt-1 line-clamp-3">{studentProfile.bio}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Educación</h3>
              <div className="space-y-4">
                {studentProfile.education.map((edu, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{edu.institution}</h4>
                      <p className="text-gray-600">{edu.degree} en {edu.field}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate || 'Presente'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experiencia Laboral</h3>
              <div className="space-y-4">
                {studentProfile.experience.map((exp, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{exp.company}</h4>
                      <p className="text-gray-600">{exp.role}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.endDate || 'Presente'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            {isEditing && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ubicación</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ciudad, país"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sitio web</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://portfolio.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
                    <Input
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/usuario"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">GitHub</label>
                    <Input
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="https://github.com/usuario"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}