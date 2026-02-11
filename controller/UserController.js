

import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmail from "../emailVerify/verifyEmail.js";

// ✅ Signup function
export const signupUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Basic validation
        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
        verifyEmail(token, email)
        newUser.token = token;
        await newUser.save();

        // Send verification email
        verifyEmail(token, email);

        // Response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// ✅ Login function
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" });

        // Response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(400).json({
                success: false,
                message: "Authorization token is missing or invalid"
            });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "Registration token has expired"
                });
            }
            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        user.token = null;
        user.verified = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





















