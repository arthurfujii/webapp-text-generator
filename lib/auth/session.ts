import { AUTH_SESSION_MAX_AGE, getPasswordHash, getSessionSecret, isAuthUser } from './config'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

const MAX_TOKEN_LENGTH = 2048
const MAX_CLOCK_SKEW_MS = 60 * 1000

type SessionPayload = {
  sub: string
  iat: number
  exp: number
}

function encodeBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes)
    binary += String.fromCharCode(byte)

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function decodeBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  const binary = atob(padded)

  return Uint8Array.from(binary, char => char.charCodeAt(0))
}

async function getSigningKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function createSessionToken(username: string, now = Date.now()): Promise<string> {
  const secret = getSessionSecret()
  if (secret.length < 32)
    throw new Error('AUTH_SESSION_SECRET is not configured')

  const payload: SessionPayload = {
    sub: username,
    iat: now,
    exp: now + AUTH_SESSION_MAX_AGE * 1000,
  }
  const encodedPayload = encodeBase64Url(encoder.encode(JSON.stringify(payload)))
  const key = await getSigningKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(encodedPayload))

  return `${encodedPayload}.${encodeBase64Url(new Uint8Array(signature))}`
}

export async function verifySessionToken(token: string | null | undefined): Promise<string | null> {
  const secret = getSessionSecret()
  if (!token || token.length > MAX_TOKEN_LENGTH || secret.length < 32)
    return null

  const segments = token.split('.')
  if (segments.length !== 2 || !segments[0] || !segments[1])
    return null

  try {
    const key = await getSigningKey(secret)
    const signature = decodeBase64Url(segments[1])
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      encoder.encode(segments[0]),
    )
    if (!isValid)
      return null

    const payload = JSON.parse(decoder.decode(decodeBase64Url(segments[0]))) as Partial<SessionPayload>
    if (typeof payload.sub !== 'string' || !isAuthUser(payload.sub))
      return null
    if (!getPasswordHash(payload.sub))
      return null
    if (typeof payload.exp !== 'number' || payload.exp <= Date.now())
      return null
    if (typeof payload.iat !== 'number' || payload.iat > Date.now() + MAX_CLOCK_SKEW_MS)
      return null

    return payload.sub
  }
  catch {
    return null
  }
}
