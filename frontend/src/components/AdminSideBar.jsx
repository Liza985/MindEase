import {
	BarChart,
	FileText,
	MessageSquare,
	Settings,
	Users,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
	const navigate = useNavigate();
	const links = [
		{ name: "Dashboard", icon: <BarChart size={20} />, path: "/admin" },
		{ name: "Users", icon: <Users size={20} />, path: "/admin/users" },
		{
			name: "Volunteers",
			icon: <Users size={20} />,
			path: "/admin/volunteers",
		},
		{ name: "Chats", icon: <MessageSquare size={20} />, path: "/admin/chats" },
		{ name: "Content", icon: <FileText size={20} />, path: "/admin/content" },
		{ name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
	];

	return (
		<div className="fixed top-0 left-0 w-64 bg-orange-600 text-white h-screen flex flex-col overflow-y-auto z-10">
			<div className="p-4 border-b border-orange-500">
				<h1 className="text-xl font-bold">Admin Panel</h1>
			</div>

			<div className="p-4 border-b border-orange-500">
				<div className="flex items-center space-x-3">
					<div className="bg-orange-300 w-10 h-10 rounded-full flex items-center justify-center text-orange-800 font-bold">
						A
					</div>
					<div>
						<h3 className="font-medium">Admin User</h3>
						<p className="text-sm text-orange-200">Administrator</p>
					</div>
				</div>
			</div>

			<nav className="flex-grow py-4">
				<ul className="space-y-1">
					{links.map((link) => (
						<li key={link.name}>
							<Link
								to={link.path}
								className="flex items-center space-x-3 px-4 py-3 hover:bg-orange-700 transition"
							>
								{link.icon}
								<span>{link.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className="p-4 border-t border-orange-500">
				<button
					onClick={() => navigate("/")}
					className="flex items-center space-x-3 text-orange-200 hover:text-white transition w-full"
				>
					<span>Sign Out</span>
				</button>
			</div>
		</div>
	);
};

export default AdminSidebar;
