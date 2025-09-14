"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Ticket from "./Ticket";
import Button from "@/components/Button";

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  ticketData: {
    nome: string;
    email: string;
    cpf: string;
    evento: string;
    setor: string;
    codigo: string;
  } | null;
}

export default function TicketModal({ open, onClose, ticketData }: TicketModalProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  // ✅ use contentRef instead of print() callback
  const handlePrint = useReactToPrint({
    contentRef: ticketRef, // obrigatório na versão mais recente
    documentTitle: ticketData ? `Ingresso-${ticketData.codigo}` : "Ingresso",
  });

  if (!open || !ticketData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
        <h1 className="text-xl font-bold text-custom-blue mb-4">
          Ingresso criado!
        </h1>

        {/* O ref precisa estar aqui */}
        <div ref={ticketRef} className="flex justify-center items-center">
          <Ticket {...ticketData} />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300"
          >
            Fechar
          </button>
          <Button
          type="button"
            onClick={handlePrint}
          >
            Baixar
          </Button>
        </div>
      </div>
    </div>
  );
}
