import express from "express";
import { loginUser, signupUser, verify } from "../controller/UserController.js";

const router = express.Router();


router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/verify", verify)

export default router;


