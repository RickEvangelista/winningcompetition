"use server";

import React from "react";
import prisma from "@/lib/prisma";
import UpdateEventForm from "../../components/UpdateFormUser";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const id_evento = Number(id)

  const event = await prisma.evento.findUnique({
    where: { id_evento },
  });

  if(!event) return {succes:false, message: "Evento não encontrado"}

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <UpdateEventForm event={event} />
    </div>
  );
}
