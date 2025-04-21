import mongoose from "mongoose";

const chatRequestSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		category: {
			type: String,
			required: true,
		},
		Topic: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status:{
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
		}
	},
	{
		timestamps: true,
	},
);

const ChatRequest = mongoose.model("ChatRequest", chatRequestSchema);
export default ChatRequest;
