import express from "express";
import {
	CreateFeedBack,
	deleteFeedBack,
	getAllFeedBacks,
} from "../controllers/feedback.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/create", CreateFeedBack);
feedbackRouter.get("/all", getAllFeedBacks);
feedbackRouter.delete("/delete/:id",  deleteFeedBack);

export default feedbackRouter;
