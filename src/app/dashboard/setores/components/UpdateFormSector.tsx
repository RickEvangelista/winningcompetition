"use client";

import Input from "@/components/Input";
import { FormState } from "@/types/formState";
import React, { useActionState, useEffect } from "react";
import Button from "@/components/Button";
import updateSector from "../actions/updateSector"; 
import { sectorWithEvent } from "@/types/sectors";
import { event } from "@/types/event";
import Dropdown from "@/components/Dropdown";
import useFeedback from "@/hooks/useFeedback";

interface UpdateSectorProps {
  sector: sectorWithEvent;
  events: event[];
}

export default function UpdateSectorForm({
  sector,
  events,
}: UpdateSectorProps) {
  const initialState: FormState = { success: false, message: "" };
  const [state, dispatch] = useActionState(updateSector, initialState);
  const { showMessage } = useFeedback();

  useEffect(() => {
    state.message && showMessage(state);
  }, [state, showMessage]);

  const eventsFiltered = events.map((e) => ({
    label: e.titulo_evento,
    value: e.id_evento,
  }));

  return (
    <form
      action={dispatch}
      className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg"
    >
      <h1 className="text-4xl font-semibold text-center text-custom-blue">
        Atualizar setor
      </h1>

      <input type="hidden" name="id_setor" value={sector.id_setor} />

      <Input
        label="Título setor:"
        name="titulo_setor"
        placeholder="Digite o título do setor"
        defaultValue={sector.titulo_setor}
      />

      <Input
        label="Capacidade:"
        name="capacidade"
        type="number"
        placeholder="Digite a capacidade do setor"
        defaultValue={sector.capacidade}
      />

      <Dropdown
        label="Evento:"
        name="evento_id_evento"
        placeholder="Selecione o evento do setor"
        options={eventsFiltered}
        defaultValue={sector.evento.id_evento}
      />

      <Button>Atualizar</Button>
    </form>
  );
}
