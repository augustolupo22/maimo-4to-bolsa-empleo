import Link from 'next/link'
import { Briefcase, Mail, Phone, MapPin, Globe, Send, Code } from 'lucide-react'

const footerLinks = {
  estudiantes: [
    { label: 'Buscar ofertas', href: '/jobs' },
    { label: 'Empresas', href: '/companies' },
    { label: 'Crear perfil', href: '/auth/register?role=student' },
  ],
  empresas: [
    { label: 'Publicar oferta', href: '/auth/register?role=company' },
    { label: 'Gestionar ofertas', href: '/dashboard/jobs' },
    { label: 'Perfil de empresa', href: '/dashboard/companies' },
  ],
  universidad: [
    { label: 'Sobre la UMAI', href: '/about' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Preguntas frecuentes', href: '/faq' },
  ],
  legal: [
    { label: 'Términos y condiciones', href: '/terms' },
    { label: 'Política de privacidad', href: '/privacy' },
  ],
}

const socialLinks = [
  { icon: Globe, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Send, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Code, href: 'https://github.com', label: 'GitHub' },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Bolsa Empleo - Universidad Maimónides">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl transition-shadow">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Bolsa Empleo</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              La bolsa de trabajo oficial de la Universidad Maimónides. Conectamos talento con oportunidades.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Estudiantes</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.estudiantes.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Empresas</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.empresas.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Universidad</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.universidad.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Bolsa Empleo - Universidad Maimónides. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                <Mail className="h-3.5 w-3.5" />
                empleo@facultad.edu.ar
              </span>
              <span className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                <MapPin className="h-3.5 w-3.5" />
                Av. Universitaria 123, CABA
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
