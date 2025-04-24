import { saveAs } from "file-saver";
import {
	ArrowUpDown,
	Download,
	Filter,
	MoreHorizontal,
	Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/AdminSideBar";
import { getAllChats } from "../../redux/Actions/chatAction";
import ChatViewModal from "../../components/ChatViewModal";

const Chats = () => {
	const { allChats } = useSelector((state) => state.chat);
	const dispatch = useDispatch();

	// Filter states
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [sortField, setSortField] = useState("updatedAt");
	const [sortDirection, setSortDirection] = useState("desc");

	// State for managing the modal
	const [viewChat, setViewChat] = useState(null);

	useEffect(() => {
		dispatch(getAllChats());
	}, [dispatch]);

	// Sorting function
	const handleSort = (field) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	// Filter and sort chats
	const filteredChats = allChats
		?.filter(
			(chat) =>
				(statusFilter === "All" || chat?.status === statusFilter) &&
				(chat?.userId?.firstName
					?.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
					chat?.userId?.lastName
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					chat?.userId?.email
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					chat?.volunteerId?.firstName
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					chat?.volunteerId?.lastName
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					chat?.volunteerId?.email
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					chat?._id?.toLowerCase().includes(searchTerm.toLowerCase())),
		)
		.sort((a, b) => {
			let compareA, compareB;

			switch (sortField) {
				case "messages":
					compareA = a?.messages?.length || 0;
					compareB = b?.messages?.length || 0;
					break;
				case "User":
					compareA = a?.userId?.firstName || "";
					compareB = b?.userId?.firstName || "";
					break;
				case "volunteer":
					compareA = a?.volunteerId?.firstName || "";
					compareB = b?.volunteerId?.firstName || "";
					break;
				case "status":
					compareA = a?.status || "";
					compareB = b?.status || "";
					break;
				case "createdAt":
					compareA = new Date(a?.createdAt || 0);
					compareB = new Date(b?.createdAt || 0);
					break;
				default: // updatedAt
					compareA = new Date(a?.updatedAt || 0);
					compareB = new Date(b?.updatedAt || 0);
			}

			if (compareA < compareB) return sortDirection === "asc" ? -1 : 1;
			if (compareA > compareB) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});

	// Format date for display
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Function to handle export
	const handleExport = () => {
		const exportData = allChats.map((chat) => ({
			chatId: chat._id,
			user: `${chat.userId?.firstName || "Unknown"} ${chat.userId?.lastName || ""}`,
			volunteer: `${chat.volunteerId?.firstName || "Unknown"} ${chat.volunteerId?.lastName || ""}`,
			messages: chat.messages?.length || 0,
			status: chat.status || "Unknown",
			lastActivity: chat.updatedAt || "N/A",
		}));

		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: "application/json",
		});
		saveAs(blob, "chats_export.json");
	};

	// Add logging to debug the view button functionality
	const handleView = (chat) => {
		console.log("Selected chat for viewing:", chat);
		setViewChat(chat);
	};

	return (
		<div className="flex min-h-screen bg-gray-100">
			<AdminSidebar />

			<div className="ml-64 flex-grow p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-800">Chats Management</h1>
					<button
						onClick={handleExport}
						className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center gap-2"
					>
						<Download size={16} />
						Export Data
					</button>
				</div>

				<div className="bg-white rounded-lg shadow-md">
					<div className="p-4 border-b border-gray-200">
						<div className="flex flex-col md:flex-row gap-4 justify-between">
							<div className="relative flex-grow max-w-md">
								<input
									type="text"
									placeholder="Search by ID, name, or email..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<Search
									className="absolute left-3 top-2.5 text-gray-400"
									size={18}
								/>
							</div>

							<div className="flex items-center gap-2">
								<Filter size={18} className="text-gray-500" />
								<select
									className="border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
								>
									<option value="All">All Status</option>
									<option value="active">Active</option>
									<option value="closed">Closed</option>
									<option value="on-hold">On Hold</option>
								</select>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<button
											className="flex items-center space-x-1"
											onClick={() => handleSort("id")}
										>
											<span>Chat ID</span>
											{sortField === "id" && (
												<ArrowUpDown
													size={14}
													className={
														sortDirection === "asc"
															? "transform rotate-180"
															: ""
													}
												/>
											)}
										</button>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<button
											className="flex items-center space-x-1"
											onClick={() => handleSort("User")}
										>
											<span>User</span>
											{sortField === "User" && (
												<ArrowUpDown
													size={14}
													className={
														sortDirection === "asc"
															? "transform rotate-180"
															: ""
													}
												/>
											)}
										</button>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<button
											className="flex items-center space-x-1"
											onClick={() => handleSort("receiver")}
										>
											<span>Volunteer</span>
											{sortField === "volunteer" && (
												<ArrowUpDown
													size={14}
													className={
														sortDirection === "asc"
															? "transform rotate-180"
															: ""
													}
												/>
											)}
										</button>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<button
											className="flex items-center space-x-1"
											onClick={() => handleSort("messages")}
										>
											<span>Messages</span>
											{sortField === "messages" && (
												<ArrowUpDown
													size={14}
													className={
														sortDirection === "asc"
															? "transform rotate-180"
															: ""
													}
												/>
											)}
										</button>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<button
											className="flex items-center space-x-1"
											onClick={() => handleSort("status")}
										>
											<span>Status</span>
											{sortField === "status" && (
												<ArrowUpDown
													size={14}
													className={
														sortDirection === "asc"
															? "transform rotate-180"
															: ""
													}
												/>
											)}
										</button>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										<button
											className="flex items-center space-x-1"
											onClick={() => handleSort("updatedAt")}
										>
											<span>Last Activity</span>
											{sortField === "updatedAt" && (
												<ArrowUpDown
													size={14}
													className={
														sortDirection === "asc"
															? "transform rotate-180"
															: ""
													}
												/>
											)}
										</button>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredChats?.map((chat) => (
									<tr key={chat?._id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">
												{chat?._id}
											</div>
											<div className="text-xs text-gray-500">
												Created:{" "}
												{chat?.createdAt ? formatDate(chat.createdAt) : "N/A"}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{chat?.userId ? (
												<>
													<div className="text-sm font-medium text-gray-900">
														{chat.userId.firstName} {chat.userId.lastName}
													</div>
													<div className="text-xs text-gray-500">
														ID: {chat.userId._id}
													</div>
													<div className="text-xs text-gray-500">
														{chat.userId.email}
													</div>
												</>
											) : (
												<div className="text-sm text-gray-500">
													User not available
												</div>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{chat?.volunteerId ? (
												<>
													<div className="text-sm font-medium text-gray-900">
														{chat.volunteerId.firstName}{" "}
														{chat.volunteerId.lastName}
													</div>
													<div className="text-xs text-gray-500">
														ID: {chat.volunteerId._id}
													</div>
													<div className="text-xs text-gray-500">
														{chat.volunteerId.email}
													</div>
													{chat.volunteerId.expertiseArea && (
														<div className="text-xs text-gray-500 mt-1">
															<span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
																{chat.volunteerId.expertiseArea}
															</span>
														</div>
													)}
												</>
											) : (
												<div className="text-sm text-gray-500">
													Volunteer not assigned
												</div>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-500">
												{chat?.messages?.length || 0}
											</div>
											{chat?.requestId && (
												<div className="text-xs text-gray-500 mt-1">
													<div>Topic: {chat.requestId.Topic || "N/A"}</div>
													<div>
														Category: {chat.requestId.category || "N/A"}
													</div>
												</div>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
												chat?.status === "active"
													? "bg-green-100 text-green-800"
													: chat?.status === "closed"
													? "bg-gray-100 text-gray-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
											>
												{chat?.status
													? chat.status.charAt(0).toUpperCase() +
													  chat.status.slice(1)
													: "Unknown"}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{chat?.updatedAt ? formatDate(chat.updatedAt) : "N/A"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex space-x-2">
												<button
													className="text-orange-600 hover:text-orange-800"
													onClick={() => handleView(chat)}
												>
													View
												</button>
											</div>
										</td>
									</tr>
								))}
								{allChats?.length === 0 && (
									<tr>
										<td
											colSpan="7"
											className="px-6 py-4 text-center text-gray-500"
										>
											No chats found matching your filters
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					<div className="p-4 border-t border-gray-200 flex justify-between items-center">
						<div className="text-sm text-gray-700">
							Showing{" "}
							<span className="font-medium">{filteredChats?.length || 0}</span>{" "}
							of <span className="font-medium">{allChats?.length || 0}</span>{" "}
							chats
						</div>
						<div className="flex space-x-2">
							<button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
								Previous
							</button>
							<button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
								Next
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Modal for viewing chat details */}
			{viewChat && (
				<ChatViewModal chat={viewChat} onClose={() => setViewChat(null)} />
			)}
		</div>
	);
};

export default Chats;
