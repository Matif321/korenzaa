import express from "express";
import { loginUser, reverify, signupUser, verify } from "../controller/UserController.js";

const router = express.Router();



router.post("/signupUser", signupUser)
router.post("/verify", verify)
router.post("/reverify", reverify)
router.post("/loginUser", loginUser)
// router.post("/logout", logout)

export default router;


