"use client";

import React, { forwardRef } from "react";

interface TicketProps {
  nome: string;
  email: string;
  cpf: string;
  evento: string;
  setor: string;
  codigo: string;
}

function TicketComponent({ nome, email, cpf, evento, setor, codigo,  }: TicketProps,  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className="p-6 w-[400px] border-2 border-custom-blue rounded-xl bg-white text-black">
      <h2 className="text-2xl font-bold text-center mb-4 text-custom-blue">
        Ingresso
      </h2>
      <p className="font-semibold">Nome: {nome}</p>
      <p className="font-semibold">Email: {email}</p>
      <p className="font-semibold">CPF: {cpf}</p>
      <p className="font-semibold">Evento: {evento}</p>
      <p className="font-semibold">Setor: {setor}</p>
      <p className="mt-4 text-center font-mono text-xl">
        Código: {codigo}
      </p>
    </div>
  );
}


const Ticket = forwardRef(TicketComponent);
Ticket.displayName = "Ticket";

export default Ticket;