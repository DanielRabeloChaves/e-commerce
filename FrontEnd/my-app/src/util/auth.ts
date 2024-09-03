import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = Boolean(sessionStorage.getItem('token'));

  const url = request.nextUrl.clone();
  url.pathname = '/login';

  if (!isAuthenticated && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}