import z from "zod";

export const sectorSchema = z.object({
  nome_completo: z.string().min(3, "Digite um nome completo válido por favor"),
  email: z.email().min(3, "Digite um email válido por favor"),
  cpf: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
      message: "O cpf deve ter 11 dígitos ",
    }),
  setor_id_setor: z.coerce.number().positive("Escolha um evento válido"),
});
