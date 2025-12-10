"use server";

import prisma from "@/lib/prisma";

export async function getAllEventsReports(eventoId: number) {
  const events = await prisma.evento.findMany({
    include: {
      setor: {
        include: { ingresso: true},
      },
    },
  });

  return  events.map((event) => ({
    id: event.id_evento,
    titulo: event.titulo_evento,
    setores: event.setor.map((sector)=> {
      const vendidos = sector.ingresso.length;
      const validados = sector.ingresso.filter((i)=> i.situacao === "Validado").length;

      const ocupacao = (vendidos / sector.capacidade) * 100;
      return {
        nome: sector.titulo_setor,
        vendidos,
        validados,
        capacidade: sector.capacidade,
        ocupacao,
        status:
        ocupacao >= 100 ? "Esgotado" : ocupacao >= 80 ? "Crítico" : "Disponível",
      }
    })
  }))
}
