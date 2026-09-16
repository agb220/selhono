import React from 'react'
import { setStaticParamsLocale } from 'next-international/server'
import LayoutWrapper from './_components/Layout/LayoutWrapper'
import { I18nProviderClient } from '../_locales/client'
import { Locales } from '../_locales/types'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return Object.values(Locales).map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  setStaticParamsLocale(locale)

  return (
    <I18nProviderClient locale={locale}>
      <LayoutWrapper>{children}</LayoutWrapper>
    </I18nProviderClient>
  )
}
