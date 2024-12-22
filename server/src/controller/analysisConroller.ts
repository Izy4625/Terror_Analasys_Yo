import { get_attack_type_service, get_top5_countries } from "../service/analysisService";

import { Request, Response ,NextFunction} from "express";
export const get_attack_type_controller =async (req: Request,res: Response, next: NextFunction)=>{
    try{
    const {types} = req.body
    if(types){
        const data = await get_attack_type_service(types)
        res.json(data)
        return
    }
    
    const data = await get_attack_type_service()
    console.log(data)
    res.json(data)
    }
    catch(err){
        console.log("err getting attacktypes" ,err)
       next(err)
    }

}
export const get_top5_countries_controller = async(req: Request,res: Response, next: NextFunction)=>{
    try{
           const data = await get_top5_countries();
           console.log(data)
           res.json(data)
    }
    catch(err){
        console.log("err getting top 5 countries" ,err)
       next(err)
    }
}