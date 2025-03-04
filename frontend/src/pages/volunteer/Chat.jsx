import React from "react";
import VolHeader from "../../components/VolHeader";

export const Chat = () => {
	const chats = [
		{
			id: 1,
			name: "Sarah Johnson",
			lastMessage: "Thank you for your help!",
			time: "10 minutes ago",
			unread: 2,
		},
		{
			id: 2,
			name: "Michael Brown",
			lastMessage: "I'll try that approach, thanks!",
			time: "Yesterday",
			unread: 0,
		},
		{
			id: 3,
			name: "Lisa Wong",
			lastMessage: "Can we schedule another session?",
			time: "2 days ago",
			unread: 1,
		},
		{
			id: 4,
			name: "Robert Garcia",
			lastMessage: "The resources you shared were very helpful.",
			time: "1 week ago",
			unread: 0,
		},
	];

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
										{chats.map((chat) => (
											<div
												key={chat.id}
												className="border-b border-orange-100 p-4 hover:bg-orange-50 cursor-pointer"
											>
												<div className="flex justify-between items-start">
													<div>
														<h3 className="font-medium">{chat.name}</h3>
														<p className="text-sm text-gray-600 truncate">
															{chat.lastMessage}
														</p>
													</div>
													<div className="text-right">
														<p className="text-xs text-gray-500">{chat.time}</p>
														{chat.unread > 0 && (
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
											Sarah Johnson
										</h2>
									</div>

									<div className="flex-grow p-4 overflow-y-auto space-y-4">
										<div className="flex justify-start">
											<div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
												<p className="text-gray-800">
													Hello! I'm looking for some career guidance in the
													tech industry.
												</p>
												<p className="text-xs text-gray-500 mt-1">10:30 AM</p>
											</div>
										</div>

										<div className="flex justify-end">
											<div className="bg-orange-100 rounded-lg p-3 max-w-xs md:max-w-md">
												<p className="text-gray-800">
													Hi Sarah! I'd be happy to help. What specific area of
													tech are you interested in?
												</p>
												<p className="text-xs text-gray-500 mt-1">10:32 AM</p>
											</div>
										</div>

										<div className="flex justify-start">
											<div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
												<p className="text-gray-800">
													I'm currently in web development but I'm considering
													transitioning to AI/ML. Do you think that's a good
													move?
												</p>
												<p className="text-xs text-gray-500 mt-1">10:35 AM</p>
											</div>
										</div>

										<div className="flex justify-end">
											<div className="bg-orange-100 rounded-lg p-3 max-w-xs md:max-w-md">
												<p className="text-gray-800">
													That's an exciting transition! AI/ML is definitely
													growing rapidly. Let me share some resources that
													might help you get started.
												</p>
												<p className="text-xs text-gray-500 mt-1">10:37 AM</p>
											</div>
										</div>
									</div>

									<div className="p-4 border-t border-orange-100">
										<div className="flex">
											<input
												type="text"
												placeholder="Type your message..."
												className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
											/>
											<button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600">
												Send
											</button>
										</div>
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
