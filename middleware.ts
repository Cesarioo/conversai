import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // List of public routes that don't require authentication
  const publicRoutes = ['/login', '/setup-account']
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))

  if (!session && !isPublicRoute) {
    // Redirect to login if accessing a protected route without session
    return NextResponse.redirect(new URL('/login', req.url))
  } else if (session && req.nextUrl.pathname === '/login') {
    // Redirect to home if accessing login with a session
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 