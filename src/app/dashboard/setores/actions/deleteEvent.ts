"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export default async function deleteUser(id: number) {
  const id_evento = Number(id);

  if (!id_evento || isNaN(id_evento))
    return {
      success: false,
      message: "ID inválido",
    };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.evento.findUnique({
        where: { id_evento },
      });

      if (!user)
        return {
          success: false,
          message: "Perfil não encontrado",
        };

      const deletedUser = await tx.evento.delete({
        where:{ id_evento},
      });

      revalidatePath("/dashboard/eventos");

      return {
        success: true,
        message: "Evento deletado com sucesso",
      };
    });
    return result;
  } catch (error) {
    console.log(error);
  }
  return {
    success: false,
    message: "Erro ao deletar usuário",
  };
}
