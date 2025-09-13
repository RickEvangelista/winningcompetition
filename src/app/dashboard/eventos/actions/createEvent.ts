"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";
import { eventSchema } from "../schemas/eventSchema";

export default async function createEvent(
  prevState: FormState,
  formData: FormData
) {
  const validateData = eventSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validateData.success)
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Dados inválidos",
    };

  const { titulo_evento, capacidade, dt_fim, dt_inicio } =
    validateData.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const event = await tx.evento.findUnique({
        where: { titulo_evento },
      });

      if (event) throw new Error("Evento já cadastrado no sistema");

      await tx.evento.create({
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
      message: "Evento cadastrado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002")
      return {
        success: false,
        message: "Titulo de evento já está em uso",
      };
    return {
      success: false,
      message: error.message ?? "Erro ao cadastrar evento",
    };
  }
}
