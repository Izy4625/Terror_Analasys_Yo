import data from "../../../server/data.json"
import { createAttack } from "../service/createattackService";
import * as fs from 'fs';
import { attack } from "../types/attack";
import { JsxEmit } from "typescript";
export const  createSeed= async()=>{
    const datastring = JSON.stringify(data)
    const newdata: attack[] = JSON.parse(datastring)
    for (let i = 0; i < newdata.length; i++) {
        await createAttack(newdata[i]);
      }
}