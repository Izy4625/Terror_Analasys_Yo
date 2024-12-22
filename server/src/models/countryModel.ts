import { Schema,model } from "mongoose";
import { country } from "../types/country";
import { groupSchema } from "./groupModel";

const countrySchema = new Schema<country>({
       cname:{type: String, unique: true},
       nkill: {type: Number},
       nwound: {type: Number},
       aincidents: {type: Number},
       average: {type: Number},
       latitude: {type:Number},
       longitude: {type:Number},
       tgroups:  [{ type: Schema.Types.ObjectId, ref: 'Groups' }]
})
countrySchema.pre("save",function(){
        this.average = this.nkill + (this.nwound / 5) / this.aincidents
})
export const CountryModel = model('Country', countrySchema)