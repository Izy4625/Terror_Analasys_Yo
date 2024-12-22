import { get_search_keywords } from "../service/attackService";
import { Request, Response ,NextFunction} from "express";

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