export const AUTH_USERS = ['afujii', 'bchenque'] as const
export type AuthUser = typeof AUTH_USERS[number]

export const AUTH_COOKIE_NAME = 'tap_session'
export const AUTH_SESSION_MAX_AGE = 60 * 60 * 24 * 7 // seven days

const basePath = (process.env.NEXT_PUBLIC_APP_BASE_URL_PATH || '').replace(/\/+$/, '')
export const AUTH_COOKIE_PATH = basePath || '/'

export function isAuthUser(value: string): value is AuthUser {
  return (AUTH_USERS as readonly string[]).includes(value)
}

export function getPasswordHash(username: string): string | null {
  switch (username) {
    case 'afujii':
      return process.env.AUTH_USER_AFUJII_HASH || null
    case 'bchenque':
      return process.env.AUTH_USER_BCHENQUE_HASH || null
    default:
      return null
  }
}

export function getSessionSecret(): string {
  return process.env.AUTH_SESSION_SECRET || ''
}

export function isAuthConfigured(): boolean {
  return getSessionSecret().length >= 32 && AUTH_USERS.every(username => Boolean(getPasswordHash(username)))
}
