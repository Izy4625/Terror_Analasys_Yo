import { group } from "./group"
import { Document } from "mongoose"
export interface country extends Document{
    cname: string,
    nkill: string,
    nwound: string,
    tgoups: group["_id"]
}