import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModels.js';

export const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: 'doctor data fetch success',
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'error in fething doctor details',error  });
    }
}

//update profile
export const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId },req.body);
        res.status(201).send({
            success: true,
            message: 'doctor profile updated',
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'error in updating profile',error  });
    }
}

//get single doctor info
export const getDoctorByIdcontroller = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send({
            success: true,
            message: 'doctor data fetch success',
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'error in fething doctor details',error  });
    }
}

//get doctor appointment 
export const doctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId });
        const appointments = await appointmentModel.find({ doctorId: doctor._id });
        
        res.status(200).send({
            message: 'doctor appointments list fetched successfully',
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

//update status controller
export const updateStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate({ status });

        const user = await userModel.findOne({ _id: appointments.userId });
        const notification = user.notification;
        notification.push({
            type: 'status updated',
            message: `a new appointment request hasbeen update ${status}`,
            onClickPath: '/doctor-appointments'
        });
        await user.save();
        res.status(200).send({
            message: 'appointment status updated',
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'unable to update status',
            success: false,
            error
        })
    }
}