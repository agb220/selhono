import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold font-dm text-slate-800">
        SELHONO ({locale.toUpperCase()})
      </h1>
      <p className="mt-4 text-lg font-jost text-slate-600">
        Let's make your home beautiful together
      </p>
    </div>
  )
}
