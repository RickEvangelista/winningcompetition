import z from "zod";

export const sectorSchema = z.object({
  titulo_setor: z.string().min(1, "Digite um título de setor válido por favor"),
  capacidade: z.coerce
    .number()
    .positive("A capacidade mínima deve ser maior que 0"),
  evento_id_evento: z.coerce.number().positive("Escolha um evento válido"),
});