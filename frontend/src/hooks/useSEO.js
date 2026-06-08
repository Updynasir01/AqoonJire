import { useEffect } from 'react'

const SITE = 'AqoonJire'
const BASE = 'https://www.aqoonjire.com'
const DEFAULT_TITLE = 'AqoonJire — Online Courses in Somali | Learn Anytime'
const DEFAULT_DESC =
  "AqoonJire is Somalia's online learning platform. Learn IT, business, languages, health and more — taught in Somali by expert instructors."

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets per-page <title>, meta description, canonical and Open Graph/Twitter
 * mirrors. Works in this SPA because Googlebot renders JavaScript.
 * (Social scrapers that don't run JS fall back to the static tags in index.html.)
 */
export function useSEO({ title, description, path } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESC
    const url = path ? `${BASE}${path}` : `${BASE}/`

    document.title = fullTitle
    upsertMeta('name', 'description', desc)
    upsertCanonical(url)

    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', desc)
    upsertMeta('property', 'og:url', url)
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', desc)
  }, [title, description, path])
}
