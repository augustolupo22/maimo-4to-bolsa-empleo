import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Avatar } from '@/components/ui'
import { Badge } from '@/components/ui'
import { Building2, MapPin, Users, Briefcase, Globe } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Empresas',
  description: 'Conoce las empresas que publican ofertas en la Bolsa de Empleo UMAI.',
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
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="container-main py-12 lg:py-16">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Empresas</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Empresas</h1>
            <p className="text-lg text-gray-600">
              {companies.length} {companies.length === 1 ? 'empresa' : 'empresas'} con ofertas activas
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-main">
          {companies.length === 0 ? (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No hay empresas registradas aun</h2>
              <p className="text-gray-500">Vuelve pronto para ver las empresas que se unen a la plataforma.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <article
                  key={company.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar
                      src={company.logo}
                      alt={company.name}
                      fallback={company.name.charAt(0)}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-lg text-gray-900 truncate">{company.name}</h2>
                      {company.industry && (
                        <p className="text-sm text-gray-500">{company.industry}</p>
                      )}
                    </div>
                    {company.verified && (
                      <Badge variant="success" className="flex items-center gap-1 shrink-0">
                        <Building2 className="h-3 w-3" />
                        Verificada
                      </Badge>
                    )}
                  </div>

                  {company.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{company.description}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                    {company.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {company.location}
                      </span>
                    )}
                    {company.size && (
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {company.size}
                      </span>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Briefcase className="h-4 w-4" />
                      {company._count.jobs} {company._count.jobs === 1 ? 'oferta' : 'ofertas'} activas
                    </div>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        <Globe className="h-4 w-4" />
                        Web
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
