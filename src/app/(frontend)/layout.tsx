import React from 'react'
import { DM_Serif_Display, Jost } from 'next/font/google'
import './styles.css'

export const metadata = {
  description: "SELHONO - Let's make your home beautiful together",
  title: 'SELHONO',
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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${dmSerif.variable} ${jost.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
