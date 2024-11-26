import express from 'express';
import { fetchAllRoadConditions, addRoadCondition, insertInitialData } from '../controllers/RoadConditionController.js';
const roadConditonRouter = express.Router();


roadConditonRouter.get('/conditions', fetchAllRoadConditions);
roadConditonRouter.post('/condition', addRoadCondition);
roadConditonRouter.post('/insertInitialData', insertInitialData);

export default roadConditonRouter;