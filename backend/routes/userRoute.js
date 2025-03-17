import express from "express";
import { changePassword, forgetPassword, loginUser, logoutUser, registerUser, resendOtp, resetPassword, verifyUser} from "../controllers/userController.js";



const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/verify/:id",verifyUser);
userRouter.get("/resend/:id",resendOtp);
userRouter.post("/login",loginUser);
userRouter.post("/logout",logoutUser);


userRouter.post("/forgetPassword",forgetPassword);
userRouter.post("/resetPassword/:id",resetPassword);
userRouter.post("/changePassword/:id",changePassword);



export default userRouter


