"use server"

import React from 'react'
import CardListUser from './components/CardListUser'
import prisma from '@/app/lib/prisma'

export default async function page() {
    const users = await prisma.usuario.findMany({
        include: {pessoa: true,
            perfil: true
        }
    })
  return (
    <div className='flex flex-col min-h-screen w-full'>
        <CardListUser users={users} />
    </div>
  )
}
