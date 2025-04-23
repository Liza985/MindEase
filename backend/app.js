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
import { Server } from "socket.io";
import http from "http";
dotenv.config({ path: "./config/.env" });

const app = express();
export const server = http.createServer(app);

// Initialize Socket.io with CORS configuration
const io = new Server(server, {
  cors: {
    origin: [process.env.LOCAL_URL, process.env.WEB_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  }
});

// Make io available to routes
app.set('io', io);

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

// Socket.io event handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  
  // User registration
  socket.on("register_user", ({ userId, name }) => {
    console.log(`User registered: ${name} (${userId})`);
    const chatId = `chat_${userId}`;
    
    // Notify volunteers about new chat using structure expected by volunteer component
    io.to("volunteers").emit("new_chat_request", {
      chatId: chatId,
      userName: name,
      lastMessage: "New conversation started",
      timestamp: Date.now()
    });
  });
  
  // Volunteer registration
  socket.on("register_volunteer", ({ volunteerId, name }) => {
    console.log(`Volunteer registered: ${name} (${volunteerId})`);
    socket.join("volunteers");
    
    // Send active chats instead of available_chats to match your component
    // For now, send empty array - later you'll fetch from database
    socket.emit("active_chats", []);
  });
  
  // Joining a chat room
  socket.on("join_chat", (chatId) => {
    console.log(`${socket.id} joined chat: ${chatId}`);
    socket.join(chatId);
    
    // Send chat history format matching your component's expectation
    const chatHistory = {
      id: chatId,
      messages: [],
      lastActivity: Date.now()
    };
    
    socket.emit("chat_history", chatHistory);
  });
  
  // Accept chat (not in original implementation)
  socket.on("accept_chat", ({ chatId, volunteerId }) => {
    console.log(`Volunteer ${volunteerId} accepted chat ${chatId}`);
    // In a real implementation, you'd update a database
    // For now, just notify the chat room
    io.to(chatId).emit("volunteer_assigned", {
      volunteerId: volunteerId,
      volunteerName: "Volunteer" // In reality, you'd look this up
    });
  });
  // In your server socket handler after a successful chat acceptance:
// socket.emit("chat_accepted_success", { 
//   chatId: acceptedChatId,
//   volunteerId: acceptingVolunteerId
// });

// Then add this listener in your Chat component:
socket.on("chat_accepted_success", (data) => {
  if (data.volunteerId === volunteerId) {
    // Manually request an update of active chats
    socket.emit("get_active_chats");
  }
});
  // Sending messages
  socket.on("send_message", (messageData) => {
    console.log(`New message in ${messageData.chatId}: ${messageData.message}`);
    
    // Add ID to the message
    const messageWithId = {
      ...messageData,
      id: Date.now().toString()
    };
    
    // Broadcast to the room
    socket.to(messageData.chatId).emit("receive_message", messageWithId);
  });
  
  // Mark messages as read
  socket.on("mark_messages_read", ({ chatId, userType }) => {
    console.log(`${userType} marked messages as read in ${chatId}`);
    // You would update your database here
  });

  // Counseling specific events
  socket.on("counseling_request", (requestData) => {
    // Store the request in database (handled by API routes)
    // Notify available counselors
    io.to("counselors").emit("new_counseling_request", {
      id: requestData.id,
      topic: requestData.topic,
      userName: requestData.userName,
      timestamp: Date.now()
    });
  });

  socket.on("join_counselors", (counselorId) => {
    console.log(`Counselor ${counselorId} joined counselor group`);
    socket.join("counselors");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/volunteer", volunteerRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/request", chatRequestRouter);

export default app;
