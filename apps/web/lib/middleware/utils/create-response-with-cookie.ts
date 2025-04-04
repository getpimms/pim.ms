import { NextResponse } from "next/server";

export function createResponseWithCookie(
  response: NextResponse,
  { clickId, path }: { clickId: string; path: string },
): NextResponse {
  response.cookies.set("pimms_id", clickId, {
    path,
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
