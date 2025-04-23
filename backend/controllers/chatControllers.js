import Chat from "../models/Chat.js";
import ChatRequest from "../models/chatRequest.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";

export const initializeSocket = (io) => {
	io.on("connection", (socket) => {
		console.log("New client connected");

		// Join a chat room
		socket.on("join_chat", (chatId) => {
			socket.join(chatId);
			console.log(`User joined chat: ${chatId}`);
		});

		// Handle new messages
		socket.on("send_message", async (data) => {
			try {
				const { chatId, content, senderId, senderType } = data;
				const chat = await Chat.findById(chatId);

				if (!chat) {
					socket.emit("error", "Chat not found");
					return;
				}

				const newMessage = {
					sender: senderId,
					senderModel: senderType,
					content,
					timestamp: new Date(),
					read: false,
				};

				chat.messages.push(newMessage);
				chat.lastMessage = content;
				await chat.save();

				io.to(chatId).emit("receive_message", {
					...newMessage,
					chatId,
				});
			} catch (error) {
				socket.emit("error", error.message);
			}
		});

		// Mark messages as read
		socket.on("mark_messages_read", async (data) => {
			try {
				const { chatId, userId } = data;
				const chat = await Chat.findById(chatId);

				if (chat) {
					chat.messages.forEach((msg) => {
						if (msg.sender.toString() !== userId) {
							msg.read = true;
						}
					});
					await chat.save();
					io.to(chatId).emit("messages_marked_read", { chatId, userId });
				}
			} catch (error) {
				socket.emit("error", error.message);
			}
		});

		socket.on("disconnect", () => {
			console.log("Client disconnected");
		});
	});
};

export const createChat = async (req, res) => {
	try {
		const { id } = req.body;

		const request = await ChatRequest.findById(id);

		if (!request) {
			return Response(res, 404, false, message.requestNotFound);
		}

		if (request.status !== "pending") {
			return Response(res, 400, false, "Request already processed");
		}

		const chat = await Chat.create({
			requestId: id,
			userId: request.userId,
			volunteerId: req.volunteer._id,
			topic: request.Topic,
			messages: [],
			status: "active",
		});

		request.status = "accepted";
		await request.save();

		await chat.populate([
			{ path: "userId", select: "firstName lastName email" },
			{ path: "volunteerId", select: "firstName lastName email expertiseArea" },
		]);

		return Response(res, 201, true, "Chat created successfully", chat);
	} catch (error) {
		return Response(res, 500, false, error.message);
	}
};

export const getUserChats = async (req, res) => {
	try {
		const chats = await Chat.find({ userId: req.user._id })
			.populate("volunteerId", "firstName lastName email expertiseArea")
			.populate("requestId", "Topic category")
			.sort({ updatedAt: -1 });

		return Response(res, 200, true, "Chats fetched successfully", chats);
	} catch (error) {
		return Response(res, 500, false, error.message);
	}
};

export const getVolunteerChats = async (req, res) => {
	try {
		const chats = await Chat.find({ volunteerId: req.volunteer._id })
			.populate("userId", "firstName lastName email")
			.populate("requestId", "Topic category")
			.sort({ updatedAt: -1 });

		return Response(res, 200, true, "Chats fetched successfully", chats);
	} catch (error) {
		return Response(res, 500, false, error.message);
	}
};

export const getChatById = async (req, res) => {
	try {
		const { id } = req.params;
		const chat = await Chat.findById(id)
			.populate("userId", "firstName lastName email")
			.populate("volunteerId", "firstName lastName email expertiseArea")
			.populate("requestId", "Topic category");

		if (!chat) {
			return Response(res, 404, false, "Chat not found");
		}

		return Response(res, 200, true, "Chat fetched successfully", chat);
	} catch (error) {
		return Response(res, 500, false, error.message);
	}
};

export const updateChatStatus = async (req, res) => {
	try {
		const { status } = req.body;
		const chat = await Chat.findById(req.params.id);

		if (!chat) {
			return Response(res, 404, false, "Chat not found");
		}

		chat.status = status;
		await chat.save();

		return Response(res, 200, true, "Chat status updated successfully", chat);
	} catch (error) {
		return Response(res, 500, false, error.message);
	}
};
