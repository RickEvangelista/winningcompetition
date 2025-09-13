"use client";

import Input from "@/components/Input";
import { FormState } from "@/types/formState";
import React, { useActionState, useEffect } from "react";
import Button from "@/components/Button";
import { event } from "@/types/event";
import updateEvent from "../actions/updateEvent";
import useFeedback from "@/hooks/useFeedback";

interface UpdateEventFormProps {
  event: event;
}

export default function UpdateEventForm({ event }: UpdateEventFormProps) {
  const initialState: FormState = { success: false, message: "" };
  const [state, dispatch] = useActionState(updateEvent, initialState);

  const { showMessage } = useFeedback();

  useEffect(() => {
    state.message &&
    showMessage(state);
  }, [state, showMessage]);

  return (
    <form
      action={dispatch}
      className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg"
    >
      <h1 className="text-4xl font-semibold text-center text-custom-blue">
        Atualizar evento
      </h1>
      <input type="hidden" name="id_evento" value={event.id_evento} />
      <Input
        label={"Titulo evento: "}
        name={"titulo_evento"}
        placeholder={"Digite o titulo do evento"}
        defaultValue={event.titulo_evento}
      />
      <Input
        label={"Data de início:"}
        name={"dt_inicio"}
        type="date"
        placeholder={"Digite a data de início do evento"}
        defaultValue={event.dt_inicio.toISOString().split("T")[0]}
      />
      <Input
        label={"Data de término:"}
        name={"dt_fim"}
        type="date"
        placeholder={"Digite a data de término do evento"}
        defaultValue={event.dt_fim.toISOString().split("T")[0]}
      />
      <Input
        label={"Capacidade:"}
        name={"capacidade"}
        type="number"
        placeholder={"Digite a capacidade do evento"}
        defaultValue={event.capacidade}
      />
      <Button>Atualizar</Button>
    </form>
  );
}
