"use server";

import React from "react";
import prisma from "@/lib/prisma";
import CreateTicketForm from "../components/CreateTicketForm";

export default async function page() {
  const events = await prisma.evento.findMany({
    select: {id_evento: true, titulo_evento:true},
    orderBy: { id_evento: "desc" },
  });
  const sectors = await prisma.setor.findMany({
    orderBy: { id_setor: "desc" },
    include: {
      ingresso: {
        where: {
          situacao: {
            in: ["Emitido", "Validado"],
          },
        },
      },
    },
  });

  const sectorsData = sectors.map((s)=>({
    id_setor: s.id_setor,
    titulo_setor: `${s.titulo_setor} (Disponível: ${s.capacidade - s.ingresso.length}
    )`,
    capacidade: s.capacidade,
    evento_id_evento: s.evento_id_evento,
  }))

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <CreateTicketForm events={events} sectors={sectorsData} />
    </div>
  );
}
