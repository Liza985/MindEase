// import { Clock, MessageSquare, Users } from "lucide-react";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import VolHeader from "../../components/VolHeader";

// const Dashboard = () => {
// 	const navigate = useNavigate();

// 	const StatCard = ({ title, value, icon }) => (
// 		<div className="bg-white rounded-lg shadow-md p-6 flex items-center">
// 			<div className="mr-4">{icon}</div>
// 			<div>
// 				<h3 className="text-gray-500 text-sm">{title}</h3>
// 				<p className="text-2xl font-bold">{value}</p>
// 			</div>
// 		</div>
// 	);

// 	const ActivityItem = ({ message, time }) => (
// 		<div className="border-b border-gray-100 pb-3">
// 			<p className="text-gray-800">{message}</p>
// 			<p className="text-xs text-gray-500 mt-1">{time}</p>
// 		</div>
// 	);

// 	const UpcomingSession = ({ name, topic, time }) => (
// 		<div className="flex justify-between items-center border-b border-gray-100 pb-3">
// 			<div>
// 				<p className="font-medium">{name}</p>
// 				<p className="text-sm text-gray-600">{topic}</p>
// 				<p className="text-xs text-gray-500 mt-1">{time}</p>
// 			</div>
// 			<button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition">
// 				Join
// 			</button>
// 		</div>
// 	);

// 	return (
// 		<>
// 			<VolHeader />
// 			<div className="min-h-screen bg-gray-50">
// 				<h2 className="text-2xl font-semibold p-6 pt-8 text-gray-800">
// 					Dashboard
// 				</h2>
// 				<main className="p-6 max-w-7xl mx-auto">
// 					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
// 						<StatCard
// 							title="Pending Requests"
// 							value="12"
// 							icon={<Clock className="text-orange-500" />}
// 						/>
// 						<StatCard
// 							title="Active Chats"
// 							value="5"
// 							icon={<MessageSquare className="text-orange-500" />}
// 						/>
// 						<StatCard
// 							title="Completed Sessions"
// 							value="28"
// 							icon={<Users className="text-orange-500" />}
// 						/>
// 					</div>

// 					<div className="space-y-6">
// 						<div className="bg-white rounded-lg shadow-md p-6">
// 							<h2 className="text-xl font-semibold mb-4 text-orange-700">
// 								Recent Activity
// 							</h2>
// 							<div className="space-y-4">
// 								<ActivityItem
// 									message="New chat request from Sarah about career guidance"
// 									time="2 minutes ago"
// 								/>
// 								<ActivityItem
// 									message="You completed a session with Mike"
// 									time="Yesterday at 4:30 PM"
// 								/>
// 								<ActivityItem
// 									message="New blog post published: 'How to effectively mentor others'"
// 									time="2 days ago"
// 								/>
// 							</div>
// 						</div>

// 						<div className="bg-white rounded-lg shadow-md p-6">
// 							<h2 className="text-xl font-semibold mb-4 text-orange-700">
// 								Upcoming Sessions
// 							</h2>
// 							<div className="space-y-4">
// 								<UpcomingSession
// 									name="John Doe"
// 									topic="Financial planning advice"
// 									time="Today, 3:00 PM"
// 								/>
// 								<UpcomingSession
// 									name="Emma Wilson"
// 									topic="Career transition guidance"
// 									time="Tomorrow, 10:00 AM"
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 				</main>
// 				<footer className="bg-white shadow-sm border-t border-gray-200 p-4 text-center text-black-800">
// 				<p className="text-sm">
// 					&copy; 2025 MindEaseConnect. All rights reserved.
// 				</p>
// 			</footer>
// 			</div>
// 		</>
// 	);
// };

// export default Dashboard;

import { Clock, MessageSquare, Users } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolHeader from "../../components/VolHeader";
import axios from "axios"; // Make sure axios is installed

