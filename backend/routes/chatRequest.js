import express from "express";
import {
	AcceptRequest,
	createRequest,
	deleteRequest,
	getAllRequests,
	getRequestByCategory,
	getRequestById,
	getRequestByUserId,
	updateRequest,
	getRequestByVolunteerCategory,
} from "../controllers/chatRequest.js";
import { isAuthenticated } from "./../middlewares/auth.js";
import { isVolAuthenticated } from "./../middlewares/volAuth.js";

const chatRequestRouter = express.Router();

chatRequestRouter.post("/create", isAuthenticated, createRequest);
chatRequestRouter.get("/all", getAllRequests);
chatRequestRouter.get("/:id", getRequestById);
chatRequestRouter.get("/user/:id", getRequestByUserId);
chatRequestRouter.get("/category/:category", getRequestByCategory);
chatRequestRouter.put("/update/:id", isAuthenticated, updateRequest);
chatRequestRouter.delete("/delete/:id", isAuthenticated, deleteRequest);

chatRequestRouter.get("/accept/:id", isVolAuthenticated, AcceptRequest);
chatRequestRouter.get(
	"/volunteer-category",
	isVolAuthenticated,
	getRequestByVolunteerCategory,
);

export default chatRequestRouter;
