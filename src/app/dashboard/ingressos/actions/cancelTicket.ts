"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function cancelTicket(
  id: number) {
  const id_ingresso = id;

  if (!id_ingresso || isNaN(id_ingresso))
    return {
      success: false,
      message: "ID inválido",
    };
  try {
    await prisma.$transaction(async (tx) => {
      const ticket = await tx.ingresso.findUnique({
        where: { id_ingresso },
      });

      if (!ticket) throw new Error("Ingresso não encontrado");

      await tx.ingresso.update({
        where: { id_ingresso },
        data: {
          situacao: "Cancelado",
        },
      });
    });
    revalidatePath("/dashboard/ingressos");
    return {
      success: true,
      message: "Ingresso cancelado com sucesso",
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message: error.message ?? "Erro ao cancelar ingresso",
    };
  }
}
