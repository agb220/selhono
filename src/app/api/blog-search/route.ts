import { getPayload } from '@/lib/payload'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const locale = searchParams.get('locale') || 'en'

  if (!q.trim()) {
    return NextResponse.json({ docs: [] })
  }

  const payload = await getPayload()

  const res = await payload.find({
    collection: 'posts',
    limit: 5,
    locale: locale as any,
    where: {
      title: {
        like: q,
      },
    },
  })

  return NextResponse.json({ docs: res.docs })
}
