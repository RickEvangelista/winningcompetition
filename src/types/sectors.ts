import { setor } from "@prisma/client";
import { event } from "./event";

export interface sector extends setor {
}
export interface sectorWithEvent extends setor {
    evento: event;
}