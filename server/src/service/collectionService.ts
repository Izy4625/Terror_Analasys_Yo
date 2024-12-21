import { YearStatsModel } from "../models/yearStatsMOdel";
import { GroupModel } from "../models/groupModel";
import { group } from "../types/group";
import { CountryModel } from "../models/countryModel";
import { attack } from "../types/attack";
import { year, month } from "../types/year"
import { Types } from "mongoose";
import { AttackTypeModel } from "../models/attackTypesModel";
import { country } from "../types/country";


const handleCountry = async (nattack: attack) => {
    try {
        const tcountry = await CountryModel.findOne({ cname: nattack.country_txt })
        if (tcountry) {
            tcountry.nkill += nattack.nkill
            tcountry.nwound += nattack.nwound
            tcountry.save()
        }
        else {
            const newCountry = new CountryModel({
                cname: nattack.country_txt,
                nkill: nattack.nkill,
                nwound: nattack.nwound
            })
            newCountry.save()
        }
    }
    catch (err) {
        console.log('inside the handle country fun err', err)
    }
}

const handleGroup = async (nattack: attack): Promise<group | undefined> => {
    console.log(nattack)
    try {
        const tgroup = await GroupModel.findOne({ gname: nattack.gname })
        if (tgroup) {
            tgroup.nkill += nattack.nkill
            tgroup.nwound += nattack.nwound
            tgroup.aincidents += 1
            console.log(tgroup)
            return await tgroup.save()
           

        }
        else {
            const newGroup = new GroupModel({
                gname: nattack.gname,
                nkill: nattack.nkill,
                nwound: nattack.nwound,
                aincidents: 1
            })

            await newGroup.save()
            console.log(newGroup)
         
            const findgroup : country |null= await CountryModel.findOne({ cname: nattack.country_txt})
            if(findgroup && findgroup.tgroups.find((a)=>a===newGroup._id))
             {  console.log("true inside handle cgroup")}
          
            else {
               const newgroup = await CountryModel.findOneAndUpdate({ cname: nattack.country_txt }, { $push: { 'tgroups': newGroup?._id } },{new:true})
               console.log("false adding a object id",newgroup)
            }
            return
        }
    }
    catch (err) {
        console.log('inside the handle country fun err', err)
    }
}

const handleYear = async (newattack: attack) => {
    try {
        const year = await YearStatsModel.findOne({ iyear: newattack.iyear });
        if (year) {
            if(newattack.imonth === 0) return
            const month = await YearStatsModel.findOneAndUpdate({ iyear: newattack.iyear, 'months.imonth': newattack.imonth }, {$inc: {
                "months.$.aincidents": 1}
              }, { new: true });
        
            if (!month?.months.find((a) => a.imonth === newattack.imonth)) {
           
                const brandnewmonth: month = {
                    imonth: newattack.imonth,
                    aincidents: 1
                }
                const newMonth = await YearStatsModel.findOneAndUpdate({ iyear: newattack.iyear }, { $push: { months: brandnewmonth } }, { new: true })
            }
        }
        else {
            const brandnewmonth: month[] = [{
                imonth: newattack.imonth,
                aincidents: 1
            }]
            const newYear = new YearStatsModel({
                iyear: newattack.iyear,
                months: brandnewmonth
            })
            return await newYear.save()
        }
    }
    catch (err) {
        console.log('inside handle year err', err)
    }

}
const handleAttackTypes = async (newattack: attack) => {
    try {
        const attacktype = await AttackTypeModel.findOne({ atype: newattack.attacktype1_txt })
        if (attacktype) {
            attacktype.nkill += newattack.nkill;
            attacktype.nwound += newattack.nwound;
            return await attacktype.save()
        }
        else {
            const aType = new AttackTypeModel({
                atype: newattack.attacktype1_txt,
                nkill: newattack.nkill,
                nwound: newattack.nwound
            })
            return await aType.save()
        }
    }
    catch (err) {
        console.log('inside handleAttackTypes', err)
    }
}

export const handleAllCollections = async (newattack: attack) => {
    await handleAttackTypes(newattack);
    await handleCountry(newattack);
    await handleGroup(newattack);
    await handleYear(newattack)
}