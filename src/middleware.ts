import { NextResponse } from "next/server"

export function middleware() {
  NextResponse.next()
}

export const config = {
  matcher: [
    // Match everything except /api routes and Next.js internals (_next)
    "/((?!api|_next/static|_next/image|.*\\.(?:png|svg|ico)$).*)",
  ],
}
