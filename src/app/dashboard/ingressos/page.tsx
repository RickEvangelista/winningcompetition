"use server";

import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/Button";
import CardListTickets from "./components/CardLIstTickets";

export default async function page() {
  const tickets = await prisma.ingresso.findMany({
    include: { pessoa: true, setor: true },
    orderBy: { id_ingresso: "desc" },
  });
  return (
    <div className="flex flex-col min-h-screen w-full gap-5">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-5xl font-semibold">Gerenciar ingressos</h1>
        <Link href={`/dashboard/ingressos/criar`}>
          <Button type="button">Novo ingresso</Button>
        </Link>
      </div>
      <CardListTickets tickets={tickets} />
    </div>
  );
}
