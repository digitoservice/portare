import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // const isAuthenticated = await authenticated()

  // if (isAuthenticated && pathname.startsWith('/auth')) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // if (!isAuthenticated) {
  //   return NextResponse.redirect(new URL('/auth', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
