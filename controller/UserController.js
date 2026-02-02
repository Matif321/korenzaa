

import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmail from "../emailVerify/verifyEmail.js";



export const signupUser = async (req, res) => {
    try {

        const { fullName, email, password } = req.body

        //  basice validatiion

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Existing User

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"


            })
        }
        //create newUser

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({

            fullName,
            email,
            password: hashedPassword


        })
        // // 4️⃣ Generate JWT
        // const token = jwt.sign(
        //     { id: user._id, role: user.role },
        //     process.env.JWT_SECRET,
        //     { expiresIn: "7d" }
        // );



        // 4️⃣ Generate JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        verifyEmail(token, email)
        newUser.token = token

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server not found"
        })

    }
}





export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // 2️⃣ Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 3️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }



        // await newUser.save();


        // 5️⃣ Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
























