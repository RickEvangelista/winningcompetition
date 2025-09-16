import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type Role = "Administrador" | "Vendedor" | "Validador";

const rolePermissions: Record<Role, string[]> = {
  Administrador: ["/dashboard"],
  Vendedor: ["/dashboard/perfil", "/dashboard/ingressos/criar"],
  Validador: ["/dashboard/perfil", "/dashboard/validacao"],
};

export async function middleware(req: Request) {
  const session = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = session.user?.profile as Role | undefined;

  if (!role || !Object.keys(rolePermissions).includes(role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (role === "Administrador") return NextResponse.next();

  const allowedRoutes = rolePermissions[role];
  const hasAccess = allowedRoutes.some(route => pathname.startsWith(route));

  if (!hasAccess) return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
