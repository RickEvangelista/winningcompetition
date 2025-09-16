"use server"

import prisma from "@/lib/prisma"


export async function getReportsData(eventoId: number) {
  const setores = await prisma.setor.findMany({
    where: { evento_id_evento: eventoId },
    include: {
      ingresso: true,
    },
  })

  return setores.map((setor) => {
    const vendidos = setor.ingresso.length
    const validados = setor.ingresso.filter(i => i.situacao === "Validado").length
    const ocupacao = (vendidos / setor.capacidade) * 100

    return {
      nome: setor.titulo_setor,
      vendidos,
      validados,
      capacidade: setor.capacidade,
      ocupacao,
      status: ocupacao >= 100 ? "Esgotado" : ocupacao >= 90 ? "Crítico" : "Disponível",
    }
  })
}
