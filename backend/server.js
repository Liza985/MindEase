import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { httpServer } from "./app.js";
import connectDB from "./config/db.js";

// Configure dotenv before using any environment variables
dotenv.config({ path: "./config/.env" });

// Connect to database
connectDB();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// Replace app.listen with httpServer.listen
httpServer.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
