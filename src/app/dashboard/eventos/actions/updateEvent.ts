"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";
import { eventSchema } from "../schemas/eventSchema";

export default async function updateEvent(
  prevState: FormState,
  formData: FormData
) {
  const id_evento = Number(formData.get("id_evento"));

  if (!id_evento || isNaN(id_evento))
    return {
      success: false,
      message: "ID inválido",
    };

  const validateData = eventSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validateData.success)
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Dados inválidos",
    };

  const { titulo_evento, capacidade, dt_fim, dt_inicio } = validateData.data;

  try {
    await prisma.$transaction(async (tx) => {
      const event = await tx.evento.findUnique({
        where: { id_evento },
      });

      if (!event) throw new Error("Evento não encontrado");

      await tx.evento.update({
        where: { id_evento },
        data: {
          titulo_evento,
          dt_inicio,
          dt_fim,
          capacidade,
        },
      });
    });
    revalidatePath("/dashboard/eventos");
    return {
      success: true,
      message: "Evento atualizado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao atualizar Evento",
    };
  }
}
