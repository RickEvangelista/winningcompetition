import { perfil, pessoa, usuario } from "@prisma/client";


export interface user extends usuario{
    pessoa: pessoa,
    perfil: perfil,

}