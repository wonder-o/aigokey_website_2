export const SITE_ORIGIN = 'https://www.aigokey.com'
export const AUTH_ORIGIN = 'https://llm.aigokey.com'

export function normalizeSitePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || '/'
  if (pathname === '/') return '/'
  return `${pathname.replace(/\/+$/, '')}/`
}

export function canonicalUrl(path: string): string {
  return `${SITE_ORIGIN}${normalizeSitePath(path)}`
}
