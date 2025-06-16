import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  
  // Handle Next.js static assets
  if (url.pathname.startsWith('/_next/')) {
    try {
      return await getAssetFromKV(event)
    } catch (e) {
      return new Response(`Next.js static asset not found: ${url.pathname}`, { status: 404 })
    }
  }

  // Handle public static assets
  if (!url.pathname.startsWith('/api/')) {
    try {
      return await getAssetFromKV(event)
    } catch (e) {
      // If not found in public, try as a dynamic route
      try {
        const response = await fetch(event.request)
        return response
      } catch (e) {
        return new Response(`Asset not found: ${url.pathname}`, { status: 404 })
      }
    }
  }

  // Handle API routes
  try {
    const response = await fetch(event.request)
    return response
  } catch (e) {
    return new Response(`API error: ${url.pathname}`, { status: 500 })
  }
} 