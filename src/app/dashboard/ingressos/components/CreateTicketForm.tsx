"use client";

import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import InputMasked from "@/components/InputMasked";
import { FormState } from "@/types/formState";
import React, { useActionState, useEffect, useState } from "react";
import createUser from "../actions/createTicket";
import Button from "@/components/Button";
import useFeedback from "@/hooks/useFeedback";
import { eventList } from "@/types/event";
import { sector } from "@/types/sectors";
import TicketModal from "./TicketModal";

interface CreateTicketFormProps {
  events: eventList[];
  sectors: sector[];
}

interface TicketFormState  extends FormState {
  codigo?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  evento?: string;
  setor?: string;
}

export default function CreateTicketForm({
  events,
  sectors,
}: CreateTicketFormProps) {
  const initialState: TicketFormState = { success: false, message: "" };
  const [state, dispatch] = useActionState<TicketFormState, FormData>(createUser, initialState);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { showMessage } = useFeedback();

  useEffect(() => {
    state.message && showMessage(state);
    state.message && state.codigo && setOpenModal(true);
  }, [state, showMessage]);

  const eventsList = events.map((e) => ({
    label: e.titulo_evento,
    value: e.id_evento,
  }));

  const filteredSectors = selectedEvent
    ? sectors.filter((s) => s.evento_id_evento === selectedEvent)
    : [];

  const sectorList = filteredSectors.map((e) => ({
    label: e.titulo_setor,
    value: e.id_setor,
  }));

  return (
    <form
      action={dispatch}
      className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg"
    >
      <h1 className="text-4xl font-semibold text-center text-custom-blue">
        Reservar ingresso
      </h1>
      <Input
        label={"Nome: "}
        name={"nome_completo"}
        placeholder={"Digite o nome completo"}
      />
      <Input label={"Email:"} name={"email"} placeholder={"Digite o email"} />
      <InputMasked label={"CPF:"} name={"cpf"} placeholder={"Digite o cpf"} />
      <Dropdown
        label={"Evento:"}
        name={"evento_id_evento"}
        placeholder={"Selecione um evento"}
        options={eventsList}
        onChange={(e) => setSelectedEvent(Number(e.target.value))}
      />
      <Dropdown
        label={"Setor:"}
        name={"setor_id_setor"}
        placeholder={"Selecione um setor"}
        disabled={!selectedEvent}
        options={sectorList}
      />
      <Button>Reservar</Button>
      <TicketModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        ticketData={
          state.codigo
            ? {
                nome: state.nome!,
                email: state.email!,
                cpf: state.cpf!,
                evento: state.evento!,
                setor: state.setor!,
                codigo: state.codigo!,
              }
            : null
        }
      />
    </form>
  );
}
