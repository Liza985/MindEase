import express from "express";
import {
	addContent,
	deleteContent,
	getAllContent,
	getContentByCategory,
	getContentById,
	updateById,
} from "./../controllers/activity.js";
import { isAuthenticated } from "../middlewares/auth.js";

const contentRouter = express.Router();

contentRouter.post("/create", addContent);
contentRouter.delete("/delete/:id", deleteContent);
contentRouter.put("/update/:id", updateById);
contentRouter.get("/all", getAllContent);
contentRouter.get("/category/:category", getContentByCategory);
contentRouter.get("/:id", getContentById);

export default contentRouter;
