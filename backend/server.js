import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import app from "./app.js";

connectDB();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT} `)
})

