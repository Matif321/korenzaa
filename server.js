import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/db.js";
import userRoutes from "./routers/userRoutes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Signup route
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
    dbConnection();
    console.log(`Server running on port ${port}`);
});










