import { Types } from "mongoose"

export interface month{
    imonth: number,
    aincidentsOfEachType: Types.ObjectId[]
}


export interface year{
    iyear: number,
    months: month[]
}