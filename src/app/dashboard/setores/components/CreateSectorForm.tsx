"use client"

import Input from '@/components/Input'
import { FormState } from '@/types/formState'
import React, { useActionState, useEffect } from 'react'
import Button from '@/components/Button'
import { event } from '@/types/event'
import Dropdown from '@/components/Dropdown'
import createSector from '../actions/createSector'
import useFeedback from '@/hooks/useFeedback'

interface CreateSectorFormProps {
    events: event[];
}

export default function CreateSectorForm({events}:CreateSectorFormProps) {
    const initialState: FormState = {success:false, message:""}
    const [state, dispatch] = useActionState(createSector, initialState)
      const { showMessage } = useFeedback();
    
      useEffect(() => {
        state.message && showMessage(state);
      }, [state, showMessage]);
    

    const eventsFiltered = events.map((e)=> (
      {
        label: e.titulo_evento, value: e.id_evento
      }
    ))

  return (
    <form action={dispatch} className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg">
        <h1 className="text-4xl font-semibold text-center text-custom-blue">Cadastrar setor</h1>
        <Input label={'Titulo setor: '} name={'titulo_setor'} placeholder={'Digite o titulo do setor'} />
        <Input label={'Capacidade:'} name={'capacidade'} type='number' placeholder={'Digite a capacidade do setor'} />
        <Dropdown label={'Evento: '} name={'evento_id_evento'} placeholder={'Selecione o evento do setor'} options={eventsFiltered} />
        <Button>Cadastrar</Button>
    </form>
    )
}

