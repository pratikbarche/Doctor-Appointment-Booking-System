import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getDoctorInfoController,updateProfileController,getDoctorByIdcontroller,doctorAppointmentsController,updateStatusController} from '../controllers/doctorCtrl.js';

const doctorRouter = express();
//Get single doc info ||post 
doctorRouter.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

//update profile ||POST update
doctorRouter.post('/updateProfile', authMiddleware, updateProfileController);

//get single doctor info || POST method
doctorRouter.post('/getDoctorById', authMiddleware, getDoctorByIdcontroller);

//get appointments doctor
doctorRouter.get('/doctor-appointments', authMiddleware, doctorAppointmentsController);

//update status || POST
doctorRouter.post('update-status', authMiddleware, updateStatusController);


export default doctorRouter;