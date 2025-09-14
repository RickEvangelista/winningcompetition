"use client";

import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import InputMasked from "@/components/InputMasked";
import { FormState } from "@/types/formState";
import React, { useActionState, useEffect, useState } from "react";
import Button from "@/components/Button";
import useFeedback from "@/hooks/useFeedback";
import { eventList } from "@/types/event";
import { sector } from "@/types/sectors";
import { ticket } from "@/types/tickets";
import updateTicket from "../actions/updateTicket";

interface UpdateTicketFormProps {
  events: eventList[];
  sectors: sector[];
  ticket: ticket,
}

export default function UpdateTicketForm({events, sectors, ticket}: UpdateTicketFormProps) {
  const initialState: FormState = { success: false, message: "" };
  const [state, dispatch] = useActionState(updateTicket, initialState);
  const [selectedEvent, setSelectedEvent ] = useState<number | null>(ticket.setor.evento_id_evento)
  const { showMessage } = useFeedback();

  useEffect(() => {
    state.message && showMessage(state);
  }, [state, showMessage]);


  const eventsList = events.map((e)=> ({
    label: e.titulo_evento, value: e.id_evento
  }))

  const filteredSectors = selectedEvent ? sectors.filter((s)=> s.evento_id_evento === selectedEvent) : []

    const sectorList = filteredSectors.map((e)=> ({
    label: e.titulo_setor, value: e.id_setor
  }))


  return (
    <form
      action={dispatch}
      className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg"
    >
      <h1 className="text-4xl font-semibold text-center text-custom-blue">
        Atualizar ingresso
      </h1>

      <input type="hidden" name="id_ingresso" value={ticket.id_ingresso} />
      <Input
        label={"Nome: "}
        name={"nome_completo"}
        placeholder={"Digite o nome completo"} defaultValue={ticket.pessoa.nome_completo}
      />
      <Input label={"Email:"} name={"email"} placeholder={"Digite o email"} defaultValue={ticket.pessoa.email} />
      <InputMasked label={"CPF:"} name={"cpf"} placeholder={"Digite o cpf"} defaultValue={ticket.pessoa.cpf} />
      <Dropdown
        label={"Evento:"}
        name={"evento_id_evento"}
        placeholder={"Selecione um evento"}
        options={eventsList}
        onChange={(e) => setSelectedEvent(Number(e.target.value))} defaultValue={ticket.setor.evento_id_evento}
      />
      <Dropdown
        label={"Setor:"}
        name={"setor_id_setor"}
        placeholder={"Selecione um setor"}
        disabled={!selectedEvent}
        options={sectorList} defaultValue={ticket.setor_id_setor}
      />
      <Button>Atualizar</Button>
    </form>
  );
}