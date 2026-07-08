import type { StaticImageData } from 'next/image'

import type { Media } from '@/payload-types'
import canUseDOM from '../canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.SERVER_URL) {
    return process.env.SERVER_URL
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

export const getImageUrl = (params: {
  media: string | Media | { url: string } | null | undefined
  defaultImage?: StaticImageData
  size?:
    | 'thumbnail'
    | 'card'
    | 'slider'
    | 'big'
    | 'large'
    | 'pngCard'
    | 'pngSlider'
    | 'pngBig'
    | 'pngThumbnail'
}) => {
  if (!params.media) {
    return params.defaultImage?.src || ''
  }

  if (typeof params.media === 'string') {
    return params.media.startsWith('/media') ? params.media : params.defaultImage?.src || ''
  }

  const media = params.media as Media
  const mediaUrl = (params.size && media.sizes?.[params.size]?.url) || media.url

  if (!mediaUrl) {
    return params.defaultImage?.src || ''
  }

  return mediaUrl.startsWith('http') ? mediaUrl : `${process.env.NEXT_PUBLIC_SERVER_URL}${mediaUrl}`
}

export const getPngImageUrl = (params: {
  media: string | Media | { url: string } | null | undefined
  defaultImage?: StaticImageData
}) => {
  if (!params.media || typeof params.media === 'string') {
    if (typeof params.media === 'string' && params.media.startsWith('/media')) {
      return params.media
    }
    return params.defaultImage?.src || ''
  }
  return `${process.env.NEXT_PUBLIC_SERVER_URL}${params.media.url}`
}
