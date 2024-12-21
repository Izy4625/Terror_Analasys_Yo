import { group } from "./group"
import { Document ,Types} from "mongoose"
export interface country extends Document{
    cname: string,
    nkill: number,
    nwound: number,
    tgroups: Types.ObjectId[]
}