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
  metadataBase: new URL('https://tgcarauto.com'),
  title: content.meta.title,
  description: content.meta.description,
  keywords: ['汽車美容', '汽車美容預約', '洗車預約', '鍍膜', '線上預約', '汽車美容店家招募', 'Carllection', '雙北汽車美容', '車聚', '汽車APP'],
  icons: {
    icon: '/carllection-icon.png',
    apple: '/carllection-icon.png',
  },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: 'https://tgcarauto.com',
    siteName: content.meta.brandName,
    images: [{ url: '/carllection-og.png', width: 1200, height: 630 }],
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
  name: 'Carllection',
  description: content.meta.description,
  url: 'https://tgcarauto.com',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'iOS, Android',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
  publisher: {
    '@type': 'Organization',
    name: '俥盛科技有限公司',
    url: 'https://tgcarauto.com',
    logo: 'https://tgcarauto.com/carllection-icon.png',
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
