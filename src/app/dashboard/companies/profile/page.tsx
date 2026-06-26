'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Save, Building2, Globe, MapPin, Users, Calendar, Edit, Loader2 } from 'lucide-react'
import { COMPANY_SIZES } from '@/lib/utils'

export default function CompanyProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    size: '',
    industry: '',
    linkedin: '',
  })

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.profile)
          if (data.profile) {
            setFormData({
              name: data.profile.name || '',
              description: data.profile.description || '',
              website: data.profile.website || '',
              location: data.profile.location || '',
              size: data.profile.size || '',
              industry: data.profile.industry || '',
              linkedin: data.profile.linkedin || '',
            })
          }
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inicia sesion para ver tu perfil</h2>
            <Link href="/auth/login">
              <Button>Iniciar sesion</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const userRole = (session.user as any)?.role
  if (userRole !== 'COMPANY') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Acceso no autorizado</h2>
            <Link href="/dashboard/profile">
              <Button>Ir al perfil de estudiante</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsEditing(false)
      }
    } catch (err) {
      console.error('Error saving profile:', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-main">
        <section className="bg-white border-b border-gray-200 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Perfil de empresa</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfil de empresa</h1>
              <p className="text-gray-600">Gestiona tu informacion corporativa</p>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                  Cancelar
                </Button>
                <Button onClick={handleSave} loading={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar perfil
              </Button>
            )}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <Avatar
                  src={profile?.logo}
                  alt={formData.name}
                  fallback={formData.name?.charAt(0) || 'E'}
                  size="xl"
                />
                <h2 className="text-xl font-semibold text-gray-900 mt-4">{formData.name || 'Mi Empresa'}</h2>
                {profile?.verified && (
                  <Badge variant="success" className="mt-2">
                    <Building2 className="h-3 w-3 mr-1" />
                    Verificada
                  </Badge>
                )}
              </div>

              <div className="space-y-3">
                {formData.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{formData.location}</span>
                  </div>
                )}
                {formData.size && (
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{formData.size} empleados</span>
                  </div>
                )}
                {formData.industry && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{formData.industry}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacion Basica</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripcion</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe tu empresa, mision y valores"
                      rows={4}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre de la empresa</label>
                    <p className="text-gray-900 mt-1">{formData.name || 'Sin definir'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Descripcion</label>
                    <p className="text-gray-900 mt-1">{formData.description || 'Sin definir'}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de la empresa</h3>
              {isEditing ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ubicacion</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ciudad, pais"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tamanio</label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Seleccionar</option>
                      {COMPANY_SIZES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Industria</label>
                    <Input
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="Ej: Tecnologia"
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
                    <label className="text-sm font-medium text-gray-700">Ubicacion</label>
                    <p className="text-gray-900 mt-1">{formData.location || 'Sin definir'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Tamanio</label>
                    <p className="text-gray-900 mt-1">{formData.size ? `${formData.size} empleados` : 'Sin definir'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Industria</label>
                    <p className="text-gray-900 mt-1">{formData.industry || 'Sin definir'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Sitio web</label>
                    <p className="text-gray-900 mt-1">
                      {formData.website ? (
                        <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {formData.website}
                        </a>
                      ) : 'Sin definir'}
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
