"use client"

import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from 'next/link';
import React, { useState } from 'react'
import deleteUser from '../actions/deleteEvent';
import { event } from '@/types/event';

interface CardListEventsProps {
    events: event[];
}

export default function CardListEvents({events}: CardListEventsProps) {
 const [search, setSearch] = useState("")
    const filteredItems = events.filter((i)=> (
        i.titulo_evento.toLowerCase().includes(search.toLocaleLowerCase())
    ))
  return (
    <div className='flex flex-col gap-5'>
        <Input label={''} name={'filter'} placeholder={'Filtre usuários por nome ou perfil'} onChange={(e)=> setSearch(e.target.value)} />
        <div className="flex flex-col">
            {filteredItems.length === 0 ? ( <h2 className='text-3xl font-semibold'>Nenhum evento encontrado</h2> ) : (
                <div className="grid grid-cols-1 md:grid cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((i)=> (
                        <div key={i.id_evento} className="flex flex-col border-t-4 border-custom-blue rounded-md shadow-md hover:shadow-lg transition-shadow gap-4 p-5">
                            <h3 className="text-3xl font-sembold">{i.titulo_evento}</h3>
                            <p className="text-2xl">{`${i.dt_inicio.toLocaleDateString("pt-BR", {timeZone: "UTC"})} até ${i.dt_fim.toLocaleDateString("pt-BR", {timeZone: "UTC"})}`}</p>
                            <p className="text-2xl">{i.capacidade}</p>
                            <div className="flex justify-between items-center">
                                <Link className="text-custom-blue text-2xl hover:underline w-1/2" href={`/dashboard/eventos/${i.id_evento}/editar`}>Ver/Editar</Link>
                                <Button variant={'danger'} type='button' className='w-1/2' onClick={()=> deleteUser(i.id_evento)}>Deletar</Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) }
        </div>

    </div>
  )
}
