"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";
import { sectorSchema } from "../schemas/eventSchema";

export default async function createSector(
  prevState: FormState,
  formData: FormData
) {
  const validateData = sectorSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validateData.success)
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Dados inválidos",
    };

  const { titulo_setor, capacidade, evento_id_evento } = validateData.data;

  try {
    await prisma.$transaction(async (tx) => {
      const event = await tx.evento.findUnique({
        where: { id_evento: evento_id_evento },
        include: { setor: true },
      });

      if (!event) throw new Error("Evento não encontrado no sistema");

      const sectorExists = event.setor.find(
        (s) => s.titulo_setor.toLowerCase() === titulo_setor.toLowerCase()
      );

      if (sectorExists) throw new Error("Esse setor já existe no evento");

      const oldCapacity = event.setor.reduce((acc, s) => acc + s.capacidade, 0);

      const newCapacity = oldCapacity + capacidade;

      if (newCapacity > event.capacidade)
        throw new Error(
          "A capacidade do setor excede a capacidade restante do evento"
        );

      await tx.setor.create({
        data: {
          titulo_setor,
          capacidade,
          evento_id_evento: event.id_evento,
        },
      });
    });

    revalidatePath("/dashboard/setores");
    return {
      success: true,
      message: "Setor cadastrado com sucesso!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao cadastrar setor",
    };
  }
}
