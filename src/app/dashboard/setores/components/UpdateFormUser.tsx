"use client"

import Input from '@/components/Input'
import { FormState } from '@/types/formState'
import React, { useActionState } from 'react'
import Button from '@/components/Button'
import { event } from '@/types/event'
import updateEvent from '../actions/updateUser'

interface UpdateEventFormProps {
    event: event;
}

export default function UpdateEventForm({event}: UpdateEventFormProps) {
    const initialState: FormState = {success:false, message:""}
    const [state, dispatch] = useActionState(updateEvent, initialState)

  return (
    <form action={dispatch} className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-md">
        <h1 className="text-4xl font-semibold text-center text-custom-blue">Atualizar evento</h1>
        <input type="hidden" name='id_evento' value={event.id_evento}/>
        <Input label={'Titulo evento: '} name={'titulo_evento'} placeholder={'Digite o titulo do evento'} defaultValue={event.titulo_evento} />
        <Input label={'Data de início:'} name={'dt_inicio'} type='date' placeholder={'Digite a data de início do evento'}  defaultValue={event.dt_inicio.toISOString().split("T")[0]}/>
        <Input label={'Data de término:'} name={'dt_fim'} type='date' placeholder={'Digite a data de término do evento'}  defaultValue={event.dt_fim.toISOString().split("T")[0]}/>
        <Input label={'Capacidade:'} name={'capacidade'} type='number' placeholder={'Digite a capacidade do evento'} defaultValue={event.capacidade} />
        {state.success && <p className={`text-xl text-center ${state.message ? "text-custom-green" : "text-custom-orange"}`}>{state.message}</p> }
        <Button>Atualizar</Button>
    </form>
    )
}

