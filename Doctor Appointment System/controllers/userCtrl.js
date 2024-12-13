import userModel from '../models/userModels.js';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment';




//Register Comntroller
export const registerController = async (req,res) => {
    try {
        const exsitingUser = await userModel.findOne({ email: req.body.email });
        if (exsitingUser)
        {
            return res.status(200).send({ message: "user already exist", success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Register Succecfully", success: true });
        
    } catch (error)
    {
        console.log(error);
        res.status(500).send({ success: false, message: `Register controller ${error.message}` });
    }
 }



//Login Controller
export const loginController =async (req, res) => { 
        try {
            const user = await userModel.findOne({ email: req.body.email });
            if (!user)
            {
                return res.status(200).send({ message: "user not found", success: false });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch)
            {
                return res.status(200).send({ message: "Invalid email or password" ,success:false});
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).send({ message: "Login success", success: true, token});

        } catch (error) {
            console.log(error);
            res.status(500).send(`error in login controller${error.message}`);
        }
}

//auth Controller
export const authController = async (req,res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({ message: "user not foud", success: false });
        } else {
            res.status(200).send({ success: true, data: user });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}

//apply doctor controller
export const applyDoctorController = async (req, res) => {
    
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' });  // isko dekhna he ek bar
        await newDoctor.save();
        const adimnUser = await userModel.findOne({ isAdmin: true });
        const notification = adimnUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        });
        await userModel.findByIdAndUpdate(adimnUser._id, { notification });
        res.status(201).send({
            success: true,
            message: 'Doctor account applied success fully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error while applying for doctor',
            success: false,
            error
        });
    }
}

// notification controller

export const getAllNotificationController = async(req,res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            message: 'all notification marked as read',
            success: true,
            data: updatedUser
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error in notification',
            success: false,
            error
        })
    }
}

// detelet notification controller

export const deleteAllNotificationController = async(req,res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            message: 'Notificatons deleted successfully',
            success: true,
            data:updatedUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'unable to delete all notification',
            success: false,
            error
        })
    }
}


//get all doctors
export const getAllDoctorsController = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({status:'approved'});
        res.status(200).send({
            message: 'all doctor list fetched successfully',
            success: true,
            data: doctors
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'unable to fetch doctors list',
            success: false,
            error
        })
    }
}

//book appiontment
export const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time, 'HH:mm').toISOString();
        req.body.status = 'pending';
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
        user.notification.push({
            type: 'New-appointment-request',
            message: `a new appointment request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        });
        await user.save();
        res.status(200).send({
            message: 'Appointment book successfully',
            success: true,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'unable book appointment',
            success: false,
            error
        })
    }
}

//booking avalilability
export const bookingAvailabilityController = async (req,res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;
        const appointment = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime,
                $lte: toTime
            }
        })
        if (appointment.length > 0)
        {
            return res.status(200).send({
                message: 'Appointment not avaliable',
                success:true
            })
        } else {
            return res.status(200).send({
                message: 'appointment available',
                success:true
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error in cheking availability',
            success: false,
            error
        })
    }
}

//appointment list
export const userAppointmentsController = async (req, res) => {
    try {
        
        const appointments = await appointmentModel.find({userId:req.body.userId});
        res.status(200).send({
            message: 'appointments list fetched successfully',
            success: true,
            data: appointments
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'unable to fetch appointment list',
            success: false,
            error
        })
    }
}