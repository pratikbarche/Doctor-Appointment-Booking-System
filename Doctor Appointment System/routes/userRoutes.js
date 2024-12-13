import express from 'express';
import { authController, loginController,registerController,applyDoctorController,getAllNotificationController,deleteAllNotificationController,getAllDoctorsController,bookAppointmentController,bookingAvailabilityController,userAppointmentsController } from '../controllers/userCtrl.js';
import authMiddleware from '../middlewares/authMiddleware.js';


//router object
const router = express.Router();


//Routes

//Login Route || POST Method
router.post('/login', loginController);

//Register Route || POST Method
router.post('/register', registerController);

//Auth Route ||POST method
router.post('/getUserData', authMiddleware, authController);

//Apply Doctor || POST method
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification Doctor || Post
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

//Notification Doctor Delete || post
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

//get all doctor|| GET method
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

//bookappointment 
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//booking availability
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

//appoints list 
router.get('/user-appointments', authMiddleware, userAppointmentsController);
export default router;