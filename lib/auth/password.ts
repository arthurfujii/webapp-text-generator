import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import type { ScryptOptions } from 'node:crypto'

const SCRYPT_N = 16384
const SCRYPT_R = 8
const SCRYPT_P = 1
const KEY_LENGTH = 64
const MAX_MEM = 64 * 1024 * 1024
const HASH_PREFIX = 'scrypt'

// Keep these parameters in sync with scripts/hash-password.mjs.

// A fixed salt used to keep unknown-user checks as expensive as real ones.
const DUMMY_SALT = randomBytes(16)

const defaultOptions: ScryptOptions = {
  N: SCRYPT_N,
  r: SCRYPT_R,
  p: SCRYPT_P,
  maxmem: MAX_MEM,
}

function deriveKey(
  password: string,
  salt: Buffer,
  keyLength: number,
  options: ScryptOptions,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keyLength, options, (error, derivedKey) => {
      if (error)
        reject(error)
      else
        resolve(derivedKey)
    })
  })
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const derivedKey = await deriveKey(password, salt, KEY_LENGTH, defaultOptions)

  return [
    HASH_PREFIX,
    SCRYPT_N,
    SCRYPT_R,
    SCRYPT_P,
    salt.toString('base64url'),
    derivedKey.toString('base64url'),
  ].join(':')
}

type ParsedHash = {
  N: number
  r: number
  p: number
  salt: Buffer
  hash: Buffer
}

function parseStoredHash(stored: string): ParsedHash | null {
  const [prefix, n, r, p, salt, hash] = stored.split(':')
  if (prefix !== HASH_PREFIX || !n || !r || !p || !salt || !hash)
    return null

  const N = Number(n)
  const rValue = Number(r)
  const pValue = Number(p)

  if (!Number.isSafeInteger(N) || N < 16384 || N > 1048576)
    return null
  if (!Number.isSafeInteger(rValue) || rValue < 1 || rValue > 32)
    return null
  if (!Number.isSafeInteger(pValue) || pValue < 1 || pValue > 8)
    return null
  if (N * rValue > 262144)
    return null

  const saltBuffer = Buffer.from(salt, 'base64url')
  const hashBuffer = Buffer.from(hash, 'base64url')
  if (saltBuffer.length < 16 || hashBuffer.length < 32)
    return null

  return {
    N,
    r: rValue,
    p: pValue,
    salt: saltBuffer,
    hash: hashBuffer,
  }
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parsed = parseStoredHash(stored)
  if (!parsed)
    return false

  const derivedKey = await deriveKey(password, parsed.salt, parsed.hash.length, {
    N: parsed.N,
    r: parsed.r,
    p: parsed.p,
    maxmem: MAX_MEM,
  })

  return derivedKey.length === parsed.hash.length && timingSafeEqual(derivedKey, parsed.hash)
}

export async function simulatePasswordCheck(password: string): Promise<void> {
  await deriveKey(password, DUMMY_SALT, KEY_LENGTH, defaultOptions)
}
