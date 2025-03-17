import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import volunteerRouter from "./routes/volunteerRoute.js";
import cors from "cors";
import blogRouter from "./routes/blogRoute.js";

dotenv.config({ path: "./config/.env" });
const app = express();

app.use(
	cors({
		origin: [process.env.LOCAL_URL, process.env.WEB_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser({ extended: false }));

app.get("/", (req, res) => {
	res.send("server is working");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/volunteer", volunteerRouter);
app.use("/api/v1/blog",blogRouter);

export default app;
