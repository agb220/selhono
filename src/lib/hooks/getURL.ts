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
      return params.media
    }
    return params.defaultImage?.src || ''
  }
  if (
    params.size === 'thumbnail' &&
    params.media &&
    (params.media as Media).sizes &&
    (params.media as Media).sizes?.thumbnail &&
    (params.media as Media).sizes?.thumbnail?.url
  ) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${(params.media as Media).sizes?.thumbnail?.url}`
  }
  if (
    params.size === 'card' &&
    params.media &&
    (params.media as Media).sizes &&
    (params.media as Media).sizes?.card &&
    (params.media as Media).sizes?.card?.url
  ) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${(params.media as Media).sizes?.card?.url}`
  }
  if (
    params.size === 'slider' &&
    params.media &&
    (params.media as Media).sizes &&
    (params.media as Media).sizes?.slider &&
    (params.media as Media).sizes?.slider?.url
  ) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${(params.media as Media).sizes?.slider?.url}`
  }
  if (
    params.size === 'big' &&
    params.media &&
    (params.media as Media).sizes &&
    (params.media as Media).sizes?.card &&
    (params.media as Media).sizes?.big?.url
  ) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${(params.media as Media).sizes?.big?.url}`
  }
  if (
    params.size === 'large' &&
    params.media &&
    (params.media as Media).sizes &&
    (params.media as Media).sizes?.card &&
    (params.media as Media).sizes?.large?.url
  ) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${(params.media as Media).sizes?.large?.url}`
  }

  if (
    params.size === 'pngSlider' &&
    params.media &&
    (params.media as Media).sizes &&
    (params.media as Media).sizes?.card &&
    (params.media as Media).sizes?.pngSlider?.url
  ) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${(params.media as Media).sizes?.pngSlider?.url}`
  }

  if (
    params.size === 'pngBig' &&
    params.media &&
    (params.media as Media).sizes &&
    (params.media as Media).sizes?.card &&
    (params.media as Media).sizes?.pngBig?.url
  ) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${(params.media as Media).sizes?.pngBig?.url}`
  }

  return `${process.env.NEXT_PUBLIC_SERVER_URL}${params.media.url}`
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
