import z from "zod";

export const signInSchema = z.object({
  identifier: z.string().min(1, "Email ou CPF inválidos"),
  password: z.string().min(4,"A senha deve ter no mínimo 4 dígitos"),
});
