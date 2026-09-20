import { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutWrapperProps extends PropsWithChildren {}

const LayoutWrapper = async ({ children }: LayoutWrapperProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default LayoutWrapper
