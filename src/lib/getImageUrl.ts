import { Media } from '@/payload-types'

export const getImageUrl = (mediaField: string | Media | null | undefined): string => {
  if (!mediaField) return ''

  if (typeof mediaField === 'object' && 'url' in mediaField) {
    return mediaField.url || ''
  }

  return typeof mediaField === 'string' ? mediaField : ''
}
