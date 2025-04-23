import cloudinary from "cloudinary";
import { server } from "./app.js"; // Import server instead of app
import connectDB from "./config/db.js";

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Use the server instead of app to listen
server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});