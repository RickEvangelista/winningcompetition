"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { userSchema } from "../schemas/userSchema";

export default async function updateUser(
  prevState: FormState,
  formData: FormData
) {
  const id_usuario = Number(formData.get("id_usuario"));

  if (!id_usuario || isNaN(id_usuario))
    return {
      success: false,
      message: "ID inválido",
    };

  const validateData = userSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateData.success)
    return {
      success: false,
      message: validateData.error.issues[0]?.message ?? "Dados inválidos",
    };

  const { nome_completo, email, cpf, senha, perfil } = validateData.data;

  try {
    await prisma.$transaction(async (tx) => {
      const profile = await tx.perfil.findUnique({
        where: { titulo_perfil: perfil },
      });

      if (!profile) throw new Error("Usuário não encontrado");

      let user = await tx.usuario.findUnique({
        where: { id_usuario },
      });

      if (!user) throw new Error("Perfil não encontrado");

      await tx.pessoa.update({
        where: { id_pessoa: user.pessoa_id_pessoa },
        data: {
          nome_completo,
          email,
          cpf,
        },
      });

      const hash = await bcrypt.hash(senha, 12);

      await tx.usuario.update({
        where: { id_usuario },
        data: {
          senha: hash,
          perfil_id_perfil: profile.id_perfil,
        },
      });
    });
    revalidatePath("/dashboard/usuarios");
    return {
      success: true,
      message: "Usuário atualizado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002")
      return {
        success: false,
        message: "Esse cpf já pertence a outro usuário",
      };
    return {
      success: false,
      message: error.message ?? "Erro ao atualizar usuário",
    };
  }
}
