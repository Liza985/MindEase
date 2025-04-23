import Chat from "../models/Chat.js";
import Notification from "../models/Notification.js";

export const sendMessage = async (req, res) => {
	try {
		const { chatId, content } = req.body;
		const senderId = req.user.id; // From auth middleware

		if (!content || content.trim() === "") {
			return res.status(400).json({
				success: false,
				message: "Message content cannot be empty",
			});
		}

		// Find the chat
		const chat = await Chat.findById(chatId);

		if (!chat) {
			return res.status(404).json({
				success: false,
				message: "Chat not found",
			});
		}

		// Verify the sender is a participant in this chat
		if (chat.clientId !== senderId && chat.counselorId !== senderId) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to send messages in this chat",
			});
		}

		// Create new message
		const newMessage = {
			senderId,
			content,
			timestamp: new Date(),
			read: false,
		};

		// Add message to chat
		chat.messages.push(newMessage);
		chat.updatedAt = new Date();
		await chat.save();

		// Determine recipient ID (the other participant)
		const recipientId =
			senderId === chat.clientId ? chat.counselorId : chat.clientId;

		// Create notification for recipient
		await Notification.create({
			userId: recipientId,
			type: "new_message",
			message: `You have a new message in your counseling chat`,
			read: false,
			relatedId: chat._id,
			createdAt: new Date(),
		});

		res.status(201).json({
			success: true,
			data: newMessage,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to send message",
			error: error.message,
		});
	}
};

export const markMessagesAsRead = async (req, res) => {
	try {
		const { chatId } = req.params;
		const userId = req.user.id;

		const chat = await Chat.findById(chatId);

		if (!chat) {
			return res.status(404).json({
				success: false,
				message: "Chat not found",
			});
		}

		// Verify user is participant in this chat
		if (chat.clientId !== userId && chat.counselorId !== userId) {
			return res.status(403).json({
				success: false,
				message: "You are not authorized to access this chat",
			});
		}

		// Mark messages from the other user as read
		let updated = false;
		const otherUserId =
			userId === chat.clientId ? chat.counselorId : chat.clientId;

		chat.messages.forEach((message) => {
			if (message.senderId === otherUserId && !message.read) {
				message.read = true;
				updated = true;
			}
		});

		if (updated) {
			await chat.save();
		}

		res.status(200).json({
			success: true,
			message: "Messages marked as read",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to mark messages as read",
			error: error.message,
		});
	}
};
