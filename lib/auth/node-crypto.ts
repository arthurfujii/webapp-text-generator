import { webcrypto } from 'node:crypto'

// Node 18 does not expose WebCrypto on globalThis by default.
// This module is imported only from Node.js runtimes; middleware runs on Edge.
if (!globalThis.crypto)
  Object.defineProperty(globalThis, 'crypto', { value: webcrypto, configurable: true })
