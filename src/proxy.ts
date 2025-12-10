import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const userCookie = request.cookies.get("user")?.value
   const user = userCookie ? JSON.parse(userCookie) : null
    const role = user?.role

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.redirect(new URL("/posts", request.url));
  }
  const isPublishPath =
    pathname === "/sign-in" ||
    pathname === "/" ||
    pathname.startsWith("/assets");

    if(isPublishPath){
        return NextResponse.next()
    }

    if(!accessToken){
        return NextResponse.redirect(new URL('/sign-in',request.url))
    }

   

    if(pathname.startsWith("/admins") && role !== 'admin'){
        return NextResponse.redirect(new URL("no-access", request.url))
    } 

    return NextResponse.next()
}

   export const config = {
  matcher: [
    // исключаем api, next/static, next/image, favicon, ПЛЮС svg/png/jpg
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$).*)',
  ],
};
