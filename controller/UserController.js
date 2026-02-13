

import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyEmail from "../emailVerify/verifyEmail.js";
import Session from "../models/sessionModel.js";

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
}
export const reverify = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"


            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "10m" })
        verifyEmail(token, email)
        user.token = token
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Verfication email sent agian successfully",
            token: user.token

        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })

    }
}
// ✅ Login function
// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Basic validation
//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and password are required"
//             });
//         }

//         // Check if user exists
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         // Compare password
//         const isPasswordValid = await bcrypt.compare(password, existingUser.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid credentials"
//             });
//         }
//         if (existingUser.isVerified === false) {
//             return res.status.json({
//                 success: false,
//                 message: "Verify your acconut then login"
//             })
//         }

//         // Generate JWT token

//         const accessToken = jwt.sign({ id: existingUser._id }, proccess.env.JWT_SECRET, { expiresIn: "10d" })
//         const refreshToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" })

//         existingUser.isLoggedIn = true,
//             await existingUser.save()

//         // cheak for existing Session adn delelta

//         const existingSession = await Session.findOne({ userId: existingUser._id })
//         if (existingSession)
//             await Session.deleteOne({ userId: existingUser._id })
//         //  Create a new Session
//         await Session.create({ userId: existingUser._id })
//         return res.status(200).json({
//             success: true,
//             message: `Wellcome back${existingUser.firstName}`,
//             user: existingUser,
//             accessToken,
//             refreshToken
//         })




//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// }
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // ✅ Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // ✅ Compare password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // ✅ Check email verification
        if (existingUser.isVerified === false) {
            return res.status(403).json({
                success: false,
                message: "Verify your account then login"
            });
        }

        // ✅ Generate tokens
        const accessToken = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        const refreshToken = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        // ✅ Update login status
        existingUser.isLoggedIn = true;
        await existingUser.save();

        // ✅ Remove old session
        const existingSession = await Session.findOne({ userId: existingUser._id });
        if (existingSession) {
            await Session.deleteOne({ userId: existingUser._id });
        }

        // ✅ Create new session
        await Session.create({ userId: existingUser._id });

        // ✅ Remove password before sending user
        const userData = existingUser.toObject();
        delete userData.password;

        // ✅ Send response
        return res.status(200).json({
            success: true,
            message: `Welcome back ${existingUser.firstName}`,
            user: userData,
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


export const logout = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}






















