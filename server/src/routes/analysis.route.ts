import Router from "express";
import { get_attack_type_controller } from "../controller/analysisConroller";
const analysisRoute = Router()

analysisRoute.get('/deadliest-attack-types', get_attack_type_controller)

export default analysisRoute