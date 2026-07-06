'use server'

import { getPayload } from '@/lib/payload'

export async function createReviewOnlyAction(data: {
  author: string
  location: string
  text: string
  avatarId: string | null
}) {
  try {
    const payload = await getPayload()

    await payload.create({
      collection: 'reviews',
      data: {
        author: data.author,
        location: data.location,
        text: data.text,
        isApproved: false,
        ...(data.avatarId && { avatar: data.avatarId }),
      },
      disableTransaction: true,
    })

    return { success: true }
  } catch (error: any) {
    console.error('Server action review error:', error)
    return { success: false, error: error.message || 'Server error' }
  }
}
