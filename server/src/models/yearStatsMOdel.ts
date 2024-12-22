import { Schema,model } from "mongoose";
import { year } from "../types/year";
  import { month } from "../types/year";
const monthSchema = new Schema<month>({
    imonth: {type: Number},
    aincidentsOfEachType: [{ type: Schema.Types.ObjectId, ref: 'AttackType' }]
})
const yearSchema = new Schema<year>({
    iyear: {type: Number,unique: true},
    months: {type: [monthSchema]}
})

export const YearStatsModel = model('Year', yearSchema)