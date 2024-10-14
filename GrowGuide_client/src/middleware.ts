import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getUser from "./hooks/getUser";

// This function can be marked `async` if using `await` inside

type Role = keyof typeof roleBasedRoutes;
const AuthRoutes = ["/login", "/registration"];
const roleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user: any = await getUser();
  // ! protected based
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  //* role based
  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/admin", "/login", "/register"],
};
