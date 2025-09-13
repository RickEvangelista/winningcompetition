"use client"


import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import InputMasked from '@/components/InputMasked'
import { FormState } from '@/types/formState'
import React, { useActionState } from 'react'
import createUser from '../actions/createUser'
import Button from '@/components/Button'

export default function CreateUserForm() {
    const initialState: FormState = {success:false, message:""}
    const [state, dispatch] = useActionState(createUser, initialState)

    const profiles = [
        {label: "Administrador", value: "Administrador"},
        {label: "Vendedor", value: "Vendedor"},
        {label: "Validador", value: "Validador"},
    ]
  return (
    <form action={dispatch} className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-md">
        <h1 className="text-4xl font-semibold text-center text-custom-blue">Cadastrar usuário</h1>
        <Input label={'Nome: '} name={'nome_completo'} placeholder={'Digite o nome completo'} />
        <Input label={'Email:'} name={'email'} placeholder={'Digite o email'} />
        <InputMasked label={'CPF:'} name={'cpf'} placeholder={'Digite o cpf'} />
        <Input label={'Senha:'}  type={"password"} name={'senha'} placeholder={'Digite a senha por favor'} />
        <Dropdown label={'Perfil:'} name={'perfil'} placeholder={'Selecione um perfil'} options={profiles} />
        {state.success && <p className={`text-xl text-center ${state.message ? "text-custom-green" : "text-custom-orange"}`}>{state.message}</p> }
        <Button>Cadastrar</Button>
    </form>
    )
}
