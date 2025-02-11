import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
	sender: {
		type: String,
		enum: ["user", "volunteer", "ai"],
		required: true,
	},
	message: { type: String, required: true },
	timestamp: { type: Date, default: Date.now },
	emotion: { type: String },
});

const volunteerChatSchema = new mongoose.Schema({
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
	messages: [chatMessageSchema],
});

const VolunteerChat = mongoose.model("VolunteerChat", volunteerChatSchema);

export default VolunteerChat;
