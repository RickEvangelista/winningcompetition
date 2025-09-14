"use client"

import Input from '@/components/Input'
import { FormState } from '@/types/formState'
import React, { useActionState, useEffect } from 'react'
import Button from '@/components/Button'
import useFeedback from '@/hooks/useFeedback'
import validateTicket from '../actions/validateTicket'

export default function ValidateTicketForm() {
    const initialState: FormState = {success:false, message:""}
    const [state, dispatch] = useActionState(validateTicket, initialState)
      const { showMessage } = useFeedback();
    
      useEffect(() => {
        state.message && showMessage(state);
      }, [state, showMessage]);


  return (
    <form action={dispatch} className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg">
        <h1 className="text-4xl font-semibold text-center text-custom-blue">Validar Ingresso</h1>
        <Input label={'Código: '} name={'codigo'} placeholder={'Digite o código do ingresso'} />
        <Button>Validar</Button>
    </form>
    )
}
