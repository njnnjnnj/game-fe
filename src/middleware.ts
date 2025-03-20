import { NextRequest, NextResponse } from 'next/server';

import { ROUTES } from './constants/routes';

export function middleware(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(userAgent);

  if (!isMobile) {
    return NextResponse.redirect(new URL(ROUTES.FORBIDDEN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next/static|_next/image|favicon.ico|forbidden).*)']
};