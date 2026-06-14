import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Bolsa de Empleo - Universidad Maimónides | Pasantías y Primer Empleo',
    template: '%s | Bolsa Empleo UNM',
  },
  description: 'La bolsa de trabajo oficial de la Universidad Maimónides. Conectamos estudiantes y graduados con empresas para pasantías, trabajos part-time y primeras experiencias profesionales.',
  keywords: ['pasantías', 'primer empleo', 'estudiantes', 'bolsa de trabajo', 'universidad maimónides', 'empleo junior', 'graduados', 'Argentina'],
  authors: [{ name: 'Universidad Maimónides' }],
  creator: 'Universidad Maimónides',
  publisher: 'Universidad Maimónides',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://bolsaempleo.maimonides.edu.ar',
    siteName: 'Bolsa Empleo UNM',
    title: 'Bolsa de Empleo - Universidad Maimónides',
    description: 'La bolsa de trabajo oficial de la Universidad Maimónides. Conectamos estudiantes y graduados con empresas.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bolsa de Empleo - Universidad Maimónides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bolsa de Empleo - Universidad Maimónides',
    description: 'La bolsa de trabajo oficial de la Universidad Maimónides. Conectamos estudiantes y graduados con empresas.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col font-sans text-gray-900 bg-gray-50">
        <Providers>
          <Header />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}