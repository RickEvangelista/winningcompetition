"use server";

import React from "react";
import CreateSectorForm from "../components/CreateSectorForm";
import prisma from "@/lib/prisma";

export default async function page() {
  const events = await prisma.evento.findMany({});
  if (!events) {
    return [];
  }
  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center">
      <CreateSectorForm events={events} />
    </div>
  );
}
