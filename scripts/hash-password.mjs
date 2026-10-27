#!/usr/bin/env node
import { randomBytes, scryptSync } from 'node:crypto'

const args = process.argv.slice(2)

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage: npm run auth:hash -- [password]

Without a password argument, a strong random password is generated.
The script prints the password (only when generated) and the scrypt hash
to put in AUTH_USER_<NAME>_HASH.`)
  process.exit(0)
}

const providedPassword = args[0]
const password = providedPassword || randomBytes(24).toString('base64url')

if (password.length < 12) {
  console.error('Use a password with at least 12 characters.')
  process.exit(1)
}

const N = 16384
const r = 8
const p = 1
const salt = randomBytes(16)
// Keep these parameters in sync with lib/auth/password.ts.
const derivedKey = scryptSync(password, salt, 64, {
  N,
  r,
  p,
  maxmem: 64 * 1024 * 1024,
})
const hash = `scrypt:${N}:${r}:${p}:${salt.toString('base64url')}:${derivedKey.toString('base64url')}`

if (!providedPassword)
  console.log(`Password: ${password}`)
console.log(`Hash: ${hash}`)
