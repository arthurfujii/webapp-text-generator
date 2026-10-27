const WINDOW_MS = 10 * 60 * 1000
const MAX_FAILURES = 10
const MAX_ENTRIES = 10000

type AttemptRecord = {
  failures: number
  resetAt: number
}

type RateLimitResult = {
  limited: boolean
  retryAfterSeconds: number
}

const attempts = new Map<string, AttemptRecord>()

function pruneExpired(now: number) {
  if (attempts.size < MAX_ENTRIES)
    return

  for (const [key, record] of attempts) {
    if (record.resetAt <= now)
      attempts.delete(key)
  }

  if (attempts.size >= MAX_ENTRIES)
    attempts.clear()
}

// Process-local limiter: enough to slow down brute force in a single instance.
export function getRateLimit(key: string, now = Date.now()): RateLimitResult {
  pruneExpired(now)

  const record = attempts.get(key)
  if (!record || record.resetAt <= now || record.failures < MAX_FAILURES)
    return { limited: false, retryAfterSeconds: 0 }

  return {
    limited: true,
    retryAfterSeconds: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
  }
}

export function recordFailure(key: string, now = Date.now()): void {
  const record = attempts.get(key)
  if (!record || record.resetAt <= now) {
    attempts.set(key, { failures: 1, resetAt: now + WINDOW_MS })
    return
  }

  record.failures += 1
}

export function clearFailures(key: string): void {
  attempts.delete(key)
}
