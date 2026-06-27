import Link from 'next/link'
import { Button } from '@/components/ui'
import { Briefcase, Building2, GraduationCap, Search, ArrowRight, CheckCircle, Shield, Globe, Users2, BookOpen } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Ofertas activas', icon: Briefcase },
  { value: '200+', label: 'Empresas registradas', icon: Building2 },
  { value: '50K+', label: 'Estudiantes UMAI conectados', icon: GraduationCap },
  { value: '95%', label: 'Tasa de respuesta', icon: CheckCircle },
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
    icon: Globe,
    title: 'Exclusivo para la UMAI',
    description: 'Solo ofertas laborales de empresas asociadas con la Universidad Maimónides. Conectamos talento universitario con oportunidades.',
  },
  {
    icon: BookOpen,
    title: 'Perfil académico UMAI',
    description: 'Tu perfil incluye tu carrera, facultad y año de cursada. Las empresas ven tu formación universitaria.',
  },
  {
    icon: Users2,
    title: 'Comunidad UMAI',
    description: 'Únete a miles de estudiantes y graduados de la UMAI que ya confían en nuestra bolsa de trabajo.',
  },
  {
    icon: CheckCircle,
    title: 'Postulación en un clic',
    description: 'Aplica a ofertas con tu perfil guardado, adjunta carta de presentación y haz seguimiento del estado.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Crea tu perfil',
    description: 'Regístrate como estudiante o empresa. Completa tu información académica o datos de la compañía.',
  },
  {
    number: '2',
    title: 'Explora y postúlate',
    description: 'Usa filtros inteligentes para encontrar ofertas relevantes. Postúlate con tu perfil en un clic.',
  },
  {
    number: '3',
    title: 'Conecta y crece',
    description: 'Recibe respuestas, agenda entrevistas y da el primer paso en tu carrera profesional.',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative container-main py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Nueva: Ofertas de verano 2026 disponibles
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance mb-6 animate-fade-in-up delay-100">
                Tu puente al{' '}
                <span className="text-gradient">mundo laboral</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-lg animate-fade-in-up delay-200">
                La bolsa de trabajo oficial de la Universidad Maimónides. Conectamos estudiantes y graduados con empresas para pasantías, trabajos part-time y primeras experiencias profesionales.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up delay-300">
                <Link href="/jobs">
                  <Button size="lg" className="w-full sm:w-auto gap-2 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 glow-primary-hover" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Explorar ofertas
                  </Button>
                </Link>
                <Link href="/auth/register?role=student">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 rounded-xl">
                    Crear perfil gratis
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="hidden lg:flex justify-center animate-fade-in-up delay-300">
              <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                      <Briefcase className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Desarrollador Frontend</h3>
                      <p className="text-sm text-gray-500">TechCorp S.A.</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">React</span>
                    <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">TypeScript</span>
                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Remoto</span>
                    <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">Part-time</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">$250K - $350K <span className="text-sm font-normal text-gray-500">/mes</span></span>
                    <span className="text-xs text-gray-400">Publicado hace 2 días</span>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100 animate-float">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">+12 postulaciones</p>
                      <p className="text-[10px] text-gray-500">Hoy</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl px-4 py-2.5 shadow-lg border border-gray-100 animate-float delay-500">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Empresa verificada</p>
                      <p className="text-[10px] text-gray-500">TechCorp S.A.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 card-hover animate-fade-in-up`} style={{ animationDelay: `${400 + i * 100}ms` }}>
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-3 mx-auto">
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
      <section className="section bg-white relative">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Diseñada exclusivamente para{' '}
              <span className="text-gradient-accent">la Universidad Maimónides</span>
            </h2>
            <p className="text-lg text-gray-600">
              Funcionalidades pensadas para que encontrar talento o tu primer trabajo sea simple, rápido y seguro.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <article key={feature.title} className="group p-7 rounded-2xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-xl transition-all duration-300 card-hover animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="relative container-main">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-gray-600">Tres pasos simples para conectar talento y oportunidades.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10" />
                )}
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white mb-6 shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
                    <span className="text-3xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary to-blue-600 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">¿Buscas tu primera experiencia laboral?</h3>
                <p className="text-blue-100 mb-8 max-w-sm leading-relaxed">Crea tu perfil de estudiante UMAI, explora ofertas de pasantías y trabajos junior, y postúlate en minutos.</p>
                <Link href="/auth/register?role=student">
                  <Button size="lg" variant="secondary" className="rounded-xl gap-2">
                    Crear perfil gratis
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative p-8 sm:p-10 rounded-3xl bg-gray-900 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                  <Building2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">¿Querés contratar talento de la UMAI?</h3>
                <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">Publicá tus búsquedas de pasantes y juniors, accedé a perfiles verificados de estudiantes y graduados.</p>
                <Link href="/auth/register?role=company">
                  <Button size="lg" variant="outline" className="rounded-xl gap-2 border-gray-700 text-white hover:bg-white/10 hover:text-white">
                    Registrar empresa
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
