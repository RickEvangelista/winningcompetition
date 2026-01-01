import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type Role = "Administrador" | "Vendedor" | "Validador";

type RoleConfig = {
  home: string;
  allowedRoutes: string[];
};

const ROLE_CONFIG: Record<Role, RoleConfig> = {
  Administrador: {
    home: "/dashboard/eventos",
    allowedRoutes: ["/dashboard"],
  },
  Vendedor: {
    home: "/dashboard/ingressos/criar",
    allowedRoutes: [
      "/dashboard/perfil",
      "/dashboard/ingressos",
    ],
  },
  Validador: {
    home: "/dashboard/validacao",
    allowedRoutes: [
      "/dashboard/perfil",
      "/dashboard/validacao",
    ],
  },
};

export async function middleware(req: Request) {
  const session = await auth();
  const { pathname } = new URL(req.url);

  if (session && pathname === "/") {
    const role = session.user?.profile as Role | undefined;

    if (role && ROLE_CONFIG[role]) {
      return NextResponse.redirect(
        new URL(ROLE_CONFIG[role].home, req.url)
      );
    }
  }

  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session) {
    const role = session.user?.profile as Role | undefined;

    if (!role || !ROLE_CONFIG[role]) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const { allowedRoutes, home } = ROLE_CONFIG[role];

    const hasAccess = allowedRoutes.some(route =>
      pathname.startsWith(route)
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL(home, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
