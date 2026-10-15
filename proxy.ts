import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Nothing is intercepted here any more. Which page the site root shows used
// to be a hardcoded redirect to /music in this file; it is now resolved from
// Settings > Home page in app/page.tsx, so that renaming the page cannot
// break the site root — and so Malak can choose the landing page herself.
//
// An empty matcher means this never runs. The file is kept only because
// Next.js treats proxy.ts as a convention; it can be deleted outright if the
// site never needs request interception.
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
