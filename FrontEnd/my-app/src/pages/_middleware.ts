import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isAuthenticated = Boolean(sessionStorage.getItem('token')); // Use cookies ou outras formas para verificar a autenticação

  if (!isAuthenticated && request.nextUrl.pathname !== '/login') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}