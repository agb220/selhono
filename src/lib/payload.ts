import { getPayload as getPayloadInit } from 'payload'
import config from '@/payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { instance: null, promise: null }
}

export const getPayload = async () => {
  if (cached.instance) {
    const mongooseConnection = (cached.instance.db as any)?.connection
    if (mongooseConnection && mongooseConnection.readyState === 0) {
      cached.instance = null
      cached.promise = null
    } else {
      return cached.instance
    }
  }

  if (!cached.promise) {
    cached.promise = config.then((resolvedConfig) => getPayloadInit({ config: resolvedConfig }))
  }

  try {
    cached.instance = await cached.promise
    return cached.instance
  } catch (error) {
    cached.promise = null
    throw error
  }
}
