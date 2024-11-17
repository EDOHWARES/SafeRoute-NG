//Modules
import express from 'express';
import cors from 'cors';

//Declarations
const app = express();
const port = 5000;

//Middlewares
app.use(express.json());
app.use(cors());

//db connection


//Endpoints
app.get('/', (req, res)=> {
    res.send('API is WORKING PERFECTLY...')
});

//Initialize server
app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
});
