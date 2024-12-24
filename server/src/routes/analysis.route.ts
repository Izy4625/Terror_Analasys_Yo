import Router from "express";
import { get_attack_type_controller ,get_top5_countries_controller,get_incident_trend_controller,get_top5_groups_controller} from "../controller/analysisConroller";

const analysisRoute = Router()

analysisRoute.get('/deadliest-attack-types', get_attack_type_controller)
analysisRoute.get('/highest-casualty-countries', get_top5_countries_controller)
analysisRoute.get('/incident-trends', get_incident_trend_controller)
analysisRoute.post('/relationships/top-groups/',get_top5_groups_controller)
export default analysisRoute