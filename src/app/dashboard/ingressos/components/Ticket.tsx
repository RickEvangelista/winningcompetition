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

const Ticket = forwardRef<HTMLDivElement, TicketProps>(
  ({ nome, email, cpf, evento, setor, codigo }, ref) => {
    return (
      <div
        ref={ref}
        className="p-6 w-[400px] border-2 border-custom-blue rounded-xl bg-white text-black"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-custom-blue">
          Ingresso
        </h2>
        <p><strong>Nome:</strong> {nome}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>CPF:</strong> {cpf}</p>
        <p><strong>Evento:</strong> {evento}</p>
        <p><strong>Setor:</strong> {setor}</p>
        <p className="mt-4 text-center font-mono text-xl">
          <strong>Código:</strong> {codigo}
        </p>
      </div>
    );
  }
);

Ticket.displayName = "Ticket";
export default Ticket;
