import '@/lib/auth/node-crypto'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_PATH,
  AUTH_SESSION_MAX_AGE,
  getPasswordHash,
  isAuthConfigured,
  isAuthUser,
} from '@/lib/auth/config'
import { simulatePasswordCheck, verifyPassword } from '@/lib/auth/password'
import { clearFailures, getRateLimit, recordFailure } from '@/lib/auth/rate-limit'
import { createSessionToken } from '@/lib/auth/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }

type LoginBody = {
  username?: unknown
  password?: unknown
}

function json(message: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json(
    { message },
    { status, headers: { ...NO_STORE_HEADERS, ...headers } },
  )
}

function getClientKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return request.ip || forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(request: NextRequest) {
  if (!isAuthConfigured())
    return json('Sign-in is not configured. Contact the site administrator.', 503)

  const clientKey = getClientKey(request)
  const rateLimit = getRateLimit(clientKey)
  if (rateLimit.limited) {
    return json('Too many attempts. Please try again later.', 429, {
      'Retry-After': String(rateLimit.retryAfterSeconds),
    })
  }

  let body: LoginBody
  try {
    body = await request.json() as LoginBody
  }
  catch {
    recordFailure(clientKey)
    return json('Enter your username and password.', 400)
  }

  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!username || !password || username.length > 64 || password.length > 256) {
    recordFailure(clientKey)
    return json('Invalid username or password.', 401)
  }

  try {
    if (!isAuthUser(username)) {
      await simulatePasswordCheck(password)
      recordFailure(clientKey)
      return json('Invalid username or password.', 401)
    }

    const passwordHash = getPasswordHash(username)
    if (!passwordHash) {
      recordFailure(clientKey)
      return json('Invalid username or password.', 401)
    }

    const passwordMatches = await verifyPassword(password, passwordHash)
    if (!passwordMatches) {
      recordFailure(clientKey)
      return json('Invalid username or password.', 401)
    }

    clearFailures(clientKey)
    const token = await createSessionToken(username)
    const response = NextResponse.json(
      { ok: true, username },
      { headers: NO_STORE_HEADERS },
    )

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: AUTH_COOKIE_PATH,
      maxAge: AUTH_SESSION_MAX_AGE,
    })

    return response
  }
  catch {
    return json('Unable to sign in right now. Please try again.', 500)
  }
}
