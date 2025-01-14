import { group } from "./group"
import { Document ,Types} from "mongoose"
export interface country extends Document{
    cname: string,
    nkill: number,
    nwound: number,
    aincidents: number,
    average: number,
    latitude: number,
    longitude:number,
    tgroups: Types.ObjectId[]
}