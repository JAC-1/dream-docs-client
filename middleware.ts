import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/tasks(.*)',
  '/api(.*)',
]);

const clerkMw = clerkMiddleware((auth, req) => {
  // Never redirect in preview mode — sign-in page must be accessible for screenshots
  if (process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true') {
    return NextResponse.next();
  }

  // Redirect if not authed correctly
  const userId = auth().userId;
  const homeURL = new URL('/', req.url);
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(homeURL);
  }

  // If user goes to sign-in page while signed in, redirect to dashboard
  const currentURL = new URL(req.url);
  if (userId && currentURL.pathname === '/sign-in') {
    return NextResponse.redirect(homeURL);
  }
});

export default function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true') {
    return NextResponse.next();
  }
  return clerkMw(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/',
  ],
};
