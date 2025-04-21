import express from "express";
import {
	changePassword,
	deleteUser,
	forgetPassword,
	getAllUsers,
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
	resendOtp,
	resetPassword,
	updateUserProfile,
	verifyUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "./../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify/:id", verifyUser);
userRouter.get("/resend/:id", resendOtp);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile",isAuthenticated,getUserProfile);
userRouter.post("/forgetPassword", forgetPassword);
userRouter.post("/resetPassword/:id", resetPassword);
userRouter.post("/changePassword/:id", changePassword);
userRouter.put("/profile/update", isAuthenticated, updateUserProfile);
userRouter.delete("/delete/:id", isAuthenticated, deleteUser);
userRouter.get("/all", getAllUsers);

export default userRouter;
