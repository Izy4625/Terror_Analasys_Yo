
import {group} from "./group"
export interface country {
    cname: string,
    nkill?: number,
    nwound?: number,
    aincidents?: number,
    average?: number,
    latitude: number,
    longitude:number,
    tgroups: group[] 
}