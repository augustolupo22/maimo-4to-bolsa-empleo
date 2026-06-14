import Link from 'next/link'
import { Briefcase, GraduationCap, Building2, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react'

const footerLinks = {
  estudiantes: [
    { label: 'Buscar ofertas', href: '/jobs' },
    { label: 'Empresas', href: '/companies' },
    { label: 'Crear perfil', href: '/auth/register?role=student' },
    { label: 'Guía de pasantías', href: '/guides/internships' },
  ],
  empresas: [
    { label: 'Publicar oferta', href: '/auth/register?role=company' },
    { label: 'Gestionar ofertas', href: '/dashboard/jobs' },
    { label: 'Perfil de empresa', href: '/dashboard/companies' },
    { label: 'Planes y precios', href: '/pricing' },
  ],
  facultad: [
    { label: 'Sobre nosotros', href: '/about' },
    { label: 'Convenios', href: '/agreements' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Preguntas frecuentes', href: '/faq' },
  ],
  legal: [
    { label: 'Términos y condiciones', href: '/terms' },
    { label: 'Política de privacidad', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Accesibilidad', href: '/accessibility' },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2" aria-label="Bolsa Empleo - Inicio">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Bolsa Empleo</span>
            </Link>
            <p className="text-base leading-relaxed max-w-xs">
              La bolsa de trabajo universitaria que conecta estudiantes con empresas para pasantías y primeras experiencias laborales.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Estudiantes</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.estudiantes.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-base hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Empresas</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.empresas.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-base hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Facultad</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.facultad.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-base hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-3" role="list">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-base hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Bolsa Empleo - Facultad. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                empleo@facultad.edu.ar
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                +54 11 1234-5678
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                Av. Universitaria 123, CABA
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}