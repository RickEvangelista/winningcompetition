"use server";

import React from "react";
import prisma from "@/lib/prisma";
import UpdateSectorForm from "../../components/UpdateFormSector";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const id_setor = Number(id);

  const sector = await prisma.setor.findUnique({
    where: { id_setor },
    include: { evento: true },
  });

  const events = await prisma.evento.findMany({
    orderBy: { id_evento: "desc" },
  });

  if (!events)
    return (
      <div className="flex flex-col min-h-screen w-full justify-center items-center">
        <p className="text-3xl text-center">Nenhum evento encontrado</p>
      </div>
    );

  if (!sector)
    return (
      <div className="flex flex-col min-h-screen w-full justify-center items-center">
        <p className="text-3xl text-center">Nenhum Setor encontrado</p>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <UpdateSectorForm sector={sector} events={events} />
    </div>
  );
}
