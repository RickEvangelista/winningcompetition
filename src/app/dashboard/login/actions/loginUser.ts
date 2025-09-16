"use server";

import prisma from "@/lib/prisma";
import { FormState } from "@/types/formState";
import { signIn } from "next-auth/react";

export default async function loginUser(
  prevState: FormState,
  formData: FormData
) {
  const identifier = formData.get("identifier");
  const password = formData.get("password");
  try {
    await prisma.$transaction(async (tx) => {
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        return {
          success: false,
          message: result.error ?? "Erro ao cadastrar usuário",
        };
      }
    });

    return {
      success: true,
      message: "Usuário cadastrado com sucesso",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Erro ao fazer login",
    };
  }
}
