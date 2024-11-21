//Modules
import express from 'express';
import cors from 'cors';
import adminRouter from './routes/adminRoutes.js';
import connectDB from './config/db.js';
import runAdminSeed from './config/seedAdmin.js';

// Optionals
// runAdminSeed();

//Declarations
const app = express();
const port = 5000;

//Middlewares
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//Endpoints
app.use('/api/admin', adminRouter);
app.get('/', (req, res)=> {
    res.send('API is WORKING PERFECTLY...')
});

//Initialize server
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});

// ?retryWrites=true&w=majority&appName=Cluster0