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
  size?: 'thumbnail' | 'card' | 'slider' | 'big' | 'large' | 'pngSlider' | 'pngBig'
}) => {
  if (!params.media || typeof params.media === 'string') {
    if (typeof params.media === 'string' && params.media.startsWith('/media')) {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${params.media}`
    }

    if (
      typeof params.media === 'string' &&
      (params.media.startsWith('http://') || params.media.startsWith('https://'))
    ) {
      return params.media
    }
    return params.defaultImage?.src || ''
  }

  const formatUrl = (url: string | null | undefined) => {
    if (!url) return params.defaultImage?.src || ''
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
  }

  const mediaObj = params.media as Media

  if (params.size === 'thumbnail' && mediaObj.sizes?.thumbnail?.url) {
    return formatUrl(mediaObj.sizes.thumbnail.url)
  }
  if (params.size === 'card' && mediaObj.sizes?.card?.url) {
    return formatUrl(mediaObj.sizes.card.url)
  }
  if (params.size === 'slider' && mediaObj.sizes?.slider?.url) {
    return formatUrl(mediaObj.sizes.slider.url)
  }
  if (params.size === 'big' && mediaObj.sizes?.big?.url) {
    return formatUrl(mediaObj.sizes.big.url)
  }
  if (params.size === 'large' && mediaObj.sizes?.large?.url) {
    return formatUrl(mediaObj.sizes.large.url)
  }
  if (params.size === 'pngSlider' && mediaObj.sizes?.pngSlider?.url) {
    return formatUrl(mediaObj.sizes.pngSlider.url)
  }
  if (params.size === 'pngBig' && mediaObj.sizes?.pngBig?.url) {
    return formatUrl(mediaObj.sizes.pngBig.url)
  }

  return formatUrl(params.media.url)
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
