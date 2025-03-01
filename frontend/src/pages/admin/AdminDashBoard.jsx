import {
	BarChart,
	FileText,
	MessageSquare,
	PieChart,
	Plus,
	Upload,
	Users,
	Video,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/AdminStatCard";
import UploadModal from "../../components/AdminUploadModal";
import AdminHeader from "./../../components/AdminHeader";
import AdminSidebar from "./../../components/AdminSideBar";

const AdminDashBoard = () => {
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [uploadType, setUploadType] = useState("");
	// Content Row Component
	const ContentRow = ({ title, type, creator, date, status }) => {
		return (
			<tr>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm font-medium text-gray-900">{title}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="flex items-center">
						{type === "Video" ? (
							<Video size={16} className="text-orange-500 mr-2" />
						) : type === "PDF" ? (
							<FileText size={16} className="text-orange-500 mr-2" />
						) : (
							<FileText size={16} className="text-orange-500 mr-2" />
						)}
						<span className="text-sm text-gray-500">{type}</span>
					</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-500">{creator}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-500">{date}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span
						className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
							status === "Published"
								? "bg-green-100 text-green-800"
								: "bg-yellow-100 text-yellow-800"
						}`}
					>
						{status}
					</span>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
					<button className="text-orange-600 hover:text-orange-900 mr-3">
						Edit
					</button>
					<button className="text-red-600 hover:text-red-900">Delete</button>
				</td>
			</tr>
		);
	};

	// Volunteer Row Component
	const VolunteerRow = ({ name, date, chats, status }) => {
		return (
			<tr>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm font-medium text-gray-900">{name}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-500">{date}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<div className="text-sm text-gray-500">{chats}</div>
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<span
						className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
							status === "Active"
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						{status}
					</span>
				</td>
				<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
					<button className="text-orange-600 hover:text-orange-900 mr-3">
						View
					</button>
					<button className="text-blue-600 hover:text-blue-900">Message</button>
				</td>
			</tr>
		);
	};
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
								value="2,547"
								increase="+12%"
								icon={<Users size={24} className="text-orange-500" />}
							/>
							<StatCard
								title="Total Volunteers"
								value="148"
								increase="+5%"
								icon={<Users size={24} className="text-orange-500" />}
							/>
							<StatCard
								title="Total Chats"
								value="3,842"
								increase="+18%"
								icon={<MessageSquare size={24} className="text-orange-500" />}
							/>
							<StatCard
								title="Content Uploads"
								value="312"
								increase="+7%"
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
										<select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
											<option>Last 7 Days</option>
											<option>Last 30 Days</option>
											<option>Last 90 Days</option>
										</select>
									</div>
								</div>
								<div className="h-64 flex items-center justify-center bg-orange-50 rounded-lg">
									<BarChart size={64} className="text-orange-300" />
									<span className="ml-4 text-gray-500">
										Activity Chart Visualization
									</span>
								</div>
							</div>

							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-xl font-semibold text-orange-700 mb-6">
									User Growth
								</h2>
								<div className="h-64 flex items-center justify-center bg-orange-50 rounded-lg">
									<PieChart size={64} className="text-orange-300" />
									<span className="ml-4 text-gray-500">Growth Chart</span>
								</div>
							</div>
						</div>

						{/* Content Management & Upload Section */}
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
										<ContentRow
											title="Introduction to Volunteering"
											type="Video"
											creator="Admin"
											date="Feb 25, 2025"
											status="Published"
										/>
										<ContentRow
											title="Best Practices for Support Chats"
											type="PDF"
											creator="Sarah Johnson"
											date="Feb 22, 2025"
											status="Published"
										/>
										<ContentRow
											title="Volunteer Training Module 1"
											type="Video"
											creator="Admin"
											date="Feb 20, 2025"
											status="Published"
										/>
										<ContentRow
											title="Mental Health Resources"
											type="PDF"
											creator="David Wilson"
											date="Feb 18, 2025"
											status="Draft"
										/>
										<ContentRow
											title="Building Rapport with Users"
											type="Article"
											creator="Admin"
											date="Feb 15, 2025"
											status="Published"
										/>
									</tbody>
								</table>
							</div>
						</div>

						{/* Recent Volunteers Section */}
						<div className="bg-white rounded-lg shadow-md p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-semibold text-orange-700">
									Recent Volunteers
								</h2>
								<Link
									to="#"
									className="text-orange-500 hover:text-orange-600 text-sm font-medium"
								>
									View All
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
										<VolunteerRow
											name="John Doe"
											date="Feb 25, 2025"
											chats="12"
											status="Active"
										/>
										<VolunteerRow
											name="Emma Wilson"
											date="Feb 22, 2025"
											chats="8"
											status="Active"
										/>
										<VolunteerRow
											name="Michael Brown"
											date="Feb 20, 2025"
											chats="15"
											status="Active"
										/>
										<VolunteerRow
											name="Lisa Wong"
											date="Feb 18, 2025"
											chats="7"
											status="Inactive"
										/>
										<VolunteerRow
											name="James Rodriguez"
											date="Feb 15, 2025"
											chats="20"
											status="Active"
										/>
									</tbody>
								</table>
							</div>
						</div>
					</main>
				</div>

				{/* Upload Modal */}
				{showUploadModal && (
					<UploadModal
						onClose={() => setShowUploadModal(false)}
						setUploadType={setUploadType}
						uploadType={uploadType}
					/>
				)}
			</div>
		</>
	);
};

export default AdminDashBoard;
