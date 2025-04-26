import express from "express";
import {
	createSurvey,
	getAllSurveys,
	getSurveyById,
	getSurveyByUserId,
} from "../controllers/survey.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, createSurvey);
router.get("/all", getAllSurveys);
router.get("/user", isAuthenticated, getSurveyByUserId);
router.get("/:id", getSurveyById); // Moved to the end since it's a catch-all route

export default router;
