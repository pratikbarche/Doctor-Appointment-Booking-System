import mongoose from "mongoose";
import colors from 'colors';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connect succesfully ${mongoose.connection.host}`.bgGreen.white);
    }
    catch (error)
    {
        console.log(`Error in connection ${error}`.bgRed.white);
    }
}

export default connectDb;