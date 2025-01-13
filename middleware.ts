import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.has('user')

  console.log('API Request:', request.method, request.nextUrl.pathname)

  if (pathname.startsWith('/account') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',       
    '/account/:path*',  
  ],}

