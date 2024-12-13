import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getAllDoctorsController, getAllUsersController,changeAccountStatusController } from '../controllers/adminCtrl.js';


const adminRouter = express();

// Get all users || GET method
adminRouter.get('/getAllUsers', authMiddleware, getAllUsersController);

//Get all doctors ||GET method
adminRouter.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// Change doctor account  status
adminRouter.post('/changeAccountStatus', authMiddleware, changeAccountStatusController);

export default adminRouter;