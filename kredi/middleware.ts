import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is the simplest possible middleware
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: '/',
}