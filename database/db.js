import mongoose from "mongoose";


const connetDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connetct sucessfullay")

    } catch (error) {
        console.log('mongodb connetion have error', error)

    }
}
export default connetDB;