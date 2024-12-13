import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import router from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';

//dotenv config
dotenv.config();

//database connection
connectDb();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/user', router);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/doctor', doctorRouter);

//port
const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
    console.log(`Server running on port ${port} and mode is ${process.env.NODE_MODE}`.bgCyan.white);
});

