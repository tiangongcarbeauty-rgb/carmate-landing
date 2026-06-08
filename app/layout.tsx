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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={content.meta.lang} className={`${notoSansTC.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
