import type { Metadata } from 'next'
import { Noto_Sans_TC, Inter } from 'next/font/google'
import './globals.css'
import { content } from '@/lib/content'

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-zh-next',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-latin-next',
  display: 'swap',
})

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  keywords: ['汽車美容', '汽車保養', '改裝升級', '找店家', '車主App', '線上預約', '汽車服務平台', 'Carmate', '卡媒', '台灣車主', '保養廠', '汽車APP'],
  icons: {
    icon: '/carmate-logo.png',
    apple: '/carmate-logo.png',
  },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: 'https://tgcarauto.com',
    siteName: content.meta.brandName,
    images: [{ url: '/carmate-logo.png', width: 512, height: 512 }],
    locale: 'zh_TW',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tgcarauto.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Carmate',
  alternateName: '卡媒',
  description: content.meta.description,
  url: 'https://tgcarauto.com',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS, Android',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
  publisher: {
    '@type': 'Organization',
    name: 'Carmate Inc.',
    url: 'https://tgcarauto.com',
    logo: 'https://tgcarauto.com/carmate-logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={content.meta.lang} className={`${notoSansTC.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
