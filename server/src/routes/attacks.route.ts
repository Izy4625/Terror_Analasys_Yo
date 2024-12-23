import Router from 'express';
import { get_search_keywords_controller,create_new_attack_controller } from '../controller/attackController'
const attackRouter = Router();

attackRouter.post('/all/search/', get_search_keywords_controller);
attackRouter.post('/create', create_new_attack_controller)

export default attackRouter