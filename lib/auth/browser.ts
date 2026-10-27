import { APP_BASE_PATH } from '@/config'

export function redirectToLogin(): void {
  if (typeof window === 'undefined')
    return

  const pathname = window.location.pathname
  const isUnderBasePath = APP_BASE_PATH !== ''
    && (pathname === APP_BASE_PATH || pathname.startsWith(`${APP_BASE_PATH}/`))
  const appPathname = isUnderBasePath
    ? (pathname.slice(APP_BASE_PATH.length) || '/')
    : pathname
  const next = `${appPathname}${window.location.search}`
  const query = next === '/'
    ? ''
    : `?next=${encodeURIComponent(next)}`

  window.location.replace(`${APP_BASE_PATH}/login${query}`)
}
