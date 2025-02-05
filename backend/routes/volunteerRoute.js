import express from "express"
import { changeVolunteerPassword, forgetVolunteerPassword, loginVolunteer, logoutVolunteer, registerVolunteer, resetVolunteerPassword } from "../controllers/volunteerController.js";

const volunteerRouter = express.Router();

volunteerRouter.post("/register",registerVolunteer);
volunteerRouter.post("/login",loginVolunteer);
volunteerRouter.post("/logout",logoutVolunteer);
volunteerRouter.post("/forgetPasssword",forgetVolunteerPassword);
volunteerRouter.post("/resetPassword/:id",resetVolunteerPassword);
volunteerRouter.post("/changePassword/:id",changeVolunteerPassword);

export default volunteerRouter