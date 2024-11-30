//Modules
import express from 'express';
import cors from 'cors';
import adminRouter from './routes/adminRoutes.js';
import transporterRouter from './routes/transporterRoutes.js';
import connectDB from './config/db.js';
import runAdminSeed from './config/seedAdmin.js';
import roadConditonRouter from './routes/RoadConditionRoute.js';
import { updateRoadConditions } from './controllers/RoadConditionController.js';
import ussdRouter from './routes/ussdRoutes.js';

// Optionals
// runAdminSeed();

// Start data updates every 1 minute (60000 milliseconds)
setInterval(updateRoadConditions, 60000); // Update road conditions every minute

//Declarations
const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//db connection
connectDB();

//Endpoints
app.use('/api/ussd', ussdRouter);
app.use('/api/road', roadConditonRouter);
app.use('/api/admin', adminRouter);
app.use('/api/transporter', transporterRouter);
app.get('/', (req, res)=> {
    res.send('API is WORKING PERFECTLY...')
});

//Initialize server
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});