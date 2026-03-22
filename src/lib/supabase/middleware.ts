import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ログイン済みユーザーが認証ページにアクセスしたら元のページ or /explore にリダイレクト
  if (
    user &&
    (request.nextUrl.pathname.startsWith('/login') ||
     request.nextUrl.pathname.startsWith('/signup'))
  ) {
    const url = request.nextUrl.clone()
    const redirectTo = request.nextUrl.searchParams.get('redirect') || '/explore'
    url.pathname = redirectTo
    url.searchParams.delete('redirect')
    return NextResponse.redirect(url)
  }

  // 未ログインユーザーを /login にリダイレクト（元のURLを保存）
  if (
    !user &&
    request.nextUrl.pathname !== '/' &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/signup') &&
    !request.nextUrl.pathname.startsWith('/explore') &&
    !request.nextUrl.pathname.startsWith('/auth/callback') &&
    !request.nextUrl.pathname.startsWith('/privacy') &&
    !request.nextUrl.pathname.startsWith('/terms')
  ) {
    const url = request.nextUrl.clone()
    const redirectTo = request.nextUrl.pathname
    url.pathname = '/login'
    if (redirectTo !== '/') url.searchParams.set('redirect', redirectTo)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
