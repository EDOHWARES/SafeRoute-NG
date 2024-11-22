import express from 'express';

import { registerTransporter, loginTransporter } from '../controllers/transporterController.js';

const transporterRouter = express.Router();

transporterRouter.post('/register', registerTransporter);
transporterRouter.post('/login', loginTransporter);

export default transporterRouter;