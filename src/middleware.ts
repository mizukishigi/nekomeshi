import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// scenario-f step 2: middleware edit added on top of README-only PR
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
