const MAX_NEXT_PATH_LENGTH = 2048

export function sanitizeNextPath(value: string | string[] | undefined | null): string {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw || raw.length > MAX_NEXT_PATH_LENGTH)
    return '/'
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\'))
    return '/'
  if (raw === '/login' || raw === '/login/' || raw.startsWith('/login?'))
    return '/'
  if (raw.startsWith('/api/'))
    return '/'

  return raw
}
