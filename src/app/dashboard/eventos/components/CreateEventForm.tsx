"use client";

import Input from "@/components/Input";
import { FormState } from "@/types/formState";
import React, { useActionState, useEffect } from "react";
import Button from "@/components/Button";
import createEvent from "../actions/createEvent";
import toast from "react-hot-toast";

export default function CreateEventForm() {
  const initialState: FormState = { success: false, message: "" };
  const [state, dispatch] = useActionState(createEvent, initialState);

  useEffect(() => {
    state.message && state.success
      ? toast.success(state.message)
      : toast.error(state.message);
  }, [state]);

  return (
    <form
      action={dispatch}
      className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg"
    >
      <h1 className="text-4xl font-semibold text-center text-custom-blue">
        Cadastrar evento
      </h1>
      <Input
        label={"Titulo evento: "}
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
      {state.message && (
        <p
          className={`text-xl text-center ${
            state.success ? "text-custom-green" : "text-custom-orange"
          }`}
        >
          {state.message}
        </p>
      )}
      <Button>Cadastrar</Button>
    </form>
  );
}
