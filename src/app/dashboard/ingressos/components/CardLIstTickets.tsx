"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import useFeedback from "@/hooks/useFeedback";
import { ticket } from "@/types/tickets";
import cancelTicket from "../actions/cancelTicket";

interface CardListTicketsProps {
  tickets: ticket[];
}

export default function CardListTickets({ tickets }: CardListTicketsProps) {
  const [search, setSearch] = useState("");
  const { showMessage } = useFeedback();

  const handleCancel = async (id: number) => {
    const result = await cancelTicket(id);
    showMessage(result);
  };
  const filteredItems = tickets.filter(
    (i) =>
      i.pessoa.nome_completo
        .toLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      i.situacao.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <div className="flex flex-col gap-5">
      <Input
        label={""}
        name={"filter"}
        placeholder={"Filtre ingressos por nome ou situacao"}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col">
        {filteredItems.length === 0 ? (
          <h2 className="text-3xl font-semibold">Nenhum ingresso encontrado</h2>
        ) : (
          <div className="grid grid-cols-1 md:grid cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((i) => (
              <div
                key={i.id_ingresso}
                className="flex flex-col border-t-4 border-custom-blue rounded-lg shadow-md hover:shadow-lg transition-shadow gap-4 p-5"
              >
                <h3 className="text-3xl font-sembold">
                  {i.pessoa.nome_completo}
                </h3>
                <p className="text-2xl">{i.codigo} - {i.situacao}</p>
                <p className="text-2xl">{i.setor.titulo_setor}</p>
                <div className="flex justify-between items-center">
                  <Link
                    className="text-custom-blue text-2xl hover:underline w-1/2"
                    href={`/dashboard/ingressos/${i.id_ingresso}/editar`}
                  >
                    Ver/Editar
                  </Link>
                  <Button
                    variant={"danger"}
                    type="button"
                    className="w-1/2"
                    onClick={() => handleCancel(i.id_ingresso)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
