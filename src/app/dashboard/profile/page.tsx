'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Textarea } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Save, User, GraduationCap, MapPin, Phone, Globe, ExternalLink, Edit, Loader2, Camera } from 'lucide-react'

export default function StudentProfilePage() {
  const { data: session, status, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [userImage, setUserImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    headline: '',
    bio: '',
    location: '',
    phone: '',
    website: '',
    linkedin: '',
    github: '',
  })

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.profile)
          setUserImage(data.user?.image || null)
          if (data.profile) {
            setFormData({
              headline: data.profile.headline || '',
              bio: data.profile.bio || '',
              location: data.profile.location || '',
              phone: data.profile.phone || '',
              website: data.profile.website || '',
              linkedin: data.profile.linkedin || '',
              github: data.profile.github || '',
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
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
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
  if (userRole !== 'STUDENT') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-main">
          <div className="text-center py-16">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Acceso no autorizado</h2>
            <Link href="/dashboard/companies/profile">
              <Button>Ir al perfil de empresa</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const skills = profile?.skills ? JSON.parse(profile.skills) : []

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('La imagen no puede superar 2MB')
      return
    }

    setIsUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('type', 'avatar')

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      if (!uploadRes.ok) {
        const err = await uploadRes.json()
        alert(err.error || 'Error al subir la imagen')
        return
      }

      const { url } = await uploadRes.json()
      setUserImage(url)

      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: url }),
      })

      await update()
    } catch (err) {
      console.error('Error uploading image:', err)
      alert('Error al subir la imagen')
    } finally {
      setIsUploading(false)
    }
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
            <span className="text-gray-900 font-medium">Mi perfil</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi perfil de estudiante</h1>
              <p className="text-gray-600">Gestiona tu informacion academica y profesional</p>
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
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div
                  className="relative inline-block cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar
                    src={userImage || (session?.user as any)?.image}
                    alt={(session?.user as any)?.name || 'Usuario'}
                    fallback={(session?.user as any)?.name?.charAt(0) || 'U'}
                    size="2xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {isUploading ? (
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    ) : (
                      <Camera className="h-8 w-8 text-white" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Click para cambiar foto</p>
                <h2 className="text-xl font-semibold text-gray-900 mt-3">
                  {(session?.user as any)?.name || 'Estudiante UMAI'}
                </h2>
                <Badge variant="success" className="mt-2">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  Estudiante UMAI
                </Badge>
              </div>

              <div className="space-y-3">
                {profile?.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.location}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{profile.phone}</span>
                  </div>
                )}
                {profile?.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Mi portafolio
                    </a>
                  </div>
                )}
                {profile?.linkedin && (
                  <div className="flex items-center gap-3 text-sm">
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>

              {skills.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Habilidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacion Basica</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Titulo profesional</label>
                    <Input
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      placeholder="Ej: Estudiante de Ingenieria en Sistemas"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Biografia</label>
                    <Textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Cuentanos sobre ti, tus intereses y objetivos"
                      rows={4}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Titulo profesional</label>
                    <p className="text-gray-900 mt-1">{profile?.headline || 'Sin definir'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Biografia</label>
                    <p className="text-gray-900 mt-1">{profile?.bio || 'Sin definir'}</p>
                  </div>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacion de Contacto</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ubicacion</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Ciudad, pais"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefono</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+54 11 1234-5678"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sitio web</label>
                    <Input
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://portfolio.example.com"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn</label>
                    <Input
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/usuario"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">GitHub</label>
                    <Input
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="https://github.com/usuario"
                      className="rounded-xl"
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
