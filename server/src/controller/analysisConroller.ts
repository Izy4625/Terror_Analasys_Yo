import { get_attack_type_service } from "../service/analysisService";

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