import React from "react";
import { X } from "lucide-react";

const ChatViewModal = ({ chat, onClose }) => {
	if (!chat) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative border border-gray-200">
				<div className="absolute top-4 right-4">
					<button
						onClick={onClose}
						title="Close"
						className="text-gray-400 hover:text-gray-700 transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				<h2 className="text-2xl font-bold text-gray-800 mb-4">Chat Details</h2>

				<div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
					<div>
						<strong>Chat ID:</strong> {chat._id}
					</div>
					<div>
						<strong>Status:</strong> {chat.status}
					</div>
					<div>
						<strong>User:</strong> {chat.userId?.firstName} {chat.userId?.lastName}
					</div>
					<div>
						<strong>Volunteer:</strong> {chat.volunteerId?.firstName} {chat.volunteerId?.lastName}
					</div>
					<div>
						<strong>Messages:</strong> {chat.messages?.length || 0}
					</div>
					<div>
						<strong>Last Updated:</strong> {new Date(chat.updatedAt).toLocaleString()}
					</div>
				</div>

				<div className="text-sm text-gray-700 mb-4">
					<strong>Topic:</strong>
					<p className="mt-1 whitespace-pre-wrap leading-relaxed">
						{chat.requestId?.Topic || "N/A"}
					</p>
				</div>

				<div className="text-sm text-gray-700 mb-4">
					<strong>Category:</strong>
					<p className="mt-1 whitespace-pre-wrap leading-relaxed">
						{chat.requestId?.category || "N/A"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatViewModal;