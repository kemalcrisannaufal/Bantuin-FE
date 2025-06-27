import { NextRequest, NextResponse } from "next/server";
import { JWTExtended } from "./type/Auth";
import { getToken } from "next-auth/jwt";
import { environments } from "./config/environments";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environments.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/auth/:path", "/"],
};
