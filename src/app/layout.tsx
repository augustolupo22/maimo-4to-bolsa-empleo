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
    default: 'Bolsa Empleo - Facultad | Pasantías y Primer Empleo',
    template: '%s | Bolsa Empleo',
  },
  description: 'La bolsa de trabajo universitaria que conecta estudiantes con empresas para pasantías y primeras experiencias laborales.',
  keywords: ['pasantías', 'primer empleo', 'estudiantes', 'bolsa de trabajo', 'universidad', 'empleo junior'],
  authors: [{ name: 'Facultad' }],
  creator: 'Facultad',
  publisher: 'Facultad',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://bolsaempleo.facultad.edu.ar',
    siteName: 'Bolsa Empleo',
    title: 'Bolsa Empleo - Facultad | Pasantías y Primer Empleo',
    description: 'La bolsa de trabajo universitaria que conecta estudiantes con empresas para pasantías y primeras experiencias laborales.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bolsa Empleo - Facultad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bolsa Empleo - Facultad',
    description: 'La bolsa de trabajo universitaria que conecta estudiantes con empresas para pasantías y primeras experiencias laborales.',
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