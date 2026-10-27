import '@/lib/auth/node-crypto'
import 'server-only'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from './config'
import { verifySessionToken } from './session'

export async function getSessionUsername(): Promise<string | null> {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value
  return verifySessionToken(token)
}
