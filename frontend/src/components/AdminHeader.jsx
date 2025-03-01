import { Search } from "lucide-react";
import React from "react";

const AdminHeader = ({ title }) => {
	return (
		<header className="bg-white shadow-sm border-b border-gray-200 p-4">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold text-gray-800">{title}</h1>
				<div className="flex items-center space-x-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Search..."
							className="border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
						/>
						<Search size={18} className="absolute left-3 top-3 text-gray-400" />
					</div>
				</div>
			</div>
		</header>
	);
};
export default AdminHeader;
