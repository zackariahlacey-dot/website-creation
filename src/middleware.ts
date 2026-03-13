import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // 1. Update Supabase Session
  const supabaseResponse = await updateSession(request)
  
  // 2. Extract Location Data from Vercel Headers
  const city = request.headers.get('x-vercel-ip-city') || 'Burlington'
  const region = request.headers.get('x-vercel-ip-country-region') || 'VT'
  
  // 3. Add location headers to the response so components can read them
  supabaseResponse.headers.set('x-vizulux-city', city)
  supabaseResponse.headers.set('x-vizulux-region', region)
  
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