const Dashboard = () => {
	const navigate = useNavigate();
	const [pendingRequests, setPendingRequests] = useState([]);
	const [activeChats, setActiveChats] = useState([]);
	const [completedSessions, setCompletedSessions] = useState(0);
	const [recentActivity, setRecentActivity] = useState([]);
	const [upcomingSessions, setUpcomingSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch all necessary data when component mounts
		fetchDashboardData();
	}, []);

	const fetchDashboardData = async () => {
		setLoading(true);
		try {
			// You can make parallel requests using Promise.all
			const [requestsRes, chatsRes, sessionsRes, activityRes, upcomingRes] =
				await Promise.all([
					axios.get("/api/requests/pending"),
					axios.get("/api/chats/active"),
					axios.get("/api/sessions/completed/count"),
					axios.get("/api/activity/recent"),
					axios.get("/api/sessions/upcoming"),
				]);

			// Make sure pendingRequests is always an array
			const pendingRequestsData = Array.isArray(requestsRes.data)
				? requestsRes.data
				: requestsRes.data.data || requestsRes.data.requests || [];

			// Do the same for other array data
			const activeChatsData = Array.isArray(chatsRes.data)
				? chatsRes.data
				: chatsRes.data.data || chatsRes.data.chats || [];

			const recentActivityData = Array.isArray(activityRes.data)
				? activityRes.data
				: activityRes.data.data || activityRes.data.activities || [];

			const upcomingSessionsData = Array.isArray(upcomingRes.data)
				? upcomingRes.data
				: upcomingRes.data.data || upcomingRes.data.sessions || [];

			// Set the state with properly handled data
			setPendingRequests(pendingRequestsData);
			setActiveChats(activeChatsData);
			setCompletedSessions(sessionsRes.data.count || 0);
			setRecentActivity(recentActivityData);
			setUpcomingSessions(upcomingSessionsData);
		} catch (err) {
			// Initialize empty arrays on error
			setPendingRequests([]);
			setActiveChats([]);
			setCompletedSessions(0);
			setRecentActivity([]);
			setUpcomingSessions([]);
			setError("Failed to load dashboard data. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const acceptChatRequest = async (requestId) => {
		try {
			// Call your backend API to accept the chat request
			const response = await axios.post(`/api/requests/${requestId}/accept`);

			// If successful, redirect to the chat page or update the UI
			if (response.data.success) {
				// Option 1: Redirect to chat
				navigate(`/chat/${response.data.chatId}`);

				// Option 2: Or just update the state to reflect the change
				// fetchDashboardData();
			}
		} catch (err) {
			// Show error to the user
			alert("Failed to accept chat request. Please try again.");
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

	const ActivityItem = ({ message, time }) => (
		<div className="border-b border-gray-100 pb-3">
			<p className="text-gray-800">{message}</p>
			<p className="text-xs text-gray-500 mt-1">{time}</p>
		</div>
	);

	const UpcomingSession = ({ id, name, topic, time }) => (
		<div className="flex justify-between items-center border-b border-gray-100 pb-3">
			<div>
				<p className="font-medium">{name}</p>
				<p className="text-sm text-gray-600">{topic}</p>
				<p className="text-xs text-gray-500 mt-1">{time}</p>
			</div>
			<button
				className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600 transition"
				onClick={() => navigate(`/chat/${id}`)}
			>
				Join
			</button>
		</div>
	);

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

	if (loading) {
		return (
			<>
				<VolHeader />
				<div className="min-h-screen bg-gray-50 flex justify-center items-center">
					<p>Loading dashboard data...</p>
				</div>
			</>
		);
	}

	if (error) {
		return (
			<>
				<VolHeader />
				<div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
					<p className="text-red-500 mb-4">{error}</p>
					<button
						className="bg-orange-500 text-white px-4 py-2 rounded-md"
						onClick={fetchDashboardData}
					>
						Try Again
					</button>
				</div>
			</>
		);
	}

	return (
		<>
			<VolHeader />
			<div className="min-h-screen bg-gray-50">
				<h2 className="text-2xl font-semibold p-6 pt-8 text-gray-800">
					Dashboard
				</h2>
				<main className="p-6 max-w-7xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						<StatCard
							title="Pending Requests"
							value={pendingRequests.length}
							icon={<Clock className="text-orange-500" />}
						/>
						<StatCard
							title="Active Chats"
							value={activeChats.length}
							icon={<MessageSquare className="text-orange-500" />}
						/>
						<StatCard
							title="Completed Sessions"
							value={completedSessions}
							icon={<Users className="text-orange-500" />}
						/>
					</div>

					<div className="space-y-6">
						{pendingRequests.length > 0 && (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-xl font-semibold mb-4 text-orange-700">
									Pending Requests
								</h2>
								<div className="space-y-1">
									{pendingRequests.map((request) => (
										<PendingRequest
											key={request.id}
											id={request.id}
											name={request.userName}
											topic={request.topic}
											time={new Date(request.createdAt).toLocaleString()}
										/>
									))}
								</div>
							</div>
						)}

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-4 text-orange-700">
								Recent Activity
							</h2>
							<div className="space-y-4">
								{recentActivity.length > 0 ? (
									recentActivity.map((activity) => (
										<ActivityItem
											key={activity.id}
											message={activity.message}
											time={new Date(activity.timestamp).toLocaleString()}
										/>
									))
								) : (
									<p className="text-gray-500">No recent activity</p>
								)}
							</div>
						</div>

						<div className="bg-white rounded-lg shadow-md p-6">
							<h2 className="text-xl font-semibold mb-4 text-orange-700">
								Upcoming Sessions
							</h2>
							<div className="space-y-4">
								{upcomingSessions.length > 0 ? (
									upcomingSessions.map((session) => (
										<UpcomingSession
											key={session.id}
											id={session.id}
											name={session.userName}
											topic={session.topic}
											time={new Date(session.scheduledTime).toLocaleString()}
										/>
									))
								) : (
									<p className="text-gray-500">No upcoming sessions</p>
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
