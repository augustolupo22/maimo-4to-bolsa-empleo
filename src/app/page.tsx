import Link from 'next/link'
import { Button } from '@/components/ui'
import { Briefcase, Building2, GraduationCap, Search, ArrowRight, CheckCircle, Shield, Users, TrendingUp } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Ofertas activas', icon: Briefcase },
  { value: '200+', label: 'Empresas registradas', icon: Building2 },
  { value: '50K+', label: 'Estudiantes conectados', icon: GraduationCap },
  { value: '95%', label: 'Tasa de respuesta', icon: TrendingUp },
]

const features = [
  {
    icon: Search,
    title: 'Búsqueda inteligente',
    description: 'Filtros por tipo de trabajo, modalidad, experiencia, ubicación y habilidades para encontrar la oferta perfecta.',
  },
  {
    icon: Shield,
    title: 'Empresas verificadas',
    description: 'Todas las empresas pasan por un proceso de verificación para garantizar ofertas legítimas y seguras.',
  },
  {
    icon: Users,
    title: 'Perfil estudiante completo',
    description: 'Crea tu perfil académico y profesional, sube tu CV y recibe recomendaciones personalizadas.',
  },
  {
    icon: CheckCircle,
    title: 'Postulación en un clic',
    description: 'Aplica a ofertas con tu perfil guardado, adjunta carta de presentación y haz seguimiento del estado.',
  },
]

const ctaSections = [
  {
    title: '¿Buscas tu primera experiencia laboral?',
    description: 'Crea tu perfil de estudiante, explora cientos de ofertas de pasantías y trabajos junior, y postúlate en minutos.',
    buttonText: 'Crear perfil gratis',
    buttonHref: '/auth/register?role=student',
    icon: GraduationCap,
    variant: 'primary',
  },
  {
    title: '¿Querés contratar talento universitario?',
    description: 'Publica tus búsquedas de pasantes y juniors, accede a perfiles verificados y conecta con la futura fuerza laboral.',
    buttonText: 'Registrar empresa',
    buttonHref: '/auth/register?role=company',
    icon: Building2,
    variant: 'secondary',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-white to-white py-20 lg:py-32">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Nueva: Ofertas de verano 2026 disponibles
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance mb-6 animate-in">
              Tu puente al{' '}
              <span className="text-gradient">mundo laboral</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-in">
              La bolsa de trabajo universitaria que conecta estudiantes con empresas para pasantías, trabajos part-time y primeras experiencias profesionales.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in">
              <Link href="/jobs">
                <Button size="lg" className="w-full sm:w-auto gap-2" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Explorar ofertas
                </Button>
              </Link>
              <Link href="/auth/register?role=student">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Registrarse gratis
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4 mx-auto">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Diseñada para <span className="text-primary">estudiantes</span> y <span className="text-primary">empresas</span>
            </h2>
            <p className="text-lg text-gray-600">
              Funcionalidades pensadas para que encontrar talento o tu primer trabajo sea simple, rápido y seguro.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <article key={feature.title} className="group p-6 rounded-xl border border-gray-100 bg-white hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Sections */}
      <section className="section bg-gray-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8">
            {ctaSections.map((cta, i) => (
              <Link key={cta.buttonHref} href={cta.buttonHref} className="group">
                <div className={`p-8 rounded-2xl ${i === 0 ? 'bg-primary text-white' : 'bg-white border border-gray-200 hover:border-primary/50 hover:shadow-lg'} transition-all duration-300 h-full`}>
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                    {i === 0 ? (
                      <cta.icon className="h-7 w-7 text-primary bg-white" />
                    ) : (
                      <cta.icon className="h-7 w-7 text-primary" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{cta.title}</h3>
                  <p className="mb-6 opacity-90">{cta.description}</p>
                  <Button
                    variant={i === 0 ? 'secondary' : 'outline'}
                    className="w-full sm:w-auto"
                    rightIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  >
                    {cta.buttonText}
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-gray-600">Tres pasos simples para conectar talento y oportunidades.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-1 h-24 bg-gray-200 md:hidden" />
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Crea tu perfil</h3>
                <p className="text-gray-600">Regístrate como estudiante o empresa. Completa tu información académica o datos de la compañía.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-1 h-24 bg-gray-200 md:hidden" />
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Explora y postúlate</h3>
                <p className="text-gray-600">Usa filtros inteligentes para encontrar ofertas relevantes. Postúlate con tu perfil en un clic.</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Conecta y crece</h3>
                <p className="text-gray-600">Recibe respuestas, agenda entrevistas y da el primer paso en tu carrera profesional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-primary text-white">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de estudiantes y empresas que ya confían en Bolsa Empleo para conectar talento con oportunidades.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register?role=student">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Crear mi perfil gratis
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Ver ofertas actuales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}