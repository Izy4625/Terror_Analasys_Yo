import { Schema,model } from "mongoose";
import { country } from "../types/country";
import { groupSchema } from "./groupModel";

const countrySchema = new Schema<country>({
       cname:{type: String, unique: true},
       nkill: {type: String},
       nwound: {type: String},
       tgoups:  {type: [Schema.Types.ObjectId],
       ref: 'Groups'}
})

export const CountryModel = model('Country', countrySchema)