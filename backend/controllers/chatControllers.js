// In-memory storage for active chats when database is not available
import Chat from "../models/chatModel.js"; // Assuming you have a Chat model defined
const activeChats = new Map();
const pendingChats = new Map();

export const getChatStats = async (req, res) => {
	try {
		// If you're using a database
		if (Chat) {
			const pendingCount = await Chat.countDocuments({
				volunteerId: null,
				status: "pending",
			});

			const acceptedCount = await Chat.countDocuments({
				volunteerId: { $ne: null },
				status: "assigned",
			});

			return res.status(200).json({
				success: true,
				stats: {
					pending: pendingCount,
					accepted: acceptedCount,
					total: pendingCount + acceptedCount,
				},
			});
		} else {
			// Using in-memory storage
			return res.status(200).json({
				success: true,
				stats: {
					pending: pendingChats.size,
					accepted: activeChats.size,
					total: pendingChats.size + activeChats.size,
				},
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch chat statistics",
			error: error.message,
		});
	}
};

export const getChatsByVolunteer = async (req, res) => {
	try {
		const { volunteerId } = req.params;

		if (!volunteerId) {
			return res.status(400).json({
				success: false,
				message: "Volunteer ID is required",
			});
		}

		// If using database
		if (Chat) {
			const chats = await Chat.find({
				volunteerId,
				status: "assigned",
			});

			return res.status(200).json({
				success: true,
				volunteerId,
				chatCount: chats.length,
				chats,
			});
		} else {
			// Using in-memory storage
			const volunteerChats = Array.from(activeChats.values()).filter(
				(chat) => chat.volunteerId === volunteerId,
			);

			return res.status(200).json({
				success: true,
				volunteerId,
				chatCount: volunteerChats.length,
				chats: volunteerChats,
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch volunteer chats",
			error: error.message,
		});
	}
};

// For Socket.io to use these functions
export const trackChat = (chatId, userId, userName) => {
	pendingChats.set(chatId, {
		id: chatId,
		userId,
		userName,
		status: "pending",
		createdAt: Date.now(),
		messages: [],
	});

	return {
		pending: pendingChats.size,
		accepted: activeChats.size,
	};
};

export const acceptChat = (chatId, volunteerId, volunteerName) => {
	const chat = pendingChats.get(chatId);

	if (chat) {
		chat.volunteerId = volunteerId;
		chat.volunteerName = volunteerName;
		chat.status = "assigned";
		chat.assignedAt = Date.now();

		// Move from pending to active
		pendingChats.delete(chatId);
		activeChats.set(chatId, chat);
	}

	return {
		pending: pendingChats.size,
		accepted: activeChats.size,
	};
};

export const rejectChat = (chatId) => {
	pendingChats.delete(chatId);

	return {
		pending: pendingChats.size,
		accepted: activeChats.size,
	};
};

export const endChat = (chatId) => {
	activeChats.delete(chatId);

	return {
		pending: pendingChats.size,
		accepted: activeChats.size,
	};
};

export const getAllChats = () => {
	return {
		pending: Array.from(pendingChats.values()),
		accepted: Array.from(activeChats.values()),
	};
};
