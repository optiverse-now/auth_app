import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session;
  const isPublicPath = req.nextUrl.pathname === "/";
  const isAuthPath = req.nextUrl.pathname.startsWith("/auth");

  // 認証済みユーザーが認証ページにアクセスしようとした場合はリダイレクト
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 未認証ユーザーがプライベートページにアクセスしようとした場合はリダイレクト
  if (!isAuthenticated && !isPublicPath && !isAuthPath) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return NextResponse.next();
}

// 以下のパスには認証チェックを適用する
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};