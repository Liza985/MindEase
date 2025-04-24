import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Download,
	Clock,
	Search,
	Eye,
} from "lucide-react";
import AdminSidebar from "../../components/AdminSideBar";
import { getAllVolunteers } from "./../../redux/Actions/volunteerAction";

const Volunteers = () => {
	const dispatch = useDispatch();
	const { volunteers = [] } = useSelector((state) => state.volunteer);

	const [filteredVolunteers, setFilteredVolunteers] = useState(volunteers);
	const [searchTerm, setSearchTerm] = useState("");
	const [notFound, setNotFound] = useState(false);
	const [selectedVolunteer, setSelectedVolunteer] = useState(null);

	useEffect(() => {
		dispatch(getAllVolunteers());
	}, [dispatch]);

	useEffect(() => {
		let filtered = [...volunteers];
		if (searchTerm) {
			filtered = filtered.filter(
				(volunteer) =>
					volunteer.firstName
						?.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					volunteer.email?.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		setFilteredVolunteers(filtered);

		if (searchTerm && filtered.length === 0) {
			setNotFound(true);
			setTimeout(() => setNotFound(false), 2000);
		}
	}, [volunteers, searchTerm]);

	const getFullName = (vol) =>
		[vol.firstName, vol.middleName, vol.lastName].filter(Boolean).join(" ");

	const handleExport = () => {
		if (!volunteers || volunteers.length === 0) return;

		const headers = [
			"Name",
			"Email",
			"Phone Number",
			"Days Available",
			"Time Slot Start",
			"Time Slot End",
			"Expertise",
		];
		const rows = volunteers.map((vol) => [
			getFullName(vol),
			vol.email || "",
			vol.phoneNumber || "",
			vol.availability?.daysAvailable?.join(", ") || "",
			vol.availability?.timeSlots?.start || "",
			vol.availability?.timeSlots?.end || "",
			vol.expertiseArea?.join(", ") || "",
		]);

		const csvContent = [headers, ...rows]
			.map((e) => e.map((cell) => `"${cell}"`).join(","))
			.join("\n");

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.setAttribute("download", "volunteers.csv");
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	// Modal component for volunteer details
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

	return (
		<div className="flex min-h-screen">
			<AdminSidebar />
			<div className="w-64 flex-shrink-0"></div>

			<div className="flex-1">
				<header className="bg-white shadow-sm p-4 flex justify-between items-center">
					<h1 className="text-xl font-bold text-gray-800">
						Volunteer Management
					</h1>
					<div className="flex items-center space-x-4">
						<div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-orange-800 font-bold">
							A
						</div>
						<span className="text-gray-700">Admin</span>
					</div>
				</header>

				<main className="p-6 bg-orange-50">
					<div className="flex justify-between items-center mb-6">
						<div>
							<h2 className="text-2xl font-semibold text-orange-700">
								Volunteers
							</h2>
							<p className="text-gray-600">Manage all volunteer information</p>
						</div>
						<button
							onClick={handleExport}
							className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg bg-white"
						>
							<Download size={18} />
							<span>Export</span>
						</button>
					</div>

					<div className="bg-white rounded-lg shadow-md p-4 mb-6">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
							<div className="relative w-full md:w-64">
								<input
									type="text"
									placeholder="Search volunteer..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<Search
									size={18}
									className="absolute left-3 top-2.5 text-gray-400"
								/>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 border-b">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											<div className="flex items-center space-x-1">
												<span>Name</span>
												<ChevronDown size={14} />
											</div>
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Email
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Phone Number
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Available Time
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Expertise
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{filteredVolunteers?.map((vol) => (
										<tr key={vol._id} className="hover:bg-gray-50">
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="h-10 w-10 flex-shrink-0 bg-orange-100 rounded-full flex items-center justify-center">
														<span className="text-orange-800">
															{vol.firstName?.charAt(0)}
														</span>
													</div>
													<div className="ml-4 text-sm font-medium text-gray-900">
														{getFullName(vol)}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
												{vol.email}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
												{vol.phoneNumber}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
												<div className="flex items-center">
													<Clock size={16} className="text-orange-500 mr-2" />
													{vol.availability?.daysAvailable?.join(", ")} |{" "}
													{vol.availability?.timeSlots?.start} -{" "}
													{vol.availability?.timeSlots?.end}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
												<div className="flex flex-wrap gap-1">
													{vol.expertiseArea?.map((area, index) => (
														<span
															key={index}
															className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
														>
															{area}
														</span>
													))}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
												<button
													onClick={() => setSelectedVolunteer(vol)}
													className="flex items-center text-orange-600 hover:text-orange-800"
												>
													<Eye size={16} className="mr-1" />
													View
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
							<div className="text-sm text-gray-600">
								Showing <span className="font-medium">1</span> to{" "}
								<span className="font-medium">
									{filteredVolunteers?.length}
								</span>{" "}
								of{" "}
								<span className="font-medium">
									{filteredVolunteers?.length}
								</span>{" "}
								volunteers
							</div>
							<div className="flex space-x-1">
								<button className="px-3 py-1 border border-gray-300 rounded-md flex items-center">
									<ChevronLeft size={16} />
								</button>
								<button className="px-3 py-1 border border-gray-300 bg-orange-500 text-white rounded-md">
									1
								</button>
								<button className="px-3 py-1 border border-gray-300 rounded-md flex items-center">
									<ChevronRight size={16} />
								</button>
							</div>
						</div>
					</div>
				</main>

				{selectedVolunteer && (
					<VolunteerDetailModal
						volunteer={selectedVolunteer}
						onClose={() => setSelectedVolunteer(null)}
					/>
				)}
			</div>
		</div>
	);
};

export default Volunteers;
