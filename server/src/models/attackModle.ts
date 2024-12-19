import { Schema,model } from "mongoose";
import { attack } from "../types/attack";

const attackSchema  = new Schema<attack>({
     eventid: {type:Number, unique: true},
     iyea: {type: Number,unique: true},
     ida:{type:Number, unique: true},
     country_txt: {type:String, unique: true},
     region_txt:{type:String, unique: true},
     city: {type:String, unique: true},
     latitude: {type:Number, unique: true},
     longitude: {type:Number, unique: true},
     attacktype1_txt: {type:String, unique: true},
     targtype1_txt: {type:String, unique: true},
     target1: {type:String, unique: true},
     gname: {type:String, unique: true},
     weaptype1_txt:{type:String, unique: true},
     nkill: {type:Number, unique: true},
     nwound: {type:Number, unique: true},
     nperps: {type:Number, unique: true},
     summary: {type:String, unique: true},

})
export const AttackModel = model('Attack', attackSchema)