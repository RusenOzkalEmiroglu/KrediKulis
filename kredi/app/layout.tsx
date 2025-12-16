import './globals.css'
import { Montserrat, Open_Sans, Roboto_Mono } from 'next/font/google'
import Footer from './components/Footer'
import MainMenu from './components/MainMenu'
import Masthead from './components/Masthead'
import HomeCarousel from './components/HomeCarousel'
import { Metadata } from 'next'
import { headers } from 'next/headers'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Kredi Kulis',
  description: 'Türkiye\'s Finansal Süpermarketi',
  icons: {
    icon: '/images/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const isAdminPage = pathname.startsWith('/admin');
  const isHomePage = pathname === '/' || pathname === '';

  return (
    <html lang="tr" className={`${montserrat.variable} ${openSans.variable} ${robotoMono.variable}`}>
      <body className="flex min-h-screen flex-col font-body transparent-selection text-secondary">
        {!isAdminPage && (
          <>
            {/* Masthead alanı - menünün üzerinde */}
            {isHomePage && <Masthead />}
            <MainMenu />
          </>
        )}
        <main className={`flex-grow ${isHomePage ? 'mt-0' : 'mt-5'}`}>
          {children}
        </main>
        {!isAdminPage && <HomeCarousel />}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}
