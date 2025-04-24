import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";
import {
	FileText,
	MessageSquare,
	Plus,
	Upload,
	Users,
	Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StatCard from "../../components/AdminStatCard";
import UploadModal from "../../components/AdminUploadModal";
import ContentViewModal from "../../components/ContentViewModal";
import {
	deleteContent,
	getAllContent,
} from "../../redux/Actions/activityAction";
import { getAllChats } from "../../redux/Actions/chatAction";
import AdminHeader from "./../../components/AdminHeader";
import AdminSidebar from "./../../components/AdminSideBar";
import { getAllUsers } from "./../../redux/Actions/userAction";
import { getAllVolunteers } from "./../../redux/Actions/volunteerAction";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
);

const AdminDashBoard = () => {
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [uploadType, setUploadType] = useState("");
	const [viewModalData, setViewModalData] = useState(null);
	const [timeRange, setTimeRange] = useState("7days");
	const [selectedVolunteer, setSelectedVolunteer] = useState(null);

	const dispatch = useDispatch();
	const { contentItems } = useSelector((state) => state.content);
	const { volunteers } = useSelector((state) => state.volunteer);
	const { users } = useSelector((state) => state.user);
	const { allChats } = useSelector((state) => state.chat);

	// Helper function to get last 7 days
	const getLast7Days = () => {
		const dates = [];
		for (let i = 6; i >= 0; i--) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			dates.push(date);
		}
		return dates;
	};

	// Prepare activity chart data
	const getActivityData = () => {
		const last7Days = getLast7Days();
		const requestData = new Array(7).fill(0);
		const activeChatData = new Array(7).fill(0);

		// Count requests per day
		allChats?.forEach((chat) => {
			const chatDate = new Date(chat.createdAt);
			const dayIndex = last7Days.findIndex(
				(date) => date.toDateString() === chatDate.toDateString(),
			);
			if (dayIndex !== -1) {
				if (chat.status === "active") {
					activeChatData[dayIndex]++;
				}
				requestData[dayIndex]++;
			}
		});

		return {
			labels: last7Days.map((date) =>
				date.toLocaleDateString("en-US", { weekday: "short" }),
			),
			datasets: [
				{
					label: "Counseling Requests",
					data: requestData,
					backgroundColor: "rgba(249, 115, 22, 0.5)",
					borderColor: "rgba(249, 115, 22, 1)",
					borderWidth: 1,
				},
				{
					label: "Active Chats",
					data: activeChatData,
					backgroundColor: "rgba(34, 197, 94, 0.5)",
					borderColor: "rgba(34, 197, 94, 1)",
					borderWidth: 1,
				},
			],
		};
	};

	const activityData = getActivityData();

	// Prepare user distribution chart data
	const userGrowthData = {
		labels: ["Users", "Volunteers"],
		datasets: [
			{
				data: [users?.length || 0, volunteers?.length || 0],
				backgroundColor: [
					"rgba(249, 115, 22, 0.7)", // Orange for users
					"rgba(59, 130, 246, 0.7)", // Blue for volunteers
				],
				borderColor: ["rgba(249, 115, 22, 1)", "rgba(59, 130, 246, 1)"],
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "bottom",
			},
		},
	};

	const getFullName = (vol) =>
		[vol.firstName, vol.middleName, vol.lastName].filter(Boolean).join(" ");

	useEffect(() => {
		dispatch(getAllContent());
		dispatch(getAllChats());
		dispatch(getAllVolunteers());
		dispatch(getAllUsers());
	}, [dispatch]);

	const handleDelete = (id) => {
		dispatch(deleteContent(id)).then(() => {
			dispatch(getAllContent());
		});
	};

	const handleView = (item) => {
		setViewModalData(item);
	};

	const ContentRow = ({ item }) => (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm font-medium text-gray-900">{item.title}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					{item.contentType === "Video" ? (
						<Video size={16} className="text-orange-500 mr-2" />
					) : (
						<FileText size={16} className="text-orange-500 mr-2" />
					)}
					<span className="text-sm text-gray-500">{item.contentType}</span>
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">{item.author}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">
					{new Date(item.createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<span
					className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
						item.status === "Published"
							? "bg-green-100 text-green-800"
							: "bg-yellow-100 text-yellow-800"
					}`}
				>
					{item.status}
				</span>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex gap-2">
					<button
						onClick={() => handleView(item)}
						className="text-red-600 hover:text-red-900"
					>
						View
					</button>
					<button
						onClick={() => handleDelete(item._id)}
						className="text-red-600 hover:text-red-900"
					>
						Delete
					</button>
				</div>
			</td>
		</tr>
	);

	// Volunteer details modal component
	const VolunteerDetailModal = ({ volunteer, onClose }) => {
		if (!volunteer) return null;

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
				<div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
					<div className="p-6">
						<div className="flex justify-between items-start mb-6">
							<div>
								<h2 className="text-2xl font-bold text-gray-800">
									Volunteer Profile
								</h2>
								<p className="text-gray-600">Details and performance metrics</p>
							</div>
							<button
								onClick={onClose}
								className="text-gray-400 hover:text-gray-600"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-semibold mb-4 text-gray-800">
									Personal Information
								</h3>
								<div className="space-y-3">
									<div>
										<label className="text-sm text-gray-500">Full Name</label>
										<p className="font-medium">{getFullName(volunteer)}</p>
									</div>
									<div>
										<label className="text-sm text-gray-500">Email</label>
										<p className="font-medium">{volunteer.email}</p>
									</div>
									<div>
										<label className="text-sm text-gray-500">Phone</label>
										<p className="font-medium">
											{volunteer.phoneNumber || "Not provided"}
										</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4 text-gray-800">
									Availability
								</h3>
								<div className="space-y-3">
									<div>
										<label className="text-sm text-gray-500">
											Days Available
										</label>
										<p className="font-medium">
											{volunteer.availability?.daysAvailable?.join(", ") ||
												"Not set"}
										</p>
									</div>
									<div>
										<label className="text-sm text-gray-500">Time Slots</label>
										<p className="font-medium">
											{volunteer.availability?.timeSlots?.start &&
											volunteer.availability?.timeSlots?.end
												? `${volunteer.availability.timeSlots.start} - ${volunteer.availability.timeSlots.end}`
												: "Not set"}
										</p>
									</div>
								</div>
							</div>

							<div className="md:col-span-2">
								<h3 className="text-lg font-semibold mb-4 text-gray-800">
									Expertise & Skills
								</h3>
								<div className="flex flex-wrap gap-2">
									{volunteer.expertiseArea?.map((area, index) => (
										<span
											key={index}
											className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full"
										>
											{area}
										</span>
									))}
								</div>
							</div>

							<div className="md:col-span-2">
								<h3 className="text-lg font-semibold mb-4 text-gray-800">
									Performance Metrics
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
									<div className="bg-gray-50 p-4 rounded-lg">
										<p className="text-sm text-gray-500">Total Sessions</p>
										<p className="text-2xl font-bold text-gray-800">
											{volunteer.totalSessions || 0}
										</p>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg">
										<p className="text-sm text-gray-500">Average Rating</p>
										<p className="text-2xl font-bold text-gray-800">
											{volunteer.averageRating || "N/A"}
										</p>
									</div>
									<div className="bg-gray-50 p-4 rounded-lg">
										<p className="text-sm text-gray-500">Response Rate</p>
										<p className="text-2xl font-bold text-gray-800">
											{volunteer.responseRate || "N/A"}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const VolunteerRow = ({ volunteer }) => (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm font-medium text-gray-900">
					{getFullName(volunteer)}
				</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">{volunteer.createdAt}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-500">{volunteer.chatsCompleted}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<span
					className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
						volunteer.isVerified
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					}`}
				>
					{volunteer.isVerified ? "Verified" : "Not Verified"}
				</span>
			</td>

			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<button
					onClick={() => setSelectedVolunteer(volunteer)}
					className="text-orange-600 hover:text-orange-900 mr-3"
				>
					View
				</button>
				<button className="text-blue-600 hover:text-blue-900">Message</button>
			</td>
		</tr>
	);

	return (
		<>
			<AdminSidebar />
			<div className="flex min-h-screen">
				<div className="w-64 flex-shrink-0"></div>
				<div className="flex-1">
					<AdminHeader title="Admin Dashboard" />
					<main className="p-6 bg-orange-50">
						{/* Stats Overview */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
							<StatCard
								title="Total Users"
								value={users?.length || 0}
								increase={`+${Math.round((users?.length / 100) * 12)}%`}
								icon={<Users size={24} className="text-orange-500" />}
							/>
							<StatCard
								title="Total Volunteers"
								value={volunteers?.length || 0}
								increase={`+${Math.round((volunteers?.length / 100) * 5)}%`}
								icon={<Users size={24} className="text-orange-500" />}
							/>
							<StatCard
								title="Total Chats"
								value={allChats?.length || 0}
								increase={`+${Math.round((allChats?.length / 100) * 18)}%`}
								icon={<MessageSquare size={24} className="text-orange-500" />}
							/>
							<StatCard
								title="Content Uploads"
								value={contentItems?.length || 0}
								increase={`+${Math.round((contentItems?.length / 100) * 7)}%`}
								icon={<Upload size={24} className="text-orange-500" />}
							/>
						</div>

						

						{/* Platform Activity & User Growth */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
							<div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
								<div className="flex justify-between items-center mb-6">
									<h2 className="text-xl font-semibold text-orange-700">
										Platform Activity
									</h2>
									<div className="flex space-x-2">
										<select
											className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white"
											value={timeRange}
											onChange={(e) => setTimeRange(e.target.value)}
										>
											<option value="7days">Last 7 Days</option>
											<option value="30days">Last 30 Days</option>
											<option value="90days">Last 90 Days</option>
										</select>
									</div>
								</div>
								<div className="h-64">
									<Bar data={activityData} options={chartOptions} />
								</div>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-xl font-semibold text-orange-700 mb-6">
									User Distribution
								</h2>
								<div className="h-64">
									<Pie data={userGrowthData} options={chartOptions} />
								</div>
							</div>
						</div>

						{/* Content Management Section */}
						<div className="bg-white rounded-lg shadow-md p-6 mb-8">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-semibold text-orange-700">
									Content Management
								</h2>
								<button
									onClick={() => setShowUploadModal(true)}
									className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-orange-600 transition"
								>
									<Plus size={18} />
									<span>Add Content</span>
								</button>
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-orange-100">
									<thead className="bg-orange-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Title
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Type
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Created By
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Date Added
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Status
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-orange-100">
										{contentItems?.map((item) => (
											<ContentRow key={item._id} item={item} />
										))}
									</tbody>
								</table>
							</div>
						</div>

						{/* Recent Volunteers Section - Moved to top */}
						<div className="bg-white rounded-lg shadow-md p-6 mb-8">
							<div className="flex justify-between items-center mb-6">
								<div>
									<h2 className="text-2xl font-semibold text-orange-700">
										Recent Volunteers
									</h2>
									<p className="text-gray-500 mt-1">
										Latest volunteers who joined the platform
									</p>
								</div>
								<Link
									to="/admin/volunteers"
									className="inline-flex items-center px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
								>
									View All
									<svg
										className="w-5 h-5 ml-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Link>
							</div>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-orange-100">
									<thead className="bg-orange-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Name
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Joined
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Chats Completed
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Status
											</th>
											<th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-orange-100">
										{volunteers?.slice(0, 5).map((volunteer, index) => (
											<VolunteerRow key={index} volunteer={volunteer} />
										))}
									</tbody>
								</table>
							</div>
						</div>
					</main>
				</div>
				{showUploadModal && (
					<UploadModal
						onClose={() => setShowUploadModal(false)}
						setUploadType={setUploadType}
						uploadType={uploadType}
					/>
				)}
				{viewModalData && (
					<ContentViewModal
						item={viewModalData}
						onClose={() => setViewModalData(null)}
					/>
				)}
				{selectedVolunteer && (
					<VolunteerDetailModal
						volunteer={selectedVolunteer}
						onClose={() => setSelectedVolunteer(null)}
					/>
				)}
			</div>
		</>
	);
};

export default AdminDashBoard;
