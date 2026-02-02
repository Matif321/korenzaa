import express from "express"
import dotenv from "dotenv"
import connetDB from "./database/db.js";
import userRoutes from "./router/userRoutes.js"

dotenv.config()
const app = express()

app.use(express.json());

app.use("/api/v1/users", userRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connetDB();
    console.log(`Example app listening on port ${port}`)
})












