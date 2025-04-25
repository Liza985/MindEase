import { CheckCircle2, Save, XCircle, XOctagon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VolHeader from "../../components/VolHeader";
import { createChat } from "../../redux/Actions/chatAction";
import { getRequestsByVolunteerCategory } from "./../../redux/Actions/chatRequestAction";

export const Request = () => {
	// const [request, setRequest] = useState(staticRequests);
	const [editingId, setEditingId] = useState(null);
	const [editTopic, setEditTopic] = useState("");
	const dispatch = useDispatch();
	const { requests } = useSelector((state) => state.chatRequest);

	useEffect(() => {
		dispatch(getRequestsByVolunteerCategory());
	}, [dispatch]);

	const handleAccept = async (id) => {
		try {
			await dispatch(createChat(id));
			dispatch(getRequestsByVolunteerCategory());
		} catch (error) {
			toast.error(
				error?.response?.data?.message || "Failed to accept request",
				{
					position: "top-right",
					autoClose: 3000,
				}
			);
		}
	};


	useEffect(() => {
		console.log("Current requests:", requests);
	}, [requests]);

	return (
		<>
			<VolHeader />
			<div className="min-h-screen bg-gray-50">
				<div className="flex-1 max-w-7xl mx-auto">
					<h1 className="text-2xl font-semibold p-6 pt-8 text-gray-800">
						Chat Requests
					</h1>

					<main className="p-6 pt-0">
						<div className="bg-white rounded-lg shadow-md overflow-hidden">
							<div className="p-4 border-b border-orange-100 bg-orange-50">
								<h2 className="text-xl font-semibold text-orange-700">
									Pending Requests
								</h2>
							</div>

							<div className="divide-y divide-orange-100">
								{requests.length === 0 ? (
									<p className="p-4">No pending requests found.</p>
								) : (
									requests.map((request) => (
										<div
											key={request._id}
											className={`p-4 ${
												request.status === "accepted"
													? "bg-green-50"
													: request.status === "rejected"
													? "bg-red-50"
													: ""
											}`}
										>
											<div className="flex flex-col gap-3">
												<div className="flex items-start justify-between">
													<div className="flex-grow">
														<div className="flex items-center gap-3 mb-2">
															<h3 className="font-medium text-lg">
																{request.userId?.firstName}{" "}
																{request.userId?.lastName}
															</h3>
															<span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
																{request.category}
															</span>
														</div>

														{editingId === request._id ? (
															<div className="flex items-center gap-2">
																<input
																	type="text"
																	value={editTopic}
																	onChange={(e) => setEditTopic(e.target.value)}
																	className="border rounded px-2 py-1"
																/>
																<button
																	onClick={() => handleSaveEdit(request._id)}
																	className="text-green-600 hover:text-green-700"
																>
																	<Save size={16} />
																</button>
																<button
																	onClick={() => setEditingId(null)}
																	className="text-gray-600 hover:text-gray-700"
																>
																	<XOctagon size={16} />
																</button>
															</div>
														) : (
															<>
																<h4 className="text-gray-800 font-medium mb-1">
																	{request.Topic}
																</h4>
																<p className="text-gray-600 mb-2">
																	{request.description}
																</p>
															</>
														)}

														<p className="text-sm text-gray-500">
															{new Date(request.createdAt).toLocaleString()}
														</p>
													</div>

													<div className="flex items-center gap-2">
														{request.status === "pending" && (
															<>
																<button
																	onClick={() => handleAccept(request._id)}
																	className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center gap-2"
																>
																	<CheckCircle2 size={16} />
																	Accept
																</button>
															</>
														)}
														{request.status !== "pending" && (
															<span
																className={`px-3 py-1 rounded text-white flex items-center gap-2 ${
																	request.status === "accepted"
																		? "bg-green-500"
																		: "bg-red-500"
																}`}
															>
																{request.status === "accepted" ? (
																	<CheckCircle2 size={14} />
																) : (
																	<XCircle size={14} />
																)}
																{request.status.charAt(0).toUpperCase() +
																	request.status.slice(1)}
															</span>
														)}
													</div>
												</div>
											</div>
										</div>
									))
								)}
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

export default Request;
