import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, User } from "lucide-react";
import { logoutUser } from "../redux/Actions/userAction";
import { toast } from "react-toastify";
import toastOptions from "../constants/toast";

const Header = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isAuthenticated, message, id } = useSelector((state) => state.user);
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};
	useEffect(() => {
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			navigate("/login");
		}
	}, [message]);

	return (
		<>
			<nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
				<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-20 w-full">
						<Link to="/">
							<div className="flex items-center space-x-2 mt-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 200 200"
									width="50"
									height="50"
								>
									{/* Background circle */}
									<circle
										cx="100"
										cy="100"
										r="80"
										fill="#ffffff"
										stroke="#FFA500"
										strokeWidth="2"
									/>

									{/* Stylized brain */}
									<path
										d="M80,70 C70,60 55,60 45,65 C35,70 25,85 30,100 C35,115 50,125 65,125 
										M120,70 C130,60 145,60 155,65 C165,70 175,85 170,100 C165,115 150,125 135,125
										M65,125 C75,140 90,145 100,145 C110,145 125,140 135,125"
										fill="none"
										stroke="#FFA500"
										strokeWidth="4"
										strokeLinecap="round"
									/>

									{/* Heart symbol integrated into brain */}
									<path
										d="M95,105 C95,100 90,95 85,95 C80,95 75,100 75,105 C75,110 80,115 95,125 
										C110,115 115,110 115,105 C115,100 110,95 105,95 C100,95 95,100 95,105"
										fill="#87CEEB"
										stroke="#87CEEB"
										strokeWidth="1"
									/>
								</svg>

								{/* Text */}
								<div>
									<span className="text-2xl font-bold text-orange-500">
										Mind
									</span>
									<span className="text-2xl font-normal text-sky-400">
										Ease
									</span>
								</div>
							</div>
						</Link>
						{/* Desktop menu */}
						<div className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-3">
							<NavLink
								to="/how-it-works"
								className="text-black hover:text-orange-600 px-2 xl:px-3 py-2 font-normal text-sm xl:text-base"
							>
								How It Works
							</NavLink>
							<NavLink
								to="/plans&pricing"
								className="text-black hover:text-orange-600 px-2 xl:px-3 py-2 font-normal text-sm xl:text-base"
							>
								Plans & Pricing
							</NavLink>
							<NavLink
								to="/Counselling"
								className="text-black hover:text-orange-600 px-2 xl:px-3 py-2 font-normal text-sm xl:text-base"
							>
								Counselling
							</NavLink>
							<NavLink
								to="/wellness-hub"
								className="text-black hover:text-orange-600 px-2 xl:px-3 py-2 font-normal text-sm xl:text-base"
							>
								Wellness Hub
							</NavLink>
							<NavLink
								to="/blogs"
								className="text-black hover:text-orange-600 px-2 xl:px-3 py-2 font-normal text-sm xl:text-base"
							>
								Blogs
							</NavLink>
							{isAuthenticated ? (
								<div className="flex items-center space-x-4">
									{/* Profile Section */}
									<div className="flex items-center space-x-2">
										<div className="bg-orange-300 w-8 h-8 rounded-full flex items-center justify-center text-orange-800 font-bold text-sm">
											<User size={18} />
										</div>
										<div className="hidden md:block">
											<h3 className="text-sm font-medium">{id?.firstName}</h3>
											<p className="text-xs text-gray-500">User</p>
										</div>
									</div>

									{/* Logout Button */}
									<button
										onClick={handleLogout}
										className="text-gray-500 hover:text-orange-500 transition"
										title="Sign Out"
									>
										<LogOut size={18} />
									</button>
								</div>
							) : (
								<div className="flex items-center space-x-4">
									<NavLink
										to="/register"
										className="text-white bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full transition"
									>
										Sign Up
									</NavLink>
									<NavLink
										to="/login"
										className="text-orange-500 hover:text-orange-600 border-2 border-orange-500 px-6 py-2 rounded-full transition"
									>
										Login
									</NavLink>
								</div>
							)}
						</div>

						{/* Mobile/Tablet menu button */}
						<div className="lg:hidden flex items-center space-x-4">
							<NavLink
								to="/register"
								className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full font-normal text-sm sm:text-base transition duration-300"
							>
								Get Started
							</NavLink>
							<button
								onClick={toggleSidebar}
								className="mobile-menu-button p-2 rounded-md text-orange-500 hover:text-orange-600 hover:bg-gray-100 focus:outline-none"
							>
								<svg
									className="h-6 w-6 sm:h-8 sm:w-8 font-bold"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={3}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Right Sidebar */}
				<div
					className={`fixed top-0 right-0 h-full w-64 sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
						isSidebarOpen ? "translate-x-0" : "translate-x-full"
					} lg:hidden rounded-l-3xl`}
				>
					<div className="flex justify-end p-4 border-b">
						<button
							onClick={toggleSidebar}
							className="text-gray-500 hover:text-gray-600 transition duration-300"
						>
							<svg
								className="h-6 w-6 sm:h-8 sm:w-8"
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
					<div className="px-6 py-4 space-y-4">
						<NavLink
							to="/how-it-works"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							How It Works
						</NavLink>
						<NavLink
							to="/plans&pricing"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Plans & Pricing
						</NavLink>
						<NavLink
							to="/counselling"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Counselling
						</NavLink>
						<NavLink
							to="/wellness-hub"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Wellness Hub
						</NavLink>
						<NavLink
							to="/blogs"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Blogs
						</NavLink>
						{isAuthenticated ? (
							<div className="pt-6 space-y-3">
								<div className="flex items-center space-x-2 py-2">
									<div className="bg-orange-300 w-8 h-8 rounded-full flex items-center justify-center">
										{id?.firstName?.charAt(0)}
									</div>
									<span>{id?.firstName}</span>
								</div>
								<button
									onClick={() => {
										handleLogout();
										toggleSidebar();
									}}
									className="w-full text-left py-2 text-red-500"
								>
									Logout
								</button>
							</div>
						) : (
							<div className="pt-6 space-y-3">
								<NavLink
									to="/register"
									className="block w-full text-center text-white bg-orange-500 hover:bg-orange-600 py-3 rounded-full"
									onClick={toggleSidebar}
								>
									Sign Up
								</NavLink>
								<NavLink
									to="/login"
									className="block w-full text-center text-orange-500 hover:text-orange-600 border-2 border-orange-500 py-3 rounded-full"
									onClick={toggleSidebar}
								>
									Login
								</NavLink>
							</div>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
