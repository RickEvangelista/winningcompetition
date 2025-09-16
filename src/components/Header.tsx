"use client"

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { Profile } from "@/types/userRole";

interface HeaderProps {
  isLoggedIn: boolean;
  userRole: Profile;
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

  const mobileLinks = [
    ...links,
    isLoggedIn
      ? { href: "/dashboard/perfil", label: "Perfil" }
      : { href: "/login", label: "Login" },
  ];

  return (
    <header className="w-full bg-white p-5 flex items-center justify-between relative">
      {/* Logo à esquerda */}
      <div className="flex-shrink-0">
        <Link href={logoLink}>
          <Image src="/vertical_logo.svg" width={200} height={140} alt="Logo" />
        </Link>
      </div>

      {/* Links centralizados */}
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

      {/* Ícone de perfil à direita */}
      <div className="flex items-center md:flex-shrink-0">
        <div className="md:hidden">
          {/* Menu mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        <div className="hidden md:block ml-4">
          {isLoggedIn ? (
            <Link href="/dashboard/perfil">
              <User size={36} className="text-custom-dark-gray hover:text-custom-blue transition-colors" />
            </Link>
          ) : (
            <Link href="/login">
              <User size={36} className="text-custom-dark-gray hover:text-custom-blue transition-colors" />
            </Link>
          )}
        </div>
      </div>

      {/* Menu mobile aside */}
      {menuOpen && (
        <aside className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-5 flex flex-col gap-3">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-custom-dark-gray hover:bg-custom-blue hover:text-white rounded transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </aside>
      )}
    </header>
  );
}

export default Header;
