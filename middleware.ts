import { authMiddleware, redirectToSignIn  } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
  debug: false,
  // Routes that can be accessed while signed out 
  publicRoutes: ['/', '/sign-in'],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ['/no-auth-in-this-route', '/api/test', '/api/user'],

  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow matched api/public requests
    if (auth.isApiRoute || auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  }
});

export const config = {
    // Protects all routes, including api/trpc.
    // See https://clerk.com/docs/references/nextjs/auth-middleware
    // for more information about configuring your Middleware
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};