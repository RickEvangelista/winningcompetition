"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export default async function deleteSector(id: number) {
  const id_setor = id;

  if (!id_setor || isNaN(id_setor))
    return {
      success: false,
      message: "ID inválido",
    };

  try {
    const result = await prisma.$transaction(async (tx) => {
      const sector = await tx.setor.findUnique({
        where: { id_setor },
      });

      if (!sector) throw new Error("Setor não encontrado");

      await tx.setor.delete({
        where: { id_setor },
      });

      revalidatePath("/dashboard/eventos");

      return {
        success: true,
        message: "Setor deletado com sucesso",
      };
    });
    return result;
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2003")
      return {
        success: false,
        message:
          "Não é possível apagar setores que já possuem ingressos vinculados",
      };
    return {
      success: false,
      message: error.message ?? "Erro ao deletar setor",
    };
  }
}
