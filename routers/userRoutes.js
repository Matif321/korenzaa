import express from "express";
import { loginUser, reverify, signupUser, verify } from "../controller/UserController.js";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controller/categoryController.js";

const router = express.Router();

// User routes
router.post("/signupUser", signupUser);
router.post("/verify", verify);
router.post("/reverify", reverify);
router.post("/loginUser", loginUser);
// router.post("/logout", logout);

// Category routes
router.post("/createCategory", createCategory);
router.get("/getAllCategories", getAllCategories);
router.put("/updateCategory/:id", updateCategory); // id param add
router.delete("/deleteCategory/:id", deleteCategory); // id param add

export default router