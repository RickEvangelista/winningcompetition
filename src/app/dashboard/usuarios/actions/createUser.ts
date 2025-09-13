"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { userSchema } from "../schemas/userSchema";

export default async function createUser(
  prevState: FormState,
  formData: FormData
) {
  console.log(formData.getAll);
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

      if (!profile) throw new Error("Perfil não encontrado");

      let person = await prisma.pessoa.findUnique({
        where: { cpf },
      });

      if (!person) {
        person = await tx.pessoa.create({
          data: {
            nome_completo,
            email,
            cpf,
          },
        });
      }

      let user = await tx.usuario.findUnique({
        where: { pessoa_id_pessoa: person.id_pessoa },
      });

      if (user) throw new Error("Usuário já cadastrado no sistema");

      const hash = await bcrypt.hash(senha, 12);

      await tx.usuario.create({
        data: {
          senha: hash,
          perfil_id_perfil: profile.id_perfil,
          pessoa_id_pessoa: person.id_pessoa,
          criador_id_usuario: 14,
        },
      });
    });

    revalidatePath("/dashboard/usuarios");
    return {
      success: true,
      message: "Usuário cadastrado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao cadastrar usuário",
    };
  }
}
