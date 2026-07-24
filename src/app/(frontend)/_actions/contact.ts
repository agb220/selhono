'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

interface CreateContactDto {
  name: string
  phoneNumber: string
  text: string
}

export async function createContactRequestAction(data: CreateContactDto) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const result = await payload.create({
      collection: 'contact-requests',
      data: {
        name: data.name,
        phone: data.phoneNumber,
        message: data.text,
        status: 'new',
      },
    })

    return { success: true, id: result.id }
  } catch (error: any) {
    console.error('Error creating contact request:', error)
    return { success: false, error: error.message || 'Failed to submit request' }
  }
}
