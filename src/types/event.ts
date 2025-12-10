import { evento, setor } from "@prisma/client";

export interface sectorWithCount extends setor {
    _count: {
        ingresso: number;
    }
}

export interface event extends evento {
    setor: sectorWithCount[];
}


export interface eventList extends Pick<event, "id_evento"| "titulo_evento"> {
    
}