import { get_attack_type_service, get_top5_countries, get_incident_trends,get_top5_groups } from "../service/analysisService";

import { Request, Response, NextFunction } from "express";
export const get_attack_type_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { types } = req.body
        if (types) {
            const data = await get_attack_type_service(types)
            res.json(data)
            return
        }

        const data = await get_attack_type_service()
        console.log(data)
        res.json(data)
    }
    catch (err) {
        console.log("err getting attacktypes", err)
        next(err)
    }

}
export const get_top5_countries_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await get_top5_countries();
        console.log(data)
        res.json(data)
    }
    catch (err) {
        console.log("err getting top 5 countries", err)
        next(err)
    }
}

export const get_incident_trend_controller = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await get_incident_trends(1971, 5);
        console.log(data)
        res.json(data)
    }
    catch (err) {
        console.log("err getting incidents trending", err)
        next(err)
    }
}

export const get_top5_groups_controller = async (req: Request, res: Response, next: NextFunction) => {
     try{
        const {area} = req.body;
        const data = await get_top5_groups(area)
        res.json(data)
     }
     catch (err) {
        console.log("err getting top 5 groups", err)
        next(err)
    }
}