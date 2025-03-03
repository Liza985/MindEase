import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VolHeader from "../../components/VolHeader";

export const Request = () => {
	const navigate = useNavigate();
	const [requests, setRequests] = useState([
		{
			id: 1,
			name: "Sarah Johnson",
			topic: "Career guidance",
			status: "pending",
			time: "10 minutes ago",
		},
		{
			id: 2,
			name: "David Lee",
			topic: "Financial advice",
			status: "pending",
			time: "30 minutes ago",
		},
		{
			id: 3,
			name: "Maria Garcia",
			topic: "Educational resources",
			status: "pending",
			time: "1 hour ago",
		},
		{
			id: 4,
			name: "James Wilson",
			topic: "Mental health support",
			status: "pending",
			time: "2 hours ago",
		},
		{
			id: 5,
			name: "Emily Chen",
			topic: "Community involvement",
			status: "pending",
			time: "3 hours ago",
		},
	]);

	const handleAccept = (id) => {
		setRequests(
			requests.map((req) =>
				req.id === id ? { ...req, status: "accepted" } : req,
			),
		);
	};

	const handleReject = (id) => {
		setRequests(
			requests.map((req) =>
				req.id === id ? { ...req, status: "rejected" } : req,
			),
		);
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
								{requests.map((request) => (
									<div
										key={request.id}
										className={`p-4 ${
											request.status === "accepted"
												? "bg-green-50"
												: request.status === "rejected"
												? "bg-red-50"
												: ""
										}`}
									>
										<div className="flex items-center justify-between">
											<div>
												<h3 className="font-medium text-lg">{request.name}</h3>
												<p className="text-gray-600">{request.topic}</p>
												<p className="text-sm text-gray-500">{request.time}</p>
											</div>
											<div className="space-x-2">
												{request.status === "pending" ? (
													<>
														<button
															onClick={() => handleAccept(request.id)}
															className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
														>
															Accept
														</button>
														<button
															onClick={() => handleReject(request.id)}
															className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
														>
															Reject
														</button>
													</>
												) : (
													<span
														className={`px-3 py-1 rounded text-white ${
															request.status === "accepted"
																? "bg-green-500"
																: "bg-red-500"
														}`}
													>
														{request.status === "accepted"
															? "Accepted"
															: "Rejected"}
													</span>
												)}
											</div>
										</div>
									</div>
								))}
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
