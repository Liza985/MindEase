import { Clock, MessageSquare, Users } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolHeader from "../../components/VolHeader";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsByVolunteerCategory } from "../../redux/Actions/chatRequestAction";
import { createChat, getVolunteerChat } from "../../redux/Actions/chatAction";
import { toast } from "react-toastify";

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { requests } = useSelector((state) => state.chatRequest);
	const { volunteerChats } = useSelector((state) => state.chat);

	useEffect(() => {
		// Fetch all necessary data when component mounts
		dispatch(getRequestsByVolunteerCategory());
		dispatch(getVolunteerChat());
	}, [dispatch]);

	const acceptChatRequest = async (id) => {
		try {
			const response = dispatch(createChat(id));
			if (response.success) {
				dispatch(getRequestsByVolunteerCategory());
			}
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

	const StatCard = ({ title, value, icon }) => (
		<div className="bg-white rounded-lg shadow-md p-6 flex items-center">
			<div className="mr-4">{icon}</div>
			<div>
				<h3 className="text-gray-500 text-sm">{title}</h3>
				<p className="text-2xl font-bold">{value}</p>
			</div>
		</div>
	);

	const RecentChatItem = ({ name, topic, time }) => (
		<div className="border-b border-gray-100 pb-3">
			<p className="font-medium">{name}</p>
			<p className="text-sm text-gray-600">{topic}</p>
			<p className="text-xs text-gray-500 mt-1">{time}</p>
		</div>
	);

	const topicCounts = requests.reduce((acc, req) => {
		const topic = req.Topic || "General";
		acc[topic] = (acc[topic] || 0) + 1;
		return acc;
	}, {});
	const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);

	const PendingRequest = ({ id, name, topic, time }) => (
		<div className="flex justify-between items-center border-b border-gray-100 pb-3 pt-3">
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-gray-600">{topic}</p>
				<p className="text-xs text-gray-500 mt-1">{time}</p>
			</div>
			<button
				className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition"
				onClick={() => acceptChatRequest(id)}
			>
				Accept
			</button>
		</div>
	);

	return (
		<>
			<VolHeader />
			<div className="min-h-screen bg-gray-50">
				<h2 className="text-2xl font-semibold p-6 pt-8 text-gray-800">
					Dashboard
				</h2>
				<main className="p-6 max-w-7xl mx-auto min-h-screen">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						<StatCard
							title="Pending Requests"
							value={requests?.length}
							icon={<Clock className="text-orange-500" />}
						/>
						<StatCard
							title="Active Chats"
							value={volunteerChats?.length}
							icon={<MessageSquare className="text-orange-500" />}
						/>
						<StatCard
							title="Total Requests"
							value={requests?.length + volunteerChats?.length}
							icon={<Users className="text-orange-500" />}
						/>
					</div>

					<div className="space-y-6">
						{requests.length > 0 ? (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-xl font-semibold mb-4 text-orange-700">
									Pending Requests
								</h2>
								<div className="space-y-1">
									{requests.map((request) => (
										<PendingRequest
											key={request._id}
											id={request._id}
											name={
												request?.userId?.firstName +
												" " +
												request?.userId?.lastName
											}
											topic={request?.Topic}
											time={new Date(request.createdAt).toLocaleString()}
										/>
									))}
								</div>
							</div>
						) : (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-xl font-semibold mb-4 text-orange-700">
									Pending Requests
								</h2>
								<p className="text-gray-500">No pending requests</p>
							</div>
						)}

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-4 text-orange-700">
								Recent Chats
							</h2>
							<div className="space-y-4">
								{volunteerChats?.length > 0 ? (
									[...volunteerChats]
										.sort(
											(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
										)
										.slice(0, 3)
										.map((chat) => (
											<RecentChatItem
												key={chat._id}
												name={`${chat.userId?.firstName} ${chat.userId?.lastName}`}
												topic={chat.topic || "General Support"}
												time={new Date(chat.createdAt).toLocaleString()}
											/>
										))
								) : (
									<p className="text-gray-500">No recent chats</p>
								)}
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-4 text-orange-700">
								Top Requested Topics
							</h2>
							<div className="space-y-2">
								{sortedTopics.length > 0 ? (
									sortedTopics.slice(0, 5).map(([topic, count]) => (
										<p key={topic} className="text-sm text-gray-800">
											<span className="font-medium">{topic}:</span> {count}{" "}
											requests
										</p>
									))
								) : (
									<p className="text-gray-500">No requests found</p>
								)}
							</div>
						</div>
					</div>
				</main>
				<footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
					<p className="text-sm">
						&copy; 2025 MindEaseConnect. All rights reserved.
					</p>
				</footer>
			</div>
		</>
	);
};

export default Dashboard;
