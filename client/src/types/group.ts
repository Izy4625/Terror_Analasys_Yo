import { Document } from "mongoose"

export interface group extends Document{
    gname: string,
    aincidents: number,
    nkill: number,
    nwound: number
}
