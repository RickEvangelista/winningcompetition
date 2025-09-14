import { ingresso, pessoa } from "@prisma/client";
import { sector } from "./sectors";


export interface ticket extends ingresso {
    pessoa: pessoa;
    setor: sector;
}