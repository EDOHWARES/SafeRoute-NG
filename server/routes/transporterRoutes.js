import express from 'express';

import { registerTransporter, loginTransporter, fetchTransporterProfile } from '../controllers/transporterController.js';

const transporterRouter = express.Router();

transporterRouter.post('/register', registerTransporter);
transporterRouter.post('/login', loginTransporter);
transporterRouter.get('/profile', fetchTransporterProfile);

export default transporterRouter;