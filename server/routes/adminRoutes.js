import express from 'express';

import {loginAdmin, getAdminProfile, sendSMS, sendAirtime, getRegisteredTransporters, getFeedbacks} from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.get('/profile', authMiddleware, getAdminProfile);
adminRouter.post('/send-sms', sendSMS);
adminRouter.post('/send-airtime', sendAirtime);
adminRouter.get('/get-transporters', getRegisteredTransporters);
adminRouter.get('/getFeedbacks', getFeedbacks);

export default adminRouter;