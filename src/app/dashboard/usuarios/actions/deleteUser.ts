"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export default async function deleteUser(id: number) {
  const id_usuario = id;

  if (!id_usuario || isNaN(id_usuario))
    return {
      success: false,
      message: "ID inválido",
    };

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.usuario.findUnique({
        where: { id_usuario },
      });

      if (!user)
        return {
          success: false,
          message: "Usuário não encontrado",
        };

      await tx.usuario.delete({
        where: { id_usuario },
      });
    });

    revalidatePath("/dashboard/usuarios");
    return {
      success: true,
      message: "Usuário deletado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao deletar usuário",
    };
  }
}
