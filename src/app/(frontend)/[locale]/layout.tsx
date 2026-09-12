import React from 'react'
import { I18nProviderClient } from '../_locales/client'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
