import Router from "express";
import { get_attack_type_controller ,get_top5_countries_controller} from "../controller/analysisConroller";

const analysisRoute = Router()

analysisRoute.get('/deadliest-attack-types', get_attack_type_controller)
analysisRoute.get('/highest-casualty-countries', get_top5_countries_controller)
analysisRoute.get('/incident-trends', get_incident_trends_comtroller)
export default analysisRoute