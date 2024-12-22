import { Schema, model } from "mongoose";
import { attackTypes } from "../types/attackTypes";

const attackTypeschema = new Schema<attackTypes>({
       atype: {type: String, unique: true},
       nkill: {type: Number},
       nwound: {type: Number},
       aincidents: {type: Number}

})

export const AttackTypeModel = model('AttackType', attackTypeschema)