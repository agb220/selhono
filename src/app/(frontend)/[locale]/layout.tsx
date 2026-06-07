import React from 'react'
import { DM_Serif_Display, Jost } from 'next/font/google'
import { notFound } from 'next/navigation'

import LayoutWrapper from '../_components/Layout/LayoutWrapper'

import '../styles.css'
import { I18nProviderClient } from '../_locales/client'

export const metadata = {
  description: "SELHONO - Let's make your home beautiful together",
  title: 'SELHONO',
  icons: {
    icon: '../favicon.ico',
  },
}

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-jost',
})

interface FrontendLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function FrontendLayout(props: FrontendLayoutProps) {
  const { children, params } = props
  const { locale } = await params

  if (!locale.includes(locale)) {
    notFound()
  }

  return (
    <div className={`${dmSerif.variable} ${jost.variable} min-h-screen bg-white`}>
      <I18nProviderClient locale={locale}>
        <LayoutWrapper params={params as any}>{children}</LayoutWrapper>
      </I18nProviderClient>
    </div>
  )
}
