import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const callbackUrl = encodeURIComponent(`${nextUrl.pathname}${nextUrl.search}`);

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
  const isAdminRoute = nextUrl.pathname.startsWith('/dashboard');
  const isCartRoute = nextUrl.pathname.startsWith('/cart');
  const isCheckoutRoute = nextUrl.pathname.startsWith('/checkout');
  const isOrdersRoute = nextUrl.pathname.startsWith('/orders');
  const isAuthRoute = ['/login', '/register'].includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute && isLoggedIn) {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }

    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl));
    }

    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
  }

  if ((isCartRoute || isCheckoutRoute || isOrdersRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
