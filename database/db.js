// import mongoose from "mongoose";


// const connetDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log("MongoDB connetct sucessfullay")

//     } catch (error) {
//         console.log('mongodb connetion have error', error)

//     }
// }
// export default connetDB;

import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};

export default connectDB;
