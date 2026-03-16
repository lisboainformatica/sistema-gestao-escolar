import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { Role } from "@prisma/client"
import { ROUTES_BY_ROLE } from "./lib/rbac"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Sort routes by length descending to match most specific route first
    const sortedRoutes = Object.keys(ROUTES_BY_ROLE).sort((a, b) => b.length - a.length);

    for (const route of sortedRoutes) {
      if (path.startsWith(route)) {
        const allowedRoles = ROUTES_BY_ROLE[route];
        if (!allowedRoles.includes(token.role as Role)) {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        }
        break; // Match found, stop checking
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
