import { evento } from "@prisma/client";

export interface event extends evento {
    
}


export interface eventList extends Pick<event, "id_evento"| "titulo_evento"> {
    
}