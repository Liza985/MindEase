import express from "express"
import { createReview, getAllReviews, getReviewByRating, getReviewsByUserId, getReviewsByVolId } from "../controllers/review.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isVolAuthenticated } from "../middlewares/volAuth.js";


const reviewRouter= express.Router();


reviewRouter.post("/create",isAuthenticated,createReview);
reviewRouter.get("/all",isAuthenticated,getAllReviews);
reviewRouter.get("/volunteer",isVolAuthenticated,getReviewsByVolId);
reviewRouter.get("/user",isAuthenticated,getReviewsByUserId);
reviewRouter.get("/:rating",isAuthenticated,getReviewByRating);


export default reviewRouter;