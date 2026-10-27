import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME } from '@/lib/auth/config'
import { verifySessionToken } from '@/lib/auth/session'

const PUBLIC_PATHS = new Set([
  '/login',
  '/api/auth/login',
  '/api/auth/logout',
])

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = ''
  return NextResponse.redirect(url)
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const username = await verifySessionToken(request.cookies.get(AUTH_COOKIE_NAME)?.value)

  if (pathname === '/login')
    return username ? redirectTo(request, '/') : NextResponse.next()

  if (username || PUBLIC_PATHS.has(pathname))
    return NextResponse.next()

  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { message: 'Authentication required.' },
      { status: 401, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/login'
  loginUrl.search = ''
  if (pathname !== '/')
    loginUrl.searchParams.set('next', `${pathname}${search}`)

  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|woff|woff2|ttf|otf)$).*)',
  ],
}
