import { group } from "./group"

export interface country{
    cname: string,
    nkill: string,
    nwound: string,
    tgoups: [group]
}