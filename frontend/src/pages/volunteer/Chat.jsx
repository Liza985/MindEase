import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VolHeader from "../../components/VolHeader";
import { getChatById, getVolunteerChat } from "../../redux/Actions/chatAction";
import { useSocket } from "../../context/SocketContext";

export const Chat = () => {
	const dispatch = useDispatch();
	const { volunteerChats, chatDetails } = useSelector((state) => state.chat);
	const { volunteer } = useSelector((state) => state.volunteer);
	const [selectedChatId, setSelectedChatId] = useState(null);
	const [newMessage, setNewMessage] = useState("");
	const { socket } = useSocket();
	const messageEndRef = useRef(null);

	useEffect(() => {
		dispatch(getVolunteerChat());
	}, [dispatch]);

	useEffect(() => {
		if (socket && selectedChatId) {
			// Join the chat room
			socket.emit("join_chat", selectedChatId);

			// Listen for new messages
			socket.on("receive_message", (message) => {
				dispatch(getChatById(selectedChatId));
			});

			// Mark messages as read
			socket.emit("mark_messages_read", { 
				chatId: selectedChatId, 
				userId: volunteer._id 
			});

			// Listen for messages marked as read
			socket.on("messages_marked_read", ({ chatId: updatedChatId }) => {
				if (updatedChatId === selectedChatId) {
					dispatch(getChatById(selectedChatId));
				}
			});

			return () => {
				socket.off("receive_message");
				socket.off("messages_marked_read");
			};
		}
	}, [socket, selectedChatId, volunteer._id, dispatch]);

	useEffect(() => {
		// Scroll to bottom whenever messages change
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatDetails?.messages]);

	const handleChatSelect = (chatId) => {
		setSelectedChatId(chatId);
		dispatch(getChatById(chatId));
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!newMessage.trim() || !socket || !selectedChatId) return;

		socket.emit("send_message", {
			chatId: selectedChatId,
			content: newMessage.trim(),
			senderId: volunteer._id,
			senderType: "Volunteer"
		});

		setNewMessage("");
	};

	return (
		<>
			<VolHeader />
			<div className="flex min-h-screen">
				<div className="flex-1">
					<h1 className="text-2xl font-semibold p-6 pt-8 text-gray-800">
						Chats
					</h1>
					<main className="p-6">
						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="grid md:grid-cols-3 h-[600px]">
								{/* Chat List */}
								<div className="border-r border-orange-100">
									<div className="p-4 border-b border-orange-100 bg-orange-50">
										<h2 className="font-semibold text-orange-700">
											Conversations
										</h2>
									</div>
									<div className="overflow-y-auto h-[calc(600px-57px)]">
										{volunteerChats?.map((chat) => (
											<div
												key={chat._id}
												className={`border-b border-orange-100 p-4 hover:bg-orange-50 cursor-pointer ${
													selectedChatId === chat._id ? "bg-orange-50" : ""
												}`}
												onClick={() => handleChatSelect(chat._id)}
											>
												<div className="flex justify-between items-start">
													<div>
														<h3 className="font-medium">{chat?.topic}</h3>
														<p className="text-sm text-gray-600 truncate">
															{chat?.lastMessage}
														</p>
													</div>
													<div className="text-right">
														<p className="text-xs text-gray-500">
															{chat?.time}
														</p>
														{chat?.unread > 0 && (
															<span className="inline-block bg-orange-500 text-white text-xs rounded-full px-2 py-1 mt-1">
																{chat.unread}
															</span>
														)}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Chat Window */}
								<div className="col-span-2 flex flex-col">
									<div className="p-4 border-b border-orange-100 bg-orange-50">
										<h2 className="font-semibold text-orange-700">
											{chatDetails?.topic || "Select a conversation"}
										</h2>
										{chatDetails?.userId && (
											<p className="text-sm text-gray-600">
												User: {chatDetails.userId.firstName}{" "}
												{chatDetails.userId.lastName}
											</p>
										)}
									</div>

									<div className="flex-grow p-4 overflow-y-auto space-y-4">
										{chatDetails?.messages?.map((message, index) => (
											<div
												key={index}
												className={`flex ${
													message.senderModel === "Volunteer"
														? "justify-end"
														: "justify-start"
												}`}
											>
												<div
													className={`rounded-lg p-3 max-w-xs md:max-w-md ${
														message.senderModel === "Volunteer"
															? "bg-orange-100"
															: "bg-gray-100"
													}`}
												>
													<p className="text-gray-800">{message.content}</p>
													<p className="text-xs text-gray-500 mt-1">
														{new Date(message.timestamp).toLocaleTimeString()}
													</p>
												</div>
											</div>
										))}
										<div ref={messageEndRef}></div>
									</div>

									<div className="p-4 border-t border-orange-100">
										<form onSubmit={handleSendMessage} className="flex">
											<input
												type="text"
												placeholder="Type your message..."
												className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
												value={newMessage}
												onChange={(e) => setNewMessage(e.target.value)}
											/>
											<button
												type="submit"
												className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600"
											>
												Send
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			<footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
				<p className="text-sm">
					&copy; 2025 MindEaseConnect. All rights reserved.
				</p>
			</footer>
		</>
	);
};

export default Chat;
