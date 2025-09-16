import z from "zod"
 
export const signInSchema = z.object({
  identifier: z.string()
    .min(4, "Email ou CPF inválidos"),
  password: z.string()
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 6 dígitos")
})