"use server";

import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Button from "@/components/Button";
import CardListEvents from "./components/CardListEvents";

export default async function page() {
  const sectors = await prisma.setor.findMany({
    orderBy: {id_setor: "desc"}
  });
  return (
    <div className="flex flex-col min-h-screen w-full gap-5">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-5xl font-semibold">Gerenciar setores</h1>
        <Link href={`/dashboard/setores/criar`}>
          <Button type="button">Novo setor</Button>
        </Link>
      </div>
      <CardlistSector sectors={sectors} />
    </div>
  );
}
