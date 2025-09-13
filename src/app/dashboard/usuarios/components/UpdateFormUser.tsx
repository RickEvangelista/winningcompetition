"use client"


import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import InputMasked from '@/components/InputMasked'
import { FormState } from '@/types/formState'
import React, { useActionState } from 'react'
import Button from '@/components/Button'
import { user } from '@/types/user'
import updateUser from '../actions/updateUser'

interface UpdateUserFormProps {
    user: user;
}

export default function UpdateUserForm({user}:UpdateUserFormProps) {
    const initialState: FormState = {success:false, message:""}
    const [state, dispatch] = useActionState(updateUser, initialState)

    const profiles = [
        {label: "Administrador", value: "Administrador"},
        {label: "Vendedor", value: "Vendedor"},
        {label: "Validador", value: "Validador"},
    ]
  return (
    <form action={dispatch} className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-md">
        <h1 className="text-4xl font-semibold text-center text-custom-blue">Atualizar usuário</h1>
        <input type="hidden" name="id_usuario" value={user.id_usuario} />
        <Input label={'Nome: '} name={'nome_completo'} placeholder={'Digite o nome completo'}  defaultValue={user.pessoa.nome_completo}/>
        <Input label={'Email:'} name={'email'} placeholder={'Digite o email'} defaultValue={user.pessoa.email} />
        <InputMasked label={'CPF:'} name={'cpf'} placeholder={'Digite o cpf'}  defaultValue={user.pessoa.cpf}/>
        <Input label={'Senha:'}  type={"password"} name={'senha'} placeholder={'Digite a senha por favor'}  defaultValue={user.senha}/>
        <Dropdown label={'Perfil:'} name={'perfil'} placeholder={'Selecione um perfil'} options={profiles}  defaultValue={user.perfil.titulo_perfil}/>
        {state.success && <p className={`text-xl text-center ${state.message ? "text-custom-green" : "text-custom-orange"}`}>{state.message}</p> }
        <Button>Atualizar</Button>
    </form>
    )
}
