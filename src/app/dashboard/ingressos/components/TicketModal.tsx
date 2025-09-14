"use client";

import React, { useRef } from "react";
import Ticket from "./Ticket";
import { useReactToPrint } from "react-to-print";
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

export default function TicketModal({
  open,
  onClose,
  ticketData,
}: TicketModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: `Ingresso: ${ticketData?.codigo}` });

  if (!open || !ticketData) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">

        <div className="print-container flex justify-center items-center">
          <Ticket {...ticketData} ref={contentRef} />
        </div>

        <div className="flex justify-between mt-6 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-white text-custom-blue border-4 border-custom-blue rounded-lg p-2 text-2xl font-semibold w-1/2"
          >
            Fechar
          </button>
          <Button
            type="button"
            onClick={reactToPrintFn}
            className="w-1/2"
          >
            Baixar
          </Button>
        </div>
      </div>
    </div>
  );
}
