import {
	CheckCircle2,
	FileEdit,
	Save,
	Trash,
	XCircle,
	XOctagon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VolHeader from "../../components/VolHeader";
import { getRequestsByVolunteerCategory } from './../../redux/Actions/chatRequestAction';


const staticRequests = [
	{
		_id: "1",
		userId: {
			firstName: "John",
			lastName: "Doe",
		},
		category: "Mental Health",
		Topic: "Anxiety Management",
		description: "Need help with managing daily anxiety and panic attacks",
		createdAt: "2025-04-21T10:30:00",
		status: "pending",
	},
	{
		_id: "2",
		userId: {
			firstName: "Jane",
			lastName: "Smith",
		},
		category: "Stress Management",
		Topic: "Work-Life Balance",
		description: "Struggling with balancing professional and personal life",
		createdAt: "2025-04-21T09:15:00",
		status: "pending",
	},
	{
		_id: "3",
		userId: {
			firstName: "Mike",
			lastName: "Johnson",
		},
		category: "Depression",
		Topic: "Depression Support",
		description: "Looking for guidance to cope with depression symptoms",
		createdAt: "2025-04-20T16:45:00",
		status: "accepted",
	},
];

export const Request = () => {
	const [request, setRequest] = useState(staticRequests);
	const [editingId, setEditingId] = useState(null);
	const [editTopic, setEditTopic] = useState("");
	const dispatch = useDispatch();
	const {requests} =useSelector((state)=>state.chatRequest);
	useEffect(()=>{
		dispatch(getRequestsByVolunteerCategory())
	},[])
	const handleAccept = (id) => {
		setRequest(
			request.map((requ) =>
				requ._id === id ? { ...requ, status: "accepted" } : requ,
			),
		);
	};

	const handleReject = (id) => {
		setRequest(
			request.map((requ) =>
				requ._id === id ? { ...requ, status: "rejected" } : requ,
			),
		);
	};

	const handleEdit = (request) => {
		setEditingId(request._id);
		setEditTopic(request.Topic);
	};

	const handleSaveEdit = (id) => {
		setRequest(
			request.map((requ) =>
				requ._id === id ? { ...requ, Topic: editTopic } : requ,
			),
		);
		setEditingId(null);
		setEditTopic("");
	};

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this request?")) {
			setRequest(requests.filter((request) => request._id !== id));
		}
	};

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
																{request.userId.firstName}{" "}
																{request.userId.lastName}
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
																<button
																	onClick={() => handleReject(request._id)}
																	className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-2"
																>
																	<XCircle size={16} />
																	Reject
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
														<button
															onClick={() => handleEdit(request)}
															className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
														>
															<FileEdit size={16} />
														</button>
														<button
															onClick={() => handleDelete(request._id)}
															className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
														>
															<Trash size={16} />
														</button>
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
