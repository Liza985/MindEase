// Create a new file: CounselorChat.js in the same directory
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { getChatById } from "../../redux/Actions/chatAction";

const CounselorChat = () => {
	const navigate = useNavigate();
	const { chatId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [chatData, setChatData] = useState(null);
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const messageEndRef = useRef(null);
	const dispatch = useDispatch();

	// Mock data - in a real app, you would fetch this from your backend
	// useEffect(() => {
	//   // Simulate API fetch
	//   setTimeout(() => {
	//     setChatData({
	//       id: chatId,
	//       topic: "Work-Life Balance",
	//       counselor: "Dr. Michael Patel",
	//       startedAt: "2025-03-15T10:30:00Z",
	//       status: "active"
	//     });

	//     setMessages([
	//       {
	//         id: 1,
	//         sender: "counselor",
	//         text: "Hello! Thank you for reaching out about work-life balance. This is something many people struggle with. Could you tell me a bit more about your specific situation?",
	//         timestamp: "2025-03-15T10:35:00Z"
	//       },
	//       {
	//         id: 2,
	//         sender: "user",
	//         text: "Hi Dr. Patel, I've been feeling overwhelmed with my work responsibilities lately. I'm finding it hard to disconnect after work hours and it's affecting my personal life.",
	//         timestamp: "2025-03-15T10:38:00Z"
	//       },
	//       {
	//         id: 3,
	//         sender: "counselor",
	//         text: "I understand how challenging that can be. It's quite common, especially with remote work blurring the lines between work and home. Could you share what your typical day looks like and what specific aspects are most stressful for you?",
	//         timestamp: "2025-03-15T10:42:00Z"
	//       },
	//       {
	//         id: 4,
	//         sender: "user",
	//         text: "I usually start working at 8am and often don't finish until 7 or 8pm. I feel like I need to always be available for emails and messages, even on weekends. The constant notifications and feeling of always being 'on call' is wearing me down.",
	//         timestamp: "2025-03-15T10:46:00Z"
	//       },
	//       {
	//         id: 5,
	//         sender: "counselor",
	//         text: "Thank you for sharing that. Those long hours combined with the expectation of constant availability would be difficult for anyone. Let's work on establishing some boundaries and strategies to help you reclaim your personal time. Have you tried any approaches to disconnect so far?",
	//         timestamp: "2025-03-15T10:50:00Z"
	//       },
	//       {
	//         id: 6,
	//         sender: "counselor",
	//         text: "Let's schedule our follow-up for next Tuesday at 3pm. Does that work for you?",
	//         timestamp: "2025-03-20T16:45:00Z"
	//       }
	//     ]);

	//     setIsLoading(false);
	//   }, 1000);
	// }, [chatId]);

	const { loading, chatDetails } = useSelector((state) => state.chat);
	useEffect(() => {
		dispatch(getChatById(chatId));
	}, [chatId]);
	useEffect(() => {
		// Scroll to bottom whenever messages change
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		const newMsg = {
			id: messages.length + 1,
			sender: "user",
			text: newMessage,
			timestamp: new Date().toISOString(),
		};

		setMessages([...messages, newMsg]);
		setNewMessage("");

		// Simulate counselor response
		setTimeout(() => {
			const counselorResponse = {
				id: messages.length + 2,
				sender: "counselor",
				text: "Thank you for your message. I'll review this and get back to you shortly.",
				timestamp: new Date().toISOString(),
			};
			setMessages((prev) => [...prev, counselorResponse]);
		}, 1500);
	};

	const formatMessageTime = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	};

	const formatMessageDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleDateString();
	};

	// Group messages by date
	const groupMessagesByDate = () => {
		const grouped = {};

		chatDetails?.messages.forEach((message) => {
			const date = formatMessageDate(message.timestamp);
			if (!grouped[date]) {
				grouped[date] = [];
			}
			grouped[date].push(message);
		});

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

			<main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
				{loading ? (
					<div className="flex justify-center items-center py-12 flex-1">
						<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
					</div>
				) : (
					<div className="bg-white rounded-lg shadow-md flex flex-col h-full flex-1">
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

									{groupedMessages[date].map((message) => (
										<div
											key={message.id}
											className={`flex mb-4 ${
												message.sender === "user"
													? "justify-end"
													: "justify-start"
											}`}
										>
											<div
												className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
													message.sender === "user"
														? "bg-orange-500 text-white rounded-br-none"
														: "bg-gray-100 text-gray-800 rounded-bl-none"
												}`}
											>
												<p className="mb-1">{message.text}</p>
												<p
													className={`text-xs ${
														message.sender === "user"
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

						<div className="border-t border-gray-200 p-4">
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
