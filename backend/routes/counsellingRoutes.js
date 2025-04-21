import express from "express";
import {
    getAllRequests,
    createRequest,
    markRequestAsNotified,
    getAllChats,
    createChat
  } from '../controllers/counselingController.js';
import { isAuthenticated } from "../middlewares/auth.js";
import { sendMessage, markMessagesAsRead } from '../controllers/messageController.js';
const router=express.Router();

router.use(isAuthenticated);

router.patch('/requests/:id/notify', markRequestAsNotified);

// Chat routes
router.route('/chats')
  .get(getAllChats)
  .post(createChat);

// Message routes
router.post('/chats/:chatId/messages', sendMessage);
router.patch('/chats/:chatId/read', markMessagesAsRead);

export default router;

