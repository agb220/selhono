import React from 'react'
import { DM_Serif_Display, Jost } from 'next/font/google'
import './styles.css'

export const metadata = {
  description: "SELHONO - Let's make your home beautiful together",
  title: 'SELHONO',
  icons: {
    icon: '../(frontend)/favicon.ico',
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

interface SubLayoutProps {
  children: React.ReactNode
}

export default async function FrontendLayout({ children }: SubLayoutProps) {
  return (
    <html className={`${dmSerif.variable} ${jost.variable}`} suppressHydrationWarning>
      <head></head>
      <body>{children}</body>
    </html>
  )
}
