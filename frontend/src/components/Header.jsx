import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			<nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
				<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-20 w-full">
						<div className="flex-shrink-0 flex items-center">
							<Link
								to="/"
								className="text-2xl sm:text-3xl font-medium text-blue-800 font-sans"
							>
								MINDEASE
							</Link>
						</div>

						{/* Desktop menu */}
						<div className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-3">
							<NavLink
								to="/how-it-works"
								className="text-black hover:text-orange-600 px-2 xl:px-3 py-2 font-normal text-sm xl:text-base"
							>
								How It Works
							</NavLink>
							<NavLink
								to="/pricing"
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
								to="/Blogs"
								className="text-black hover:text-orange-600 px-2 xl:px-3 py-2 font-normal text-sm xl:text-base"
							>
								Blogs
							</NavLink>
							<NavLink
								to="/register"
								className="text-white bg-orange-500 hover:bg-orange-600 px-4 xl:px-7 py-2 xl:py-3 rounded-full font-normal text-sm xl:text-base transition duration-300"
							>
								Sign Up
							</NavLink>
							<NavLink
								to="/login"
								className="text-orange-500 hover:text-orange-600 bg-white border-2 border-orange-500 px-5 xl:px-8 py-2 xl:py-3 rounded-full font-normal text-sm xl:text-base transition duration-300"
							>
								Login
							</NavLink>
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
							to="/pricing"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Plans & Pricing
						</NavLink>
						<NavLink
							to="/counselors"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Our Counselors
						</NavLink>
						<NavLink
							to="/wellness-hub"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Wellness Hub
						</NavLink>
						<NavLink
							to="/corporates"
							className="block text-black hover:text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-lg text-base sm:text-lg transition duration-300 transform hover:translate-x-2"
							onClick={toggleSidebar}
						>
							Corporates
						</NavLink>
						<div className="pt-6 space-y-3">
							<NavLink
								to="/signup"
								className="block w-full text-center text-white bg-orange-500 hover:bg-orange-600 py-3 rounded-full text-base sm:text-lg transition duration-300 transform hover:scale-105"
								onClick={toggleSidebar}
							>
								Sign Up
							</NavLink>
							<NavLink
								to="/login"
								className="block w-full text-center text-orange-500 hover:text-orange-600 border-2 border-orange-500 py-3 rounded-full text-base sm:text-lg transition duration-300 transform hover:scale-105"
								onClick={toggleSidebar}
							>
								Login
							</NavLink>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
