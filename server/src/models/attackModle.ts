import { Schema,model } from "mongoose";
import { attack } from "../types/attack";

const attackSchema  = new Schema<attack>({
     eventid: {type:Number},
     iyear: {type: Number},
     imonth: {type: Number},
     iday:{type:Number},
     country_txt: {type:String},
     region_txt:{type:String},
     city: {type:String},
     latitude: {type:Number},
     longitude: {type:Number},
     attacktype1_txt: {type:String},
     targtype1_txt: {type:String},
     target1: {type:String},
     gname: {type:String},
     weaptype1_txt:{type:String},
     nkill: {type:Number},
     nwound: {type:Number},
     nperps: {type:Number},
     summary: {type:String},

})
attackSchema.index({ attacktype1_txt: 'text', summary: 'text',country_txt: 'text' });
export const AttackModel = model('Attack', attackSchema)