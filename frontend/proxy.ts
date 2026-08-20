import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { decodeJwt } from "jose";

// middleware que redirige al usuario a /login en caso de que su token JWT no
// sea válido.
// Se ejecuta en las rutas definidas en config
export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  if (accessToken && _isTokenValid(accessToken)) return NextResponse.next();
  // borrar la cookie en caso de que haya expirado el token JWT
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("access_token");
  return response;
}
// verifica que el token JWT recibido tenga estructura válida y timestamp válido
function _isTokenValid(token: string): boolean {
  try {
    const { exp } = decodeJwt(token);
    if (typeof exp !== "number") return false;
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
export const config = {
  matcher: ["/", "/projects/:path*"],
};
