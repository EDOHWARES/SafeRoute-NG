import express from 'express';

import {loginAdmin, getAdminProfile, sendSMS, sendAirtime} from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.get('/profile', authMiddleware, getAdminProfile);
adminRouter.post('/send-sms', sendSMS);
adminRouter.post('/send-airtime', sendAirtime);

export default adminRouter;