import express from 'express';

import {loginAdmin, getAdminProfile} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.get('/profile', getAdminProfile);

export default adminRouter;