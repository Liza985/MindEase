import { NavLink, Link } from "react-router-dom";


const Header = () => {
	return (
		<>
			<nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
				<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-20 w-full">
						<div className="flex-shrink-0 flex items-center">
							<Link
								to="/"
								className="text-3xl font-medium text-blue-800 font-sans"
							>
								M I N D E A S E
							</Link>
						</div>

						{/* Desktop menu */}
						<div className="hidden md:flex md:items-center md:space-x-3">
							<NavLink
								to="/how-it-works"
								className="text-black hover:text-orange-600 px-3 py-2 font-normal"
							>
								How It Works
							</NavLink>
							<NavLink
								to="/pricing"
								className="text-black hover:text-orange-600 px-3 py-2 font-normal"
							>
								Plans & Pricing
							</NavLink>
							<NavLink
								to="/counselors"
								className="text-black hover:text-orange-600 px-3 py-2 font-normal"
							>
								Our Counselors
							</NavLink>
							<NavLink
								to="/wellness-hub"
								className="text-black hover:text-orange-600 px-3 py-2 font-normal"
							>
								Wellness Hub
							</NavLink>
							<NavLink
								to="/corporates"
								className="text-black hover:text-orange-600 px-3 py-2 font-normal"
							>
								Corporates
							</NavLink>
							<NavLink
								to="/signup"
								className="text-white bg-orange-500 hover:bg-orange-600 px-7 py-3 rounded-full font-normal"
							>
								Sign Up
							</NavLink>
							<NavLink
								to="/login"
								className="text-orange-500 hover:text-orange-600 bg-white border-2 border-orange-500 px-8 py-3 rounded-full font-normal"
							>
								Login
							</NavLink>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden flex items-center">
							<button className="mobile-menu-button p-2 rounded-md text-black hover:text-blue-600 hover:bg-gray-100 focus:outline-none">
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				<div className="md:hidden hidden mobile-menu">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<NavLink
							to="/how-it-works"
							className="block text-black hover:text-blue-600 px-3 py-2"
						>
							How It Works
						</NavLink>
						<NavLink
							to="/pricing"
							className="block text-black hover:text-blue-600 px-3 py-2"
						>
							Plans & Pricing
						</NavLink>
						<NavLink
							to="/counselors"
							className="block text-black hover:text-blue-600 px-3 py-2"
						>
							Our Counselors
						</NavLink>
						<NavLink
							to="/wellness-hub"
							className="block text-black hover:text-blue-600 px-3 py-2"
						>
							Wellness Hub
						</NavLink>
						<NavLink
							to="/corporates"
							className="block text-black hover:text-blue-600 px-3 py-2"
						>
							Corporates
						</NavLink>
						<NavLink
							to="/signup"
							className="block text-black hover:text-blue-600 px-3 py-2"
						>
							Sign Up
						</NavLink>
						<NavLink
							to="/login"
							className="block text-black hover:text-blue-600 px-3 py-2"
						>
							Login
						</NavLink>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
