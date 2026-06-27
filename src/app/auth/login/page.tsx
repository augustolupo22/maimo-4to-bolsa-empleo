'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Input } from '@/components/ui'
import { Eye, EyeOff, Mail, Lock, AlertCircle, Briefcase, GraduationCap, Building2 } from 'lucide-react'

const DEMO_STUDENT = { email: 'estudiante@test.com', password: 'password123' }
const DEMO_COMPANY = { email: 'empresa@test.com', password: 'password123' }

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('Email o contrasena incorrectos')
        setIsLoading(false)
      } else {
        const sessionRes = await fetch('/api/auth/session')
        const sessionData = await sessionRes.json()
        const role = sessionData?.user?.role
        if (role === 'COMPANY') {
          window.location.href = '/dashboard/companies'
        } else {
          window.location.href = '/dashboard/applications'
        }
      }
    } catch {
      setError('Error al conectar con el servidor')
      setIsLoading(false)
    }
  }

  const fillDemo = (role: 'student' | 'company') => {
    const demo = role === 'student' ? DEMO_STUDENT : DEMO_COMPANY
    setEmail(demo.email)
    setPassword(demo.password)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 animate-fade-in-up">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-8 group">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-xl transition-shadow">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">Bolsa Empleo UMAI</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar sesión</h2>
            <p className="text-gray-600">Accedé a tu cuenta para postularte a ofertas</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl py-8 px-6 sm:px-8 shadow-xl rounded-2xl border border-white/60">
            {/* Demo access */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/10 rounded-xl">
              <p className="text-sm text-primary font-semibold mb-3">Acceso rápido demo</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
                  onClick={() => fillDemo('student')}
                >
                  <GraduationCap className="h-4 w-4" />
                  Estudiante
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
                  onClick={() => fillDemo('company')}
                >
                  <Building2 className="h-4 w-4" />
                  Empresa
                </Button>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200/60 rounded-xl flex items-center gap-3 text-red-700 animate-scale-in">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="pl-11 rounded-xl h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-11 pr-11 rounded-xl h-12 border-gray-200 focus:border-primary focus:ring-primary/20"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300" loading={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-600">
            ¿No tenés cuenta?{' '}
            <Link href="/auth/register" className="text-primary font-semibold hover:text-primary-hover transition-colors">
              Registrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
