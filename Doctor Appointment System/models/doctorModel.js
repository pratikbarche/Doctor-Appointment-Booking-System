import mongoose from "mongoose";


const doctorSchema = new mongoose.Schema({
    userId: {
      type:String  
    },
    firstName: {
        type: String,
        required:[true,'First name is required']
    },
    lastName: {
        type: String,
        required:[true,'Last name is required']
    },
    phone: {
        type: Number,
        required:[true,'Phone number is required']
    },
    email: {
        type: String,
        required:[true,'Email is required']
    },
    website: {
        type:String
    },
    address: {
        type: String,
        required:[true,'address ture']
    },
    specialization: {
        type: String,
        required:[true,'Specialization is required']
    },
    experiance: {
        type: String,
        required:[true,'Experience is required']
    },
    feesPerCunsaltaion: {
        type: Number,
        required:[true,'Fees is required']
    },
    status: {
        type: String,
        default:'pending'
    },
    timing: {
        type: Object,
        required:[true,'Work timing is required']
    }
},{timestamps:true});

const doctorModel = mongoose.model('doctors', doctorSchema);


export default doctorModel;