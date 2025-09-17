"use client"

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Profile } from "@/types/userRole";
import Button from "./Button";
import { signOut } from "next-auth/react";

interface HeaderProps {
  isLoggedIn: boolean;
  userRole?: Profile;
}

const menuLinks: Record<Profile, { href: string; label: string }[]> = {
  Administrador: [
    { href: "/dashboard/eventos", label: "Eventos" },
    { href: "/dashboard/setores", label: "Setores" },
    { href: "/dashboard/usuarios", label: "Usuários" },
    { href: "/dashboard/ingressos", label: "Ingressos" },
    { href: "/dashboard/validacao", label: "Validação" },
    { href: "/dashboard/relatorios", label: "Relatórios" },
  ],
  Vendedor: [],
  Validador: [],
};

const initialPage: Record<Profile, string> = {
  Administrador: "/dashboard",
  Validador: "/dashboard/validacao",
  Vendedor: "/dashboard/ingressos/criar",
};

function Header({ isLoggedIn, userRole }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = userRole ? menuLinks[userRole] : [];
  const logoLink = isLoggedIn && userRole ? initialPage[userRole] : "/";

  return (
    <header className="w-full bg-white p-5 flex items-center relative">
      <div className="flex-shrink-0">
        <Link href={logoLink}>
          <Image src="/vertical_logo.svg" width={200} height={140} alt="Logo" />
        </Link>
      </div>

      <ul className="hidden lg:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-custom-dark-gray hover:text-custom-blue transition-colors font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ml-auto flex items-center gap-4">
        <div className="md:hidden">
          <button aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {isLoggedIn && (
          <div className="hidden md:block">
            <Button onClick={() => signOut({ callbackUrl: "/" })} variant="alert">
              Logout
            </Button>
          </div>
        )}
      </div>

      {menuOpen && (
        <aside className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-custom-dark-gray hover:bg-custom-blue hover:text-white rounded transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-100">
            {isLoggedIn && (
              <Button
                onClick={() => {
                  setMenuOpen(false); // fecha o menu antes de deslogar
                  signOut({ callbackUrl: "/" });
                }}
                variant="alert"
              >
                Logout
              </Button>
            )}
          </div>
        </aside>
      )}
    </header>
  );
}

export default Header;
