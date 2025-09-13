"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export default async function deleteEvent(id: number) {
  const id_evento = Number(id);

  if (!id_evento || isNaN(id_evento))
    return {
      success: false,
      message: "ID inválido",
    };

  try {
    await prisma.$transaction(async (tx) => {
      const event = await tx.evento.findUnique({
        where: { id_evento },
      });

      if (!event)
        return {
          success: false,
          message: "Evento não encontrado",
        };

      await tx.evento.delete({
        where: { id_evento },
      });
    });
    revalidatePath("/dashboard/eventos");

    return {
      success: true,
      message: "Evento deletado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2003")
      return {
        success: false,
        message: "Não é possível apagar eventos que já possuem setores ativos"
      };
    return {
      success: false,
      message: error.message ?? "Erro ao deletar evento",
    };
  }
}
