import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { getChatById } from "../../redux/Actions/chatAction";
import { useSocket } from "../../context/SocketContext";

const CounselorChat = () => {
	const navigate = useNavigate();
	const { chatId } = useParams();
	const [newMessage, setNewMessage] = useState("");
	const messageEndRef = useRef(null);
	const dispatch = useDispatch();
	const { socket } = useSocket();
	const { user } = useSelector((state) => state.user);
	const { loading, chatDetails } = useSelector((state) => state.chat);

	useEffect(() => {
		dispatch(getChatById(chatId));
	}, [chatId, dispatch]);

	useEffect(() => {
		if (socket && chatId) {
			// Join the chat room
			socket.emit("join_chat", chatId);

			// Listen for new messages
			socket.on("receive_message", (message) => {
				dispatch(getChatById(chatId)); // Refresh chat to include new message
			});

			// Mark messages as read
			socket.emit("mark_messages_read", { chatId, userId: user._id });

			// Listen for messages marked as read
			socket.on("messages_marked_read", ({ chatId: updatedChatId }) => {
				if (updatedChatId === chatId) {
					dispatch(getChatById(chatId));
				}
			});

			return () => {
				socket.off("receive_message");
				socket.off("messages_marked_read");
			};
		}
	}, [socket, chatId, user._id, dispatch]);

	useEffect(() => {
		// Scroll to bottom whenever messages change
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatDetails?.messages]);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!newMessage.trim() || !socket) return;

		socket.emit("send_message", {
			chatId,
			content: newMessage.trim(),
			senderId: user._id,
			senderType: "User",
		});

		setNewMessage("");
	};

	const formatMessageTime = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
	};

	const formatMessageDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Group messages by date
	const groupMessagesByDate = () => {
		const grouped = {};
		if (chatDetails?.messages) {
			chatDetails.messages.forEach((message) => {
				const date = formatMessageDate(message.timestamp);
				if (!grouped[date]) {
					grouped[date] = [];
				}
				grouped[date].push(message);
			});
		}
		return grouped;
	};

	const groupedMessages = groupMessagesByDate();

	return (
		<div className="min-h-screen flex flex-col bg-orange-50 pt-20">
			<nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
				<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-20 w-full">
						<Header />
					</div>
				</div>
			</nav>

			<main className="container mx-auto px-4 py-8 flex-1">
				{loading ? (
					<div className="flex justify-center items-center py-12 flex-1">
						<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
					</div>
				) : (
					<div className="bg-white rounded-lg shadow-md flex flex-col h-[calc(100vh-180px)]">
						<div className="border-b border-gray-200 px-6 py-4 flex items-center">
							<button
								onClick={() => navigate("/counselor-requests")}
								className="text-orange-500 hover:text-orange-600 mr-4"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 19l-7-7m0 0l7-7m-7 7h18"
									/>
								</svg>
							</button>
							<div>
								<h3 className="text-lg font-semibold">{chatDetails?.topic}</h3>
								<p className="text-sm text-gray-500">
									Counselor: {chatDetails?.volunteerId?.firstName}{" "}
									{chatDetails?.volunteerId?.lastName}
								</p>
							</div>
						</div>

						<div className="flex-1 p-6 overflow-y-auto">
							{Object.keys(groupedMessages).map((date) => (
								<div key={date}>
									<div className="flex justify-center my-4">
										<span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
											{date}
										</span>
									</div>

									{groupedMessages[date].map((message, idx) => (
										<div
											key={idx}
											className={`flex mb-4 ${
												message.senderModel === "User"
													? "justify-end"
													: "justify-start"
											}`}
										>
											<div
												className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
													message.senderModel === "User"
														? "bg-orange-500 text-white rounded-br-none"
														: "bg-gray-100 text-gray-800 rounded-bl-none"
												}`}
											>
												<p className="mb-1">{message.content}</p>
												<p
													className={`text-xs ${
														message.senderModel === "User"
															? "text-orange-100"
															: "text-gray-500"
													} text-right`}
												>
													{formatMessageTime(message.timestamp)}
												</p>
											</div>
										</div>
									))}
								</div>
							))}
							<div ref={messageEndRef} />
						</div>

						<div className="border-t border-gray-200 p-4 bg-white">
							<form onSubmit={handleSendMessage} className="flex">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Type your message..."
									className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								/>
								<button
									type="submit"
									className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
										/>
									</svg>
								</button>
							</form>
						</div>
					</div>
				)}
			</main>

			<footer className="bg-white text-black text-center py-4 mt-8">
				<p>&copy; 2025 MindEase. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default CounselorChat;
