import express from "express";
import {
	changeVolunteerPassword,
	deleteVolunteer,
	forgetVolunteerPassword,
	getAllVolunteers,
	getVolunteerProfile,
	loginVolunteer,
	logoutVolunteer,
	registerVolunteer,
	resendVerifyVolunteerLogin,
	resendVolunteer,
	resetVolunteerPassword,
	updateVolunteerProfile,
	verifyVolunteer,
	verifyVolunteerLogin,
} from "../controllers/volunteerController.js";
import { isVolAuthenticated } from "../middlewares/volAuth.js";

const volunteerRouter = express.Router();

volunteerRouter.post("/register", registerVolunteer);
volunteerRouter.post("/verify/:id", verifyVolunteer);
volunteerRouter.get("/resend/:id", resendVolunteer);
volunteerRouter.post("/login", loginVolunteer);
volunteerRouter.post("/login/verify/:id", verifyVolunteerLogin);
volunteerRouter.get("/login/resend/:id", resendVerifyVolunteerLogin);
volunteerRouter.post("/logout", logoutVolunteer);
volunteerRouter.post("/forgetPassword", forgetVolunteerPassword);
volunteerRouter.post("/resetPassword/:id", resetVolunteerPassword);
volunteerRouter.put("/changePassword/:id", changeVolunteerPassword);
volunteerRouter.delete("/delete/:id",isVolAuthenticated,deleteVolunteer);
volunteerRouter.put(
	"/profile/update",
	isVolAuthenticated,
	updateVolunteerProfile,
);
volunteerRouter.get("/profile", isVolAuthenticated, getVolunteerProfile);
volunteerRouter.get("/all", getAllVolunteers);

export default volunteerRouter;
