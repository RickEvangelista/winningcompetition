import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const rolePermissions = {
  administrador: ["/dashboard"], // Admin pode acessar qualquer subrota
  vendedor: ["/dashboard/perfil", "/dashboard/ingressos"],
  validador: ["/dashboard/perfil", "/dashboard/validacao"],
};

export async function middleware(req: Request) {
  const session = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Se não estiver logado, redireciona para login
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = session.user?.perfil;

  // Se o usuário não tem role válida
  if (!role || !["administrador", "vendedor", "validador"].includes(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Se for admin, pode acessar qualquer rota em /dashboard
  if (role === "administrador") {
    return NextResponse.next();
  }

  // Verifica se a URL começa com alguma rota permitida para o role
  const allowedRoutes = rolePermissions[role];
  const hasAccess = allowedRoutes.some(route => pathname.startsWith(route));

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protege todas as rotas dentro de /dashboard
};
