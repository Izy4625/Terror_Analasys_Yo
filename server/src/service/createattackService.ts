import { handleAllCollections } from "./collectionService";
import { AttackModel } from "../models/attackModle";
import { attack } from "../types/attack"
export const createAttack = async (newattack: attack) => {
    
    if(newattack.latitude === null || newattack.longitude === null) return
    const { 
        eventid,
        iyear,
        imonth,
        iday,
        country_txt,
        region_txt,
        city,
        latitude,
        longitude,
        attacktype1_txt,
        targtype1_txt,
        target1,
        gname,
        weaptype1_txt,
        nkill,
        nwound,
        nperps,
        summary } = newattack;
        const nk = Number(nkill);
        const nw = Number(nwound);

         const newAttack = new AttackModel({
        iyear,
        imonth,
        iday,
        country_txt,
        region_txt,
        city,
        latitude,
        longitude,
        attacktype1_txt,
        targtype1_txt,
        target1,
        gname,
        weaptype1_txt,
        nk,
        nw,
        nperps,
        summary
})
    await newAttack.save()
    await handleAllCollections(newattack)
}