"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { revalidatePath } from "next/cache";
import { sectorSchema } from "../schemas/ticketSchema";

export default async function updateTicket(
  prevState: FormState,
  formData: FormData
) {
  const id_ingresso = Number(formData.get("id_ingresso"));

  if (!id_ingresso || isNaN(id_ingresso))
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

  const { nome_completo, email, cpf, setor_id_setor } = validateData.data;

  try {
    let updatedTicket: any = null;

    await prisma.$transaction(async (tx) => {
      const sector = await tx.setor.findUnique({
        where: { id_setor: setor_id_setor },
        include: {
          evento: true,
        },
      });

      if (!sector) throw new Error("Setor não encontrado");

      const soldTickets = await tx.ingresso.count({
        where: {
          setor_id_setor,
          situacao: { in: ["Emitido", "Validado"] },
        },
      });

      const currentlyCapacity = sector.capacidade - soldTickets;

      if (currentlyCapacity <= 0) throw new Error("Capacidade esgotada");

      let person = await tx.pessoa.findUnique({
        where: { cpf },
      });

      if (!person) {
        person = await tx.pessoa.create({
          data: { nome_completo, email, cpf },
        });
      } else {
        person = await tx.pessoa.update({
          where: { cpf },
          data: { nome_completo, email, cpf },
        });
      }

      const ticketForCpf = await tx.ingresso.count({
        where: {
          pessoa_id_pessoa: person.id_pessoa,
          setor: { evento_id_evento: sector.evento_id_evento },
          NOT: { id_ingresso },
        },
      });

      if (ticketForCpf >= 5)
        throw new Error("Limite de ingressos por CPF atingido");

      updatedTicket = await tx.ingresso.update({
        where: { id_ingresso },
        data: {
          setor_id_setor: sector.id_setor,
          pessoa_id_pessoa: person.id_pessoa,
        },
        include: {
          pessoa: true,
          setor: {
            include: {
              evento: true,
            },
          },
        },
      });
    });

    revalidatePath("/dashboard/usuarios");
    return {
      success: true,
      message: "Ingresso atualizado com sucesso",
      codigo: updatedTicket.codigo,
      nome: updatedTicket.pessoa.nome_completo,
      email: updatedTicket.pessoa.email,
      cpf: updatedTicket.pessoa.cpf,
      evento: updatedTicket.setor.evento.titulo_evento,
      setor: updatedTicket.setor.titulo_setor,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao atualizar ingresso",
    };
  }
}
