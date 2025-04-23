import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: "senderModel",
		required: true,
	},
	senderModel: {
		type: String,
		required: true,
		enum: ["User", "Volunteer"],
	},
	content: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	read: {
		type: Boolean,
		default: false,
	},
});

const chatSchema = new mongoose.Schema(
	{
		requestId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ChatRequest",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		volunteerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Volunteer",
			required: true,
		},
		topic: {
			type: String,
			required: true,
		},
		messages: [messageSchema],
		lastMessage: {
			type: String,
			default: "",
		},
		status: {
			type: String,
			enum: ["active", "closed", "on-hold"],
			default: "active",
		},
	},
	{
		timestamps: true,
	},
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
