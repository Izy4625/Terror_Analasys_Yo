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
            tcountry.aincidents += 1

            tcountry.save()
        }
        else {
            const newCountry = new CountryModel({
                cname: nattack.country_txt,
                nkill: nattack.nkill,
                nwound: nattack.nwound,
                latitude: nattack.latitude,
                longitude: nattack.longitude,
                aincidents: 1

            })
            newCountry.save()
        }
    }
    catch (err) {
        console.log('inside the handle country fun err', err)
    }
}

const handleGroup = async (nattack: attack): Promise<group | undefined> => {

    try {
        const tgroup = await GroupModel.findOne({ gname: nattack.gname })
        if (tgroup) {
            tgroup.nkill += nattack.nkill
            tgroup.nwound += nattack.nwound
            tgroup.aincidents += 1

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


            const findgroup: country | null = await CountryModel.findOne({ cname: nattack.country_txt })
            if (findgroup && findgroup.tgroups.find((a) => a === newGroup._id)) { }

            else {
                const newgroup = await CountryModel.findOneAndUpdate({ cname: nattack.country_txt }, { $push: { 'tgroups': newGroup?._id } }, { new: true })

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
        const attackType = await AttackTypeModel.findOne({ atype: newattack.attacktype1_txt })

        if (year) {
            if (newattack.imonth === 0) return


            const month: year | null = await YearStatsModel.findOne({ iyear: newattack.iyear, 'months.imonth': newattack.imonth })


            const tmonth = month?.months?.find((mon) => mon.imonth === newattack.imonth);
            if (month && attackType && tmonth?.aincidentsOfEachType.find((a) => a === attackType._id)) { }
            else if (tmonth && attackType) {
                const addmonthtoyear: year | null = await YearStatsModel.findOneAndUpdate({ iyear: newattack.iyear, 'months.imonth': newattack.imonth }, {
                    $push: {
                        "months.$.aincidentsOfEachType": attackType?._id
                    }
                }, { new: true });
            }

            else if (attackType) {

                const brandnewmonth: month = {
                    imonth: newattack.imonth,
                    aincidentsOfEachType: [attackType?._id]
                }
                const newMonth = await YearStatsModel.findOneAndUpdate({ iyear: newattack.iyear }, { $push: { months: brandnewmonth } }, { new: true })
            }
        }
        else {
            if (attackType) {
                const brandnewmonth: month[] = [{
                    imonth: newattack.imonth,
                    aincidentsOfEachType: [attackType?._id]
                }]
                const newYear = new YearStatsModel({
                    iyear: newattack.iyear,
                    months: brandnewmonth
                })
                return await newYear.save()
            }
        }
    }
    catch (err) {
        console.log('inside handle year err', err)
    }

}
const handleAttackTypes = async (newattack: attack) => {
    
    try {
        const attacktype = await AttackTypeModel.findOne({ atype: newattack.attacktype1_txt })
        if (isNaN(newattack.nkill)) {
            newattack.nkill = 3; // Assign a default or fallback value
          }
          if (isNaN(newattack.nwound)) {
            newattack.nwound = 3; // Assign a default or fallback value
          }
        if (attacktype) {
            attacktype.nkill += newattack.nkill;
            attacktype.nwound += newattack.nwound;
            attacktype.aincidents += 1
            return await attacktype.save()
        }
        else {
            const aType = new AttackTypeModel({
                atype: newattack.attacktype1_txt,
                nkill: newattack.nkill,
                nwound: newattack.nwound,
                aincidents: 1
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