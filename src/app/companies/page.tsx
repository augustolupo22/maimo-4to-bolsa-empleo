import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Avatar } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Building2, MapPin, Users, Briefcase, Globe, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Empresas',
  description: 'Conocé las empresas que publican ofertas en la Bolsa de Empleo UMAI.',
}

async function getCompanies() {
  const companies = await prisma.companyProfile.findMany({
    where: {
      jobs: { some: { status: 'PUBLISHED' } },
    },
    include: {
      user: { select: { id: true } },
      _count: { select: { jobs: { where: { status: 'PUBLISHED' } } } },
    },
    orderBy: { name: 'asc' },
  })
  return companies
}

export default async function CompaniesPage() {
  const companies = await getCompanies()

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-hero border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-mesh" />
        <div className="relative container-main py-12 lg:py-16">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Empresas</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 animate-fade-in-up">Empresas</h1>
            <p className="text-lg text-gray-600 animate-fade-in-up delay-100">
              {companies.length} {companies.length === 1 ? 'empresa' : 'empresas'} con ofertas activas
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          {companies.length === 0 ? (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-gray-100 mb-6">
                <Building2 className="h-10 w-10 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay empresas registradas aún</h2>
              <p className="text-gray-500">Volvé pronto para ver las empresas que se unen a la plataforma.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company, i) => (
                <article
                  key={company.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <Avatar
                        src={company.logo}
                        alt={company.name}
                        fallback={company.name.charAt(0)}
                        size="lg"
                      />
                      {company.verified && (
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                          <Building2 className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-gray-900 truncate">{company.name}</h2>
                      {company.industry && (
                        <p className="text-sm text-gray-500">{company.industry}</p>
                      )}
                    </div>
                  </div>

                  {company.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">{company.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                    {company.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {company.location}
                      </span>
                    )}
                    {company.size && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {company.size}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span className="font-medium text-gray-700">{company._count.jobs}</span>
                      {company._count.jobs === 1 ? 'oferta' : 'ofertas'} activas
                    </div>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                      >
                        Web
                        <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
