import type { NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'
import { Locales } from '@/app/(frontend)/_locales/types'

const I18nMiddleware = createI18nMiddleware({
  locales: [...Object.values(Locales)],
  defaultLocale: Locales.EN,
  //urlMappingStrategy: 'redirect',
  urlMappingStrategy: 'rewriteDefault',
})

export function middleware(request: NextRequest) {
  console.log('🌐 [Middleware] Incoming URL:', request.nextUrl.pathname)

  const response = I18nMiddleware(request)

  console.log('➡️ [Middleware] Response Status:', response.status)
  if (response.headers.get('location')) {
    console.log('🔀 [Middleware] Redirecting to:', response.headers.get('location'))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|_next/data|favicon.ico|admin|.*\\..*).*)'],
}
