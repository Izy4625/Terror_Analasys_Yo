import Router from 'express';
import { get_search_keywords_controller } from '../controller/attackController'
const attackRouter = Router();

attackRouter.get('/all/search/:keywords', get_search_keywords_controller);

export default attackRouter