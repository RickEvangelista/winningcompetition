"use server";

import React from "react";
import prisma from "@/lib/prisma";
import UpdateTicketForm from "../../components/UpdateTicketForm";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const id_ingresso = Number(id);

  const ticket = await prisma.ingresso.findUnique({
    where: { id_ingresso },
    include: { pessoa: true, setor: true },
  });

  if (!ticket) return { success: false, message: "Ingresso não encontrado" };

  const events = await prisma.evento.findMany({
    select: { id_evento: true, titulo_evento: true },
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

  const sectorsData = sectors.map((s) => ({
    id_setor: s.id_setor,
    titulo_setor: `${s.titulo_setor} (Disponível: ${
      s.capacidade - s.ingresso.length
    }
    )`,
    capacidade: s.capacidade,
    evento_id_evento: s.evento_id_evento,
  }));

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <UpdateTicketForm events={events} sectors={sectorsData} ticket={ticket} />
    </div>
  );
}
