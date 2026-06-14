import React from 'react'
import { I18nProviderClient } from '../_locales/client'

interface SubLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function SubLayout({ params, children }: SubLayoutProps) {
  const { locale } = await params

  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
}
