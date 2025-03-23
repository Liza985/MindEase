import express from "express";
import {
	CreateFeedBack,
	getAllFeedBacks,
	deleteFeedBack,
} from "../controllers/feedback.js";
import { isAuthenticated } from "../middlewares/auth.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/create", isAuthenticated, CreateFeedBack);
feedbackRouter.get("/all", getAllFeedBacks);
feedbackRouter.delete("/delete/:id", isAuthenticated, deleteFeedBack);

export default feedbackRouter;
