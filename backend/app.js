import express from "express"
import dotenv  from 'dotenv'
import cookieParser from "cookie-parser";

dotenv.config({path:"./config/.env"});
const app=express();

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("server is working");
})

export default app;
