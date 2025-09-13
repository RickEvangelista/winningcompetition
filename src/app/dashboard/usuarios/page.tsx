"use server";

import React from "react";
import CardListUser from "./components/CardListUser";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/Button";

export default async function page() {
  const users = await prisma.usuario.findMany({
    include: { pessoa: true, perfil: true },
    orderBy: { id_usuario: "desc" },
  });
  return (
    <div className="flex flex-col min-h-screen w-full gap-5">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-5xl font-semibold">Gerenciar usuários</h1>
        <Link href={`/dashboard/usuarios/criar`}>
          <Button type="button">Novo usuário</Button>
        </Link>
      </div>
      <CardListUser users={users} />
    </div>
  );
}
