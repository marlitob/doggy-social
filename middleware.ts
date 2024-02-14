export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/users/:path*", "/friendship/:path*", "/post/:path*", "/"],
};
