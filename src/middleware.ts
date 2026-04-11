import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// scenario-c: touching auth-critical middleware to verify dynamic-judge flags as high
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
