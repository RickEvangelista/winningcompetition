import z from "zod";


export const eventSchema = z.object({
    titulo_evento: z.string().min(1, "Digite um título de evento válido por favor"),
    dt_inicio: z.coerce.date(),
    dt_fim: z.coerce.date(),
    capacidade: z.coerce.number().positive("A capacidade mínima deve ser maior que 0"),
}).refine((data)=> data.dt_inicio <= data.dt_fim, { message: "A data de término deve ser posterior a data de início"})


export type NewEventSchema = z.infer<typeof eventSchema>;