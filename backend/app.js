import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./controllers/chatControllers.js";
import contentRouter from "./routes/ContentRoute.js";
import blogRouter from "./routes/blogRoute.js";
import chatRequestRouter from "./routes/chatRequest.js";
import chatRoutes from "./routes/chatRoutes.js";
import feedbackRouter from "./routes/feedbackRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import userRouter from "./routes/userRoute.js";
import volunteerRouter from "./routes/volunteerRoute.js";
import surveyRouter from "./routes/surveyRoute.js";
import {
	adminLogin,
	adminLogout,
	getSettings,
	updateSettings,
} from "./controllers/admin.js";

dotenv.config({ path: "./config/.env" });

const app = express();
export const httpServer = createServer(app);

app.use(
	cors({
		origin: [process.env.LOCAL_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);

// Socket.IO setup
const io = new Server(httpServer, {
	cors: {
		origin: [process.env.LOCAL_URL],
		methods: ["GET", "POST"],
	},
});

// Initialize Socket.IO
initializeSocket(io);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser({ extended: false }));

app.get("/", (req, res) => {
	res.send("server is working");
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/volunteer", volunteerRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/request", chatRequestRouter);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/survey", surveyRouter);

// Admin routes
app.post("/api/v1/admin/login", adminLogin);
app.get("/api/v1/admin/logout", adminLogout);
app.get("/api/v1/admin/settings", getSettings);
app.put("/api/v1/admin/settings", updateSettings);

export default app;
