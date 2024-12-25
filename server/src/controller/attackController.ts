import { get_search_keywords } from "../service/attackService";
import { Request, Response ,NextFunction} from "express";
import { createAttack } from "../service/createattackService";
import { attack } from "../types/attack";
import {io} from "../index"
export const get_search_keywords_controller = async (req: Request,res: Response, next: NextFunction) => {
    try{
        console.log('got tp the contorller')
        console.log(req.body)
        const {query} = req.body
        const data1 = await get_search_keywords(query);
        console.log(data1)
        res.json(data1)
    }
    catch(err){
        console.log("err getting serach query" ,err)
       next(err)
    }
}
export const create_new_attack_controller = async(req: Request,res: Response, next: NextFunction) =>{
    io.emit('newattack')
    try{
          console.log('got to the controller for creating new attack', req.body)
            
            const data = await createAttack(req.body);
            console.log(data)
            res.json(data)
    }
    catch(err){
        console.log("err creating new attack" ,err)
       next(err)
    }
}