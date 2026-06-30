import type { Metadata } from 'next'
import { Oswald, Quattrocento } from 'next/font/google'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-oswald',
  display: 'swap',
})

const quattrocento = Quattrocento({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-quattrocento',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jai Sohal',
  description: 'Builder. 17. Auckland.',
  openGraph: {
    title: 'Jai Sohal',
    description: 'Builder. 17. Auckland.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${quattrocento.variable}`}>
      <body>{children}</body>
    </html>
  )
}
