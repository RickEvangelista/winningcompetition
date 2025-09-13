"use server";

import React from "react";
import UpdateUserForm from "../../components/UpdateUserForm";
import prisma from "@/lib/prisma";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const id_usuario = Number(id);

  const user = await prisma.usuario.findUnique({
    where: { id_usuario },
    include: { pessoa: true, perfil: true },
  });

  if (!user) return { success: false, message: "Usuário não encontrado" };

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <UpdateUserForm user={user} />
    </div>
  );
}
