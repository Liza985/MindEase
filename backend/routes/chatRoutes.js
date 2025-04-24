import express from "express";
import {
	createChat,
	deleteChat,
	getAllChats,
	getChatById,
	getUserChats,
	getVolunteerChats,
	updateChatStatus,
} from "../controllers/chatControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isVolAuthenticated } from "../middlewares/volAuth.js";

const router = express.Router();

// User routes
router.get("/user/chats", isAuthenticated, getUserChats);
router.get("/:id", getChatById);

// Volunteer routes
router.post("/create", isVolAuthenticated, createChat);
router.get("/volunteer/chats", isVolAuthenticated, getVolunteerChats);
router.patch("/chat/:id/status", isVolAuthenticated, updateChatStatus);

// Admin routes
router.get("/admin/chats", getAllChats); 
router.delete("/admin/chat/:id", deleteChat);
export default router;
