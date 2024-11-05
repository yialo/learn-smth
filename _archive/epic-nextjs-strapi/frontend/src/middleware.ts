import { NextResponse, type NextRequest } from 'next/server';

import { fetchUserMeData } from '@/shared/api';

export async function middleware(request: NextRequest) {
  const user = await fetchUserMeData();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith('/dashboard') && user.ok === false) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
