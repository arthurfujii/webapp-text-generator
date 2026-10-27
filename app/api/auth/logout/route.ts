import { NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME, AUTH_COOKIE_PATH } from '@/lib/auth/config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST() {
  const response = NextResponse.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } },
  )

  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: AUTH_COOKIE_PATH,
    maxAge: 0,
  })

  return response
}
