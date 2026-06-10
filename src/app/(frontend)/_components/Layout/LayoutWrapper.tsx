import { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutWrapperProps extends PropsWithChildren {
  params: Promise<{ locale: string }>
}

const LayoutWrapper = async ({ children, params }: LayoutWrapperProps) => {
  const { locale } = await params
  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  )
}

export default LayoutWrapper
