"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import { sector } from "@/types/sectors";
import deleteSector from "../actions/deleteSector";
import useFeedback from "@/hooks/useFeedback";

interface CardlistSectorsProps {
  sectors: sector[];
}

export default function CardlistSectors({ sectors }: CardlistSectorsProps) {
  const [search, setSearch] = useState("");
    const { showMessage } = useFeedback();
  

  const handleDelete = async(id: number) => {
    const result = await deleteSector(id)
    showMessage(result)
  }

  const filteredItems = sectors.filter((i) =>
    i.titulo_setor.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <div className="flex flex-col gap-5">
      <Input
        label={""}
        name={"filter"}
        placeholder={"Filtre usuários por nome ou perfil"}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col">
        {filteredItems.length === 0 ? (
          <h2 className="text-3xl font-semibold">Nenhum setor encontrado</h2>
        ) : (
          <div className="grid grid-cols-1 md:grid cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((i) => (
              <div
                key={i.id_setor}
                className="flex flex-col border-t-4 border-custom-blue rounded-md shadow-md hover:shadow-lg transition-shadow gap-4 p-5"
              >
                <h3 className="text-3xl font-sembold">{i.titulo_setor}</h3>
                <p className="text-2xl">{i.capacidade}</p>
                <p className="text-2xl">{i.evento.titulo_evento}</p>
                <div className="flex justify-between items-center">
                  <Link
                    className="text-custom-blue text-2xl hover:underline w-1/2"
                    href={`/dashboard/setores/${i.id_setor}/editar`}
                  >
                    Ver/Editar
                  </Link>
                  <Button
                    variant={"danger"}
                    type="button"
                    className="w-1/2"
                    onClick={() => deleteSector(i.id_setor)}
                  >
                    Deletar
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
