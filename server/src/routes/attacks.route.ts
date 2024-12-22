import Router from 'express';
import { get_search_keywords_controller } from '../controller/attackController'
const attackRouter = Router();

attackRouter.post('/all/search/', get_search_keywords_controller);

export default attackRouter