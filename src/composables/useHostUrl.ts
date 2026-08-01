import { AUTH_ORIGIN, SITE_ORIGIN } from '@/config/site'

/** Constructs stable login/register URLs during SSR and in the browser. */
export function useHostUrl() {
  function getHostOrigin(): string {
    if (typeof document === 'undefined') return SITE_ORIGIN
    try {
      // iframe: read parent's origin
      if (window.parent !== window) {
        return window.parent.location.origin
      }
    } catch {
      // Cross-origin iframe: fall back to referrer
      if (document.referrer) {
        const url = new URL(document.referrer)
        return url.origin
      }
    }
    return window.location.origin
  }

  const hostOrigin = getHostOrigin()
  const llmOrigin = AUTH_ORIGIN

  function buildUrl(path: string): string {
    return `${llmOrigin}${path}`
  }

  const loginUrl = buildUrl('/login')
  const registerUrl = buildUrl('/register')

  return { hostOrigin, llmOrigin, loginUrl, registerUrl, buildUrl }
}
