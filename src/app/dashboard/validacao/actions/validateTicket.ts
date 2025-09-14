"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";

export default async function validateTicket(
  prevState: FormState,
  formData: FormData
) {
  const code = String(formData.get("codigo")).toUpperCase();

  try {
    await prisma.$transaction(async (tx) => {
      if (!code || code.length !== 6) throw new Error("Código inválido");

      const ticket = await tx.ingresso.findUnique({
        where: { codigo: code },
      });

      if (!ticket || ticket.situacao === "Cancelado")
        throw new Error("Ingresso inválido");

      if (ticket.situacao === "Validado")
        throw new Error("Ingresso já foi validado");

      await tx.ingresso.update({
        where: { id_ingresso: ticket.id_ingresso },
        data: {
          situacao: "Validado",
          validador_id_usuario: 17,
          dt_validacao: new Date(),
        },
      });
    });

    revalidatePath("/dashboard/ingressos");

    return {
      success: true,
      message: "Ingresso validado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao validar ingresso",
    };
  }
}
