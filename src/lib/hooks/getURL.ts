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
  media: string | any | null | undefined
  defaultImage?: { src: string }
  size?: 'thumbnail' | 'card' | 'slider' | 'big' | 'large' | 'pngSlider' | 'pngBig'
}) => {
  if (!params.media) return params.defaultImage?.src || ''

  if (typeof params.media === 'string') {
    if (params.media.startsWith('http://') || params.media.startsWith('https://')) {
      return params.media
    }
    return params.media.startsWith('/') ? params.media : `/${params.media}`
  }

  const mediaObj = params.media

  const formatUrl = (url: string | null | undefined) => {
    if (!url) return params.defaultImage?.src || ''
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return url.startsWith('/') ? url : `/${url}`
  }

  const size = params.size
  if (size && mediaObj.sizes?.[size]?.url) {
    return formatUrl(mediaObj.sizes[size].url)
  }

  return formatUrl(mediaObj.url)
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
