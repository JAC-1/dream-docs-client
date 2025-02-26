import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/tasks(.*)',
  '/api(.*)',
]);

// Protects the dashboard route
export default clerkMiddleware((auth, req) => {
  // Redirect if not authed correctly
  const userId = auth().userId;
  const homeURL = new URL('/', req.url);
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(homeURL);
  }

  // If user goes to sign-in page whiled signed in, redirect to dashboard
  const currentURL = new URL(req.url);
  if (userId && currentURL.pathname === '/sign-in') {
    return NextResponse.redirect(homeURL);
  }
});

// Protected routes based on the user's authentication status and the route they are trying to access
// export default clerkMiddleware((auth, req) => {
//   if (!auth().userId && isProtectedRoute(req)) {
//     // Add custom logic to run before redirecting

//     return auth().redirectToSignIn();
//   }
// });
//

// Protect routes based on user's roles
// export default clerkMiddleware((auth, req) => {
//     if (isProtectedRoute(req)) {
//         auth().protect((has) => {
//       return (
//         has({ permission: "org:sys_memberships:manage" }) ||
//         has({ permission: "org:sys_domains_manage" }),
//       );
//     });
//   }
// });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/',
  ],
};

const x = 5;
