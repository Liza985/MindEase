import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
	getRequestByUserId,
	deleteRequest,
	updateRequest,
} from "../../redux/Actions/chatRequestAction";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const CounselorRequests = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState("requests");
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedRequestId, setSelectedRequestId] = useState(null);

	const { loading, requestByUser, error, message } = useSelector(
		(state) => state.chatRequest,
	);
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		
		// if (user && user._id) {
			dispatch(getRequestByUserId("67c603de1566adfc72b958c5"));
			
		// }
	}, [dispatch]);

	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
		}
	}, [error, message, dispatch]);

	const handleStartChat = (chatId) => {
		navigate(`/counselor-chat/${chatId}`);
	};

	const handleEdit = (id) => {
		navigate(`/edit-request/${id}`);
	};

	const openDeleteModal = (id) => {
		setSelectedRequestId(id);
		setDeleteModalOpen(true);
	};

	const confirmDelete = () => {
		dispatch(deleteRequest(selectedRequestId));
		setDeleteModalOpen(false);
		setSelectedRequestId(null);
	};

	const cancelDelete = () => {
		setDeleteModalOpen(false);
		setSelectedRequestId(null);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
		});
	};

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
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						My Counseling
					</h2>

					<div className="border-b border-gray-200 mb-6">
						<div className="flex space-x-8">
							<button
								className={`pb-4 px-1 ${
									activeTab === "requests"
										? "border-b-2 border-orange-500 text-orange-600 font-medium"
										: "text-gray-500 hover:text-gray-700"
								}`}
								onClick={() => setActiveTab("requests")}
							>
								Requests
							</button>
							<button
								className={`pb-4 px-1 ${
									activeTab === "chats"
										? "border-b-2 border-orange-500 text-orange-600 font-medium"
										: "text-gray-500 hover:text-gray-700"
								}`}
								onClick={() => setActiveTab("chats")}
							>
								Active Chats
							</button>
						</div>
					</div>

					{loading ? (
						<div className="flex justify-center items-center py-12">
							<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
						</div>
					) : (
						<>
							{activeTab === "requests" && (
								<div>
									{requestByUser && requestByUser.length > 0 ? (
										<div className="space-y-4">
											{requestByUser?.map((request) => (
												<div
													key={request._id}
													className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
												>
													<div className="flex justify-between items-start mb-2">
														<div>
															<h3 className="text-lg font-medium text-gray-800">
																{request.Topic}
															</h3>
														</div>
														<div className="flex items-center gap-3">
															<span
																className={`px-2 py-1 text-xs rounded-full ${
																	request.status === "pending"
																		? "bg-yellow-100 text-yellow-800"
																		: "bg-green-100 text-green-800"
																}`}
															>
																{request.status.charAt(0).toUpperCase() +
																	request.status.slice(1)}
															</span>
															<button
																className="text-gray-500 hover:text-orange-600"
																onClick={() => handleEdit(request._id)}
															>
																<Pencil size={18} />
															</button>
															<button
																className="text-gray-500 hover:text-red-600"
																onClick={() => openDeleteModal(request._id)}
															>
																<Trash size={18} />
															</button>
														</div>
													</div>
													<p className="text-gray-600 mb-3">
														{request.description}
													</p>
													<div className="text-sm text-gray-500">
														<span>Category: {request.category}</span>
														<span className="mx-2">•</span>
														<span>
															Submitted: {formatDate(request.createdAt)}
														</span>
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="text-center py-8">
											<p className="text-gray-500 mb-4">
												You don't have any active requests.
											</p>
											<button
												onClick={() => navigate("/counselling")}
												className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
											>
												Create New Request
											</button>
										</div>
									)}
								</div>
							)}

							{activeTab === "chats" && (
								<div>
									{requests && requests.length > 0 ? (
										<div className="space-y-4">
											{requests
												.filter((request) => request.status === "accepted")
												.map((chat) => (
													<div
														key={chat._id}
														className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
														onClick={() => handleStartChat(chat._id)}
													>
														<div className="flex justify-between items-start mb-2">
															<h3 className="text-lg font-medium text-gray-800">
																{chat.Topic}
															</h3>
															{chat.unread > 0 && (
																<span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
																	{chat.unread} new
																</span>
															)}
														</div>
														<p className="text-gray-600 mb-3">
															<span className="font-medium">
																{chat.counselor}:
															</span>{" "}
															{chat.lastMessage}
														</p>
														<div className="text-sm text-gray-500">
															Last updated: {formatDate(chat.updatedAt)}
														</div>
													</div>
												))}
										</div>
									) : (
										<div className="text-center py-8">
											<p className="text-gray-500 mb-4">
												You don't have any active chats.
											</p>
											<button
												onClick={() => navigate("/counseling")}
												className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
											>
												Request Counseling
											</button>
										</div>
									)}
								</div>
							)}
						</>
					)}
				</div>
			</main>

			<footer className="bg-white text-black text-center py-4 mt-8">
				<p>&copy; 2025 MindEase. All rights reserved.</p>
			</footer>

			{/* Delete Confirmation Modal */}
			{deleteModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
					<div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-lg font-semibold text-gray-800">
								Confirm Delete
							</h3>
							<button
								onClick={cancelDelete}
								className="text-gray-400 hover:text-gray-600"
							>
								<X size={20} />
							</button>
						</div>
						<p className="text-gray-600 mb-6">
							Are you sure you want to delete this counseling request? This
							action cannot be undone.
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={cancelDelete}
								className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md"
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CounselorRequests;
