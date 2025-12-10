"use client";

import Input from "@/components/Input";
import { FormState } from "@/types/formState";
import React, { useActionState, useEffect } from "react";
import Button from "@/components/Button";
import createEvent from "../actions/createEvent";
import useFeedback from "@/hooks/useFeedback";

export default function CreateEventForm() {
  const initialState: FormState = { success: false, message: "" };
  const [state, dispatch] = useActionState(createEvent, initialState);
  const { showMessage } = useFeedback();

  useEffect(() => {
    state.message && showMessage(state);
  }, [state, showMessage]);

  return (
    <form
      action={dispatch}
      className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg"
    >
      <h1 className="text-4xl font-semibold text-center text-custom-blue">
        Cadastrar evento
      </h1>
      <Input
        label={"Título do evento: "}
        name={"titulo_evento"}
        placeholder={"Digite o titulo do evento"}
      />
      <Input
        label={"Data de início:"}
        name={"dt_inicio"}
        type="date"
        placeholder={"Digite a data de início do evento"}
      />
      <Input
        label={"Data de término:"}
        name={"dt_fim"}
        type="date"
        placeholder={"Digite a data de término do evento"}
      />
      <Input
        label={"Capacidade:"}
        name={"capacidade"}
        type="number"
        placeholder={"Digite a capacidade do evento"}
      />
      <Button>Cadastrar</Button>
    </form>
  );
}
