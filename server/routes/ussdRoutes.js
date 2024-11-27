import express from 'express';
import { readVars } from '../controllers/ussdController.js';;


const ussdRouter = express.Router();

ussdRouter.post('/', readVars);

export default ussdRouter;