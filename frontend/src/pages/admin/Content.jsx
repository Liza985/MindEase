import React, { useEffect, useState } from "react";
import {
	Search,
	Filter,
	PlusCircle,
	Edit,
	Trash2,
	Eye,
	ArrowUpDown,
	Download,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllContent,
	deleteContent,
} from "../../redux/Actions/activityAction";
import AdminSidebar from "../../components/AdminSideBar";
import UploadModal from "../../components/AdminUploadModal";
import ContentViewModal from "../../components/ContentViewModal";

const Content = () => {
	// Mock content data
	const dispatch = useDispatch();
	const { loading, error, contentItems } = useSelector(
		(state) => state.content
	);

	// Fetch content from backend
	useEffect(() => {
		dispatch(getAllContent());
	}, [dispatch]);

	// Filter states
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [sortField, setSortField] = useState("updatedAt");
	const [sortDirection, setSortDirection] = useState("desc");
	const [showUploadModal, setShowUploadModal] = useState(false);
	const [uploadType, setUploadType] = useState("");
	const [viewItem, setViewItem] = useState(null);

	// Extract unique content types, categories for filters
	const contentTypes = [
		"All",
		...new Set(contentItems?.map((item) => item.contentType)),
	];
	const contentCategories = [
		"All",
		...new Set(contentItems?.map((item) => item.category)),
	];

	// Sorting function
	const handleSort = (field) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	// Delete handler
	const handleDelete = (id) => {
		dispatch(deleteContent(id)).then(() => {
			dispatch(getAllContent()); // Re-fetch content after deletion
		});
	};

	// Filter and sort content
	const filteredContent = contentItems
		?.filter(
			(item) =>
				(typeFilter === "All" || item.contentType === typeFilter) &&
				(statusFilter === "All" || item.status === statusFilter) &&
				(categoryFilter === "All" || item.category === categoryFilter) &&
				(item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
					item.author.toLowerCase().includes(searchTerm.toLowerCase()))
		)
		.sort((a, b) => {
			let compareA, compareB;

			if (sortField === "title") {
				compareA = a.title;
				compareB = b.title;
			} else if (sortField === "contentType") {
				compareA = a.contentType;
				compareB = b.contentType;
			} else if (sortField === "category") {
				compareA = a.category;
				compareB = b.category;
			} else if (sortField === "status") {
				compareA = a.status;
				compareB = b.status;
			} else if (sortField === "views") {
				compareA = a.views;
				compareB = b.views;
			} else if (sortField === "createdAt") {
				compareA = new Date(a.createdAt);
				compareB = new Date(b.createdAt);
			} else {
				compareA = new Date(a.updatedAt);
				compareB = new Date(b.updatedAt);
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
		});
	};

	return (
		<div className="flex min-h-screen bg-gray-100">
			<AdminSidebar />

			<div className="ml-64 flex-grow p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-800">
						Content Management
					</h1>
					<div className="flex gap-3">
						<button
							onClick={() => setShowUploadModal(true)}
							className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center gap-2"
						>
							<PlusCircle size={16} />
							New Content
						</button>
						<button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2">
							<Download size={16} />
							Export
						</button>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md">
					<div className="p-4 border-b border-gray-200">
						<div className="flex flex-col md:flex-row gap-4 justify-between">
							<div className="relative flex-grow max-w-md">
								<input
									type="text"
									placeholder="Search content..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<Search
									className="absolute left-3 top-2.5 text-gray-400"
									size={18}
								/>
							</div>

							<div className="flex flex-wrap gap-2">
								<div className="flex items-center">
									<Filter size={18} className="text-gray-500 mr-2" />
									<select
										className="border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
										value={typeFilter}
										onChange={(e) => setTypeFilter(e.target.value)}
									>
										{contentTypes?.map((type) => (
											<option key={type} value={type}>
												{type === "All" ? "All Types" : type}
											</option>
										))}
									</select>
								</div>

								<select
									className="border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
									value={categoryFilter}
									onChange={(e) => setCategoryFilter(e.target.value)}
								>
									{contentCategories.map((category) => (
										<option key={category} value={category}>
											{category === "All" ? "All Categories" : category}
										</option>
									))}
								</select>

								<select
									className="border border-gray-300 rounded-md py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
								>
									<option value="All">All Status</option>
									<option value="Published">Published</option>
									<option value="Draft">Draft</option>
									<option value="Under Review">Under Review</option>
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
											onClick={() => handleSort("title")}
										>
											<span>Title</span>
											{sortField === "title" && (
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
											onClick={() => handleSort("type")}
										>
											<span>Type</span>
											{sortField === "type" && (
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
											onClick={() => handleSort("category")}
										>
											<span>Category</span>
											{sortField === "category" && (
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
											onClick={() => handleSort("views")}
										>
											<span>Views</span>
											{sortField === "views" && (
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
											<span>Last Updated</span>
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
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredContent?.map((item) => (
									<tr key={item.id} className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-center">
												<div>
													<div className="text-sm font-medium text-gray-900">
														{item.title}
													</div>
													<div className="text-xs text-gray-500">
														• Author: {item.author}
													</div>
												</div>
												{item.featured && (
													<span className="ml-2 px-2 py-1 text-xs font-medium leading-4 bg-orange-100 text-orange-800 rounded-full">
														Featured
													</span>
												)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
												{item.contentType}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{item.category}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
													item.status === "Published"
														? "bg-green-100 text-green-800"
														: item.status === "Draft"
														? "bg-gray-100 text-gray-800"
														: "bg-yellow-100 text-yellow-800"
												}`}
											>
												{item.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{item.views.toLocaleString()}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{formatDate(item.updatedAt)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex space-x-2 justify-end">
												<button
													className="text-blue-600 hover:text-blue-800"
													title="View"
													onClick={() => setViewItem(item)}
												>
													<Eye size={18} />
												</button>

												<button
													className="text-red-600 hover:text-red-800"
													title="Delete"
													onClick={() => handleDelete(item._id)}
												>
													<Trash2 size={18} />
												</button>
											</div>
										</td>
									</tr>
								))}
								{filteredContent?.length === 0 && (
									<tr>
										<td
											colSpan="7"
											className="px-6 py-4 text-center text-gray-500"
										>
											No content found matching your filters
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					<div className="p-4 border-t border-gray-200 flex justify-between items-center">
						<div className="text-sm text-gray-700">
							Showing{" "}
							<span className="font-medium">{filteredContent?.length}</span> of{" "}
							<span className="font-medium">{contentItems?.length}</span> items
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
			{showUploadModal && (
				<UploadModal
					onClose={() => setShowUploadModal(false)}
					setUploadType={setUploadType}
					uploadType={uploadType}
				/>
			)}

			{viewItem && (
				<ContentViewModal item={viewItem} onClose={() => setViewItem(null)} />
			)}
		</div>
	);
};

export default Content;
