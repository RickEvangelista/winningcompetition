import z from "zod";


export const userSchema = z.object({
    nome_completo: z.string().min(3, "Digite um nome completo válido por favor"),
    email: z.email().min(3, "Digite um email válido por favor"),
    cpf: z.string().transform((val)=> val.replace(/\D/g, "")).refine((val)=> val.length === 11, {message: "O cpf deve ter 11 dígitos "}),
    senha: z.string().min(6, "Digite uma senha válida por favor"),
    perfil: z.string().min(5, "Selecione um perfil válido por favor"),
})


export type NewUserData = z.infer<typeof userSchema>;