import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define which routes require authentication
        const protectedRoutes = ['/homepage', '/messages', '/timetable', '/search']
        const isProtectedRoute = protectedRoutes.some(route => 
          req.nextUrl.pathname.startsWith(route)
        )
        
        // If it's a protected route, check if user is authenticated
        if (isProtectedRoute) {
          return !!token
        }
        
        // Allow access to non-protected routes
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/homepage/:path*',
    '/messages/:path*',
    '/timetable/:path*',
    '/search/:path*'
  ]
}
