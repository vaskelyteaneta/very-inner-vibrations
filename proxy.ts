import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Very Inner Vibrations is always the dark site, so its home page redirects
// straight to /music. (Malak Haynes is a fully separate deployment that
// redirects to /movies instead — see its own proxy.ts.)
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/music", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
