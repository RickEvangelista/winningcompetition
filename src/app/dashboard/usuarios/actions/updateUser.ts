"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { userSchema, NewUserData } from "../schemas/userSchema";

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

  const { nome_completo, email, cpf, senha, perfil } =
    validateData.data as NewUserData;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.perfil.findUnique({
        where: { titulo_perfil: perfil },
      });

      if (!profile)
        return {
          success: false,
          message: "Perfil não encontrado",
        };

      let user = await tx.usuario.findUnique({
        where: { id_usuario },
      });

      if (!user)
        return {
          success: false,
          message: "Usuário não encontrado no sistema",
        };

      const updatedPerson = await tx.pessoa.update({
        where: {id_pessoa: user.pessoa_id_pessoa},
          data: {
            nome_completo,
            email,
            cpf,
          },
        });
      

      const hash = await bcrypt.hash(senha, 12);

      const updatedUser = await tx.usuario.update({
        where: {id_usuario},
        data: {
          senha: hash,
          perfil_id_perfil: profile.id_perfil,
        },
      });

      revalidatePath("/dashboard/usuarios");
      return {
        success: true,
        message: "Usuário atualizado com sucesso",
      };

    });

    return result;
  } catch (error) {
    console.log(error);
  }
  return {
    success: false,
    message: "Erro ao atualizar usuário",
  };
}
