// backend/routes/notificationRoutes.js
import express from 'express';
import {
  getNotifications,
  markAsRead
} from '../controllers/notificationController.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

// Apply authentication middleware
router.use(isAuthenticated);

// Notification routes
router.get('/', getNotifications);
router.patch('/:id/read', markAsRead);

export default router;
