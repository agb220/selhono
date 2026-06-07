import type { NextRequest } from 'next/server'
import { createI18nMiddleware } from 'next-international/middleware'
import { Locales } from '@/app/(frontend)/_locales/types'

const I18nMiddleware = createI18nMiddleware({
  locales: [...Object.values(Locales)],
  defaultLocale: Locales.EN,
  //   urlMappingStrategy: 'rewrite',
  urlMappingStrategy: 'rewriteDefault',
})

export function middleware(request: NextRequest) {
  return I18nMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon\\.ico|robots\\.txt|admin).*)'],
}
