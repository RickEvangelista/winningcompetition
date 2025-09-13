"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import { user } from '@/types/user'
import Link from 'next/link';
import React, { useState } from 'react'
import deleteUser from '../actions/deleteUser';

interface CardListUserProps {
    users: user[];
}

export default function CardListUser({users}: CardListUserProps) {
 const [search, setSearch] = useState("")
    const filteredItems = users.filter((i)=> (
        i.pessoa.nome_completo.toLowerCase().includes(search.toLocaleLowerCase()) ||
        i.perfil.titulo_perfil.toLowerCase().includes(search.toLocaleLowerCase())
    ))
  return (
    <div className='flex flex-col gap-5'>
        <Input label={''} name={'filter'} placeholder={'Filtre usuários por nome ou perfil'} onChange={(e)=> setSearch(e.target.value)} />
        <div className="flex flex-col">
            {filteredItems.length === 0 ? ( <h2 className='text-3xl font-semibold'>Nenhum usuário encontrado</h2> ) : (
                <div className="grid grid-cols-1 md:grid cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((i)=> (
                        <div key={i.id_usuario} className="flex flex-col border-t-4 border-custom-blue rounded-md shadow-md hover:shadow-lg transition-shadow gap-4 p-5">
                            <h3 className="text-3xl font-sembold">{i.pessoa.nome_completo}</h3>
                            <p className="text-2xl">{i.pessoa.email}</p>
                            <p className="text-2xl">{i.perfil.titulo_perfil}</p>
                            <div className="flex justify-between items-center">
                                <Link className="text-custom-blue text-2xl hover:underline w-1/2" href={`/dashboard/usuarios/${i.id_usuario}/editar`}>Ver/Editar</Link>
                                <Button variant={'danger'} type='button' className='w-1/2' onClick={()=> deleteUser(i.id_usuario)}>Deletar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) }
        </div>

    </div>
  )
}
