import express from "express"
import dotenv  from 'dotenv'
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import volunteerRouter from "./routes/volunteerRoute.js"

dotenv.config({path:"./config/.env"});
const app=express();

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("server is working");
})

app.use("/api/v1/auth",userRouter)
app.use("/api/v1/volunteer",volunteerRouter)

export default app;
