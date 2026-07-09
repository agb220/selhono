import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const S3_PUBLIC_URL = process.env.NEXT_PUBLIC_S3_PUBLIC_URL || ''

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['sharp'],

  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL, S3_PUBLIC_URL].filter(Boolean).map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
          port: url.port || undefined,
        }
      }),
    ],
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },

  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
