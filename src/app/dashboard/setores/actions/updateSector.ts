"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";
import { sectorSchema } from "../schemas/eventSchema";

export default async function updateSector(
  prevState: FormState,
  formData: FormData
) {
  const id_setor = Number(formData.get("id_setor"));

  if (!id_setor || isNaN(id_setor))
    return {
      success: false,
      message: "ID inválido",
    };

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

      const sector = await tx.setor.findUnique({
        where: { id_setor },
      });

      if (!sector) throw new Error("Setor não encontrado no sistema");

      const duplicatedName = event.setor.find(
        (s) => s.titulo_setor.toLowerCase() === titulo_setor.toLowerCase() && s.id_setor !== id_setor
      );

      if (duplicatedName) throw new Error("Esse setor já existe no evento");

      const currentCapacity = event.setor.reduce(
        (acc, s) => acc + s.capacidade,
        0
      );

      const newCapacity = currentCapacity - sector.capacidade + capacidade;

      if (newCapacity > event.capacidade)
        throw new Error(
          "A capacidade do setor excede a capacidade restante do evento"
        );

      await tx.setor.update({
        where: { id_setor },
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
      message: "Setor atualizado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao atualizar setor",
    };
  }
}
