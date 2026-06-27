'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Menu, X, Briefcase, Building2, User, LogOut, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { href: '/jobs', label: 'Ofertas' },
  { href: '/companies', label: 'Empresas' },
]

export function Header() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  if (status === 'loading') {
    return (
      <header className="border-b border-gray-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-sm">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">Bolsa Empleo</span>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  const userRole = (session?.user as any)?.role
  const isCompany = userRole === 'COMPANY'
  const isAdmin = userRole === 'ADMIN'

  return (
    <header className={`border-b sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'border-gray-200/60 bg-white/80 backdrop-blur-xl shadow-sm'
        : 'border-transparent bg-white/60 backdrop-blur-md'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Bolsa Empleo - Inicio">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 hidden sm:block">Bolsa Empleo</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <Avatar
                    src={(session.user as any)?.image}
                    alt={(session.user as any)?.name || 'Usuario'}
                    fallback={(session.user as any)?.name || 'U'}
                    size="sm"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {(session.user as any)?.name}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white/95 backdrop-blur-xl py-1.5 shadow-xl ring-1 ring-gray-200/60 focus:outline-none z-20 animate-scale-in">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{(session.user as any)?.name}</p>
                        <p className="text-xs text-gray-500 capitalize mt-0.5">{(session.user as any)?.role?.toLowerCase()}</p>
                      </div>
                      
                      {isCompany && (
                        <>
                          <Link
                            href="/dashboard/jobs"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Briefcase className="h-4 w-4" />
                            Mis ofertas
                          </Link>
                          <Link
                            href="/dashboard/companies"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Building2 className="h-4 w-4" />
                            Perfil empresa
                          </Link>
                        </>
                      )}
                      
                      {!isCompany && !isAdmin && (
                        <>
                          <Link
                            href="/dashboard/applications"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Briefcase className="h-4 w-4" />
                            Mis postulaciones
                          </Link>
                          <Link
                            href="/dashboard/profile"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            Mi perfil
                          </Link>
                        </>
                      )}
                      
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Panel admin
                        </Link>
                      )}

                      <div className="mx-4 my-1 border-t border-gray-100" />
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-sm">Iniciar sesión</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="text-sm rounded-xl shadow-sm hover:shadow-md transition-shadow">Registrarse</Button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mx-3 my-2 border-t border-gray-100" />
              {session ? (
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-gray-900">{(session.user as any)?.name}</p>
                  <p className="text-xs text-gray-500 capitalize mt-0.5">{(session.user as any)?.role?.toLowerCase()}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-3">
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl">Iniciar sesión</Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full rounded-xl">Registrarse</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
