import Request from "../models/Request.js";
import Chat from "../models/Chat.js";
import Notification from "../models/Notification.js";

export const getAllRequests = async (req, res) => {
	try {
		const userId = req.user.id;
		const requests = await Request.find({ userId });

		res.status(200).json({
			success: true,
			data: requests,
		});
	} catch (error) {
		console.error("Error fetching requests:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch counseling requests",
			error: error.message,
		});
	}
};

export const createRequest = async (req, res) => {
	try {
		const { topic, description } = req.body;
		const userId = req.user.id;

		if (!topic || !description) {
			return res.status(400).json({
				success: false,
				message: "Please provide topic and description",
			});
		}

		const request = await Request.create({
			userId,
			topic,
			description,
			status: "pending",
			createdAt: new Date(),
			notified: false,
		});

		res.status(201).json({
			success: true,
			data: request,
		});
	} catch (error) {
		console.error("Error creating request:", error);
		res.status(500).json({
			success: false,
			message: "Failed to create counseling request",
			error: error.message,
		});
	}
};

export const markRequestAsNotified = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user.id;

		const request = await Request.findOne({ _id: id, userId });

		if (!request) {
			return res.status(404).json({
				success: false,
				message: "Request not found",
			});
		}

		request.notified = true;
		await request.save();

		res.status(200).json({
			success: true,
			data: request,
		});
	} catch (error) {
		console.error("Error marking request as notified:", error);
		res.status(500).json({
			success: false,
			message: "Failed to mark request as notified",
			error: error.message,
		});
	}
};

// --- Chat Controllers ---
export const getAllChats = async (req, res) => {
	try {
		const userId = req.user.id;

		const chats = await Chat.find({
			$or: [{ clientId: userId }, { counselorId: userId }],
		}).populate("requestId");

		res.status(200).json({
			success: true,
			data: chats,
		});
	} catch (error) {
		console.error("Error fetching chats:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch counseling chats",
			error: error.message,
		});
	}
};

export const createChat = async (req, res) => {
	try {
		const { requestId, counselorId } = req.body;
		const userId = req.user.id;

		const request = await Request.findById(requestId);

		if (!request) {
			return res.status(404).json({
				success: false,
				message: "Request not found",
			});
		}

		if (request.status !== "pending") {
			return res.status(400).json({
				success: false,
				message: "This request has already been processed",
			});
		}

		request.status = "accepted";
		request.counselorId = counselorId;
		await request.save();

		const chat = await Chat.create({
			requestId,
			clientId: request.userId,
			counselorId,
			messages: [],
			status: "active",
			createdAt: new Date(),
		});

		await Notification.create({
			userId: request.userId,
			type: "chat_created",
			message: `Your counseling request for "${request.topic}" has been accepted`,
			read: false,
			relatedId: chat._id,
			createdAt: new Date(),
		});

		res.status(201).json({
			success: true,
			data: chat,
		});
	} catch (error) {
		console.error("Error creating chat:", error);
		res.status(500).json({
			success: false,
			message: "Failed to create counseling chat",
			error: error.message,
		});
	}
};
