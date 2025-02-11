import express from "express"
import { changeVolunteerPassword, forgetVolunteerPassword, loginVolunteer, logoutVolunteer, registerVolunteer, resendVerifyVolunteerLogin, resendVolunteer, resetVolunteerPassword, verifyVolunteer, verifyVolunteerLogin } from "../controllers/volunteerController.js";

const volunteerRouter = express.Router();

volunteerRouter.post("/register",registerVolunteer);
volunteerRouter.post("/verify/:id",verifyVolunteer);
volunteerRouter.get("/resend/:id",resendVolunteer);
volunteerRouter.post("/login",loginVolunteer);
volunteerRouter.post("/login/verify/:id",verifyVolunteerLogin);
volunteerRouter.get("/login/resend/:id",resendVerifyVolunteerLogin);
volunteerRouter.post("/logout",logoutVolunteer);
volunteerRouter.post("/forgetPassword",forgetVolunteerPassword);
volunteerRouter.post("/resetPassword/:id",resetVolunteerPassword);
volunteerRouter.post("/changePassword/:id",changeVolunteerPassword);

export default volunteerRouter