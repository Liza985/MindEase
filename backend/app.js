import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import volunteerRouter from "./routes/volunteerRoute.js";
import cors from "cors";
import blogRouter from "./routes/blogRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import feedbackRouter from "./routes/feedbackRoute.js";
import contentRouter from "./routes/ContentRoute.js";
import chatRequestRouter from "./routes/chatRequest.js";

dotenv.config({ path: "./config/.env" });
const app = express();

app.use(
	cors({
		origin: [process.env.LOCAL_URL, process.env.WEB_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser({ extended: false }));

app.get("/", (req, res) => {
	res.send("server is working");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/volunteer", volunteerRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/request", chatRequestRouter);

export default app;
