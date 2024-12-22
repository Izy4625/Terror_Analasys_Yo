import { AttackTypeModel } from "../models/attackTypesModel"
import { CountryModel } from "../models/countryModel"

export const get_attack_type_service = async (types?: string[]) => {
    try {
        if (types) {
            const data =await AttackTypeModel.find({ cname: { $in: types } }).sort({ nkill: -1, nwound: -1 }).lean()
            
            return data

        }
        else {
            const data = await AttackTypeModel.find({}).sort({ nkill: -1, nwound: -1 }).lean()
            console.log("yhis is all the data in the service", data)
            return data
        }
    }
    catch (err) {
        console.log(err)
        throw err
    }
}
export const get_top5_countries = async()=>{
    try{
        const data = await CountryModel.find({}).sort({average: -1}).limit(5).select('-tgroups -_id -__v').lean()
        return data
    }
    catch (err) {
        console.log(err)
        throw err
    }
    
}