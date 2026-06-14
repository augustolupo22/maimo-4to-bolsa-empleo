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
import { Camera, Save, Building2, Globe, MapPin, Users, Calendar, Award, Edit, X } from 'lucide-react'

export default function CompanyProfilePage() {
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
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesión para ver tu perfil</h2>
            <p className="text-gray-500 mb-6">Debes iniciar sesión para ver y editar tu perfil de empresa.</p>
            <Link href="/auth/login">
              <Button>Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userRole = (session.user as any)?.role
  const isCompany = userRole === 'COMPANY'

  if (!isCompany) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Acceso no autorizado</h2>
            <p className="text-gray-500 mb-6">Esta página es solo para empresas. Si eres un estudiante, visita tu perfil de estudiante.</p>
            <Link href="/dashboard/applications">
              <Button>Ir al panel de estudiante</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Mock data - in a real app, this would come from an API
  const company = {
    id: '1',
    userId: 'user1',
    name: 'TechCorp SA',
    description: 'Empresa líder en soluciones tecnológicas, especializada en desarrollo web y móvil.',
    logo: null,
    website: 'https://techcorp.example.com',
    location: 'Buenos Aires, Argentina',
    size: '51-200',
    industry: 'Tecnología',
    foundedYear: 2015,
    linkedin: 'https://linkedin.com/company/techcorp-sa',
    verified: true,
    createdAt: new Date('2023-01-01'),
  }

  const [formData, setFormData] = useState({
    name: company.name,
    description: company.description,
    website: company.website,
    location: company.location,
    size: company.size,
    industry: company.industry,
    foundedYear: company.foundedYear.toString(),
    linkedin: company.linkedin,
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
      name: company.name,
      description: company.description,
      website: company.website,
      location: company.location,
      size: company.size,
      industry: company.industry,
      foundedYear: company.foundedYear.toString(),
      linkedin: company.linkedin,
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
              <span className="text-gray-900 font-medium">Perfil de empresa</span>
            </nav>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfil de empresa</h1>
                <p className="text-gray-600">Gestiona tu información corporativa y ofertas de trabajo</p>
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
                    src={company.logo}
                    alt={company.name}
                    fallback={company.name.charAt(0)}
                    size="xl"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">
                  {company.name}
                </h2>
                <Badge variant="success" className="mt-2">
                  <Building2 className="h-3 w-3 mr-1" />
                  Verificada
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{company.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{company.size} empleados</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Fundada en {company.foundedYear}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{company.industry}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">50+ estudiantes contactados</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Redes sociales</h3>
                <div className="flex gap-2">
                  <a
                    href={`https://${company.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Building2 className="h-4 w-4 text-gray-600" />
                  </a>
                </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de la empresa</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: TechCorp SA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe tu empresa, misión y valores"
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre de la empresa</label>
                    <p className="text-gray-900 mt-1">{company.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Descripción</label>
                    <p className="text-gray-900 mt-1 line-clamp-3">{company.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Company Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de la empresa</h3>
              {isEditing ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ubicación</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ciudad, país"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tamaño de la empresa</label>
                    <Input
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      placeholder="Ej: 51-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Industria</label>
                    <Input
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="Ej: Tecnología"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Año de fundación</label>
                    <Input
                      type="number"
                      value={formData.foundedYear}
                      onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                      placeholder="2015"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sitio web</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://company.example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
                    <Input
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/company/company-name"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Ubicación</label>
                    <p className="text-gray-900 mt-1">{company.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tamaño de la empresa</label>
                    <p className="text-gray-900 mt-1">{company.size} empleados</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Industria</label>
                    <p className="text-gray-900 mt-1">{company.industry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Año de fundación</label>
                    <p className="text-gray-900 mt-1">{company.foundedYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Sitio web</label>
                    <p className="text-gray-900 mt-1">
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {company.website}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">LinkedIn</label>
                    <p className="text-gray-900 mt-1">
                      <a href={company.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Perfil de empresa
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}