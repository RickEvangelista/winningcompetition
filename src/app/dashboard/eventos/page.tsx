"use server";

import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/Button";
import CardListEvents from "./components/CardListEvents";

export default async function page() {
  const events = await prisma.evento.findMany({
    orderBy: {id_evento: "desc"}
  });
  return (
    <div className="flex flex-col min-h-screen w-full gap-5">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-5xl font-semibold">Gerenciar Eventos</h1>
        <Link href={`/dashboard/eventos/criar`}>
          <Button type="button">Novo Evento</Button>
        </Link>
      </div>
      <CardListEvents events={events} />
    </div>
  );
}
