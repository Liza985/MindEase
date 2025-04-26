import {
	BotIcon,
	Clock,
	FileText,
	Home,
	LogOut,
	MessageSquare,
	User,
  } from "lucide-react";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link, useNavigate } from "react-router-dom";
  import { getVolunteerProfile, volunteerLogout } from "../redux/Actions/volunteerAction";
  
  export const VolHeader = ({ title }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		dispatch(getVolunteerProfile());
	}, [dispatch]);
  
	const links = [
	  {
		name: "Dashboard",
		icon: <Home size={18} />,
		path: "/volunteer/Dashboard",
	  },
	  {
		name: "Requests",
		icon: <Clock size={18} />,
		path: "/volunteer/requests",
	  },
	  {
		name: "Chats",
		icon: <MessageSquare size={18} />,
		path: "/volunteer/chat",
	  },
	  { name: "Blogs", icon: <FileText size={18} />, path: "/volunteer/article" },
	];
  
	const { volunteer } = useSelector((state) => state.volunteer);
  
	// Close dropdown when clicking outside
	useEffect(() => {
	  const handleClickOutside = (event) => {
		if (!event.target.closest(".user-menu")) {
		  setIsDropdownOpen(false);
		}
	  };
  
	  document.addEventListener("mousedown", handleClickOutside);
	  return () => {
		document.removeEventListener("mousedown", handleClickOutside);
	  };
	}, []);
  
	const handleLogout = () => {
	  dispatch(volunteerLogout());
	  dispatch({ type: "CLEAR_MESSAGE" });
	  navigate("/connect");
	};
  
	return (
	  <header className="bg-white shadow-sm border-b border-gray-200 p-4">
		<div className="flex justify-between items-center">
		  <div className="flex items-center space-x-4">
			<Link to="/">
			  <div className="flex items-center space-x-2">
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
		  </div>
  
		  <div className="flex items-center space-x-6">
			{/* Navigation Links */}
			<nav className="hidden md:flex items-center space-x-4">
			  {links.map((link) => (
				<Link
				  key={link.name}
				  to={link.path}
				  className="flex items-center space-x-1 text-gray-800 hover:text-orange-500 transition"
				>
				  {link.icon}
				  <span>{link.name}</span>
				</Link>
			  ))}
			</nav>
  
			{/* AI Assistant Button */}
			<button
			  onClick={() => navigate("/volunteer/ai")}
			  className="text-gray-800 hover:text-orange-500 transition relative"
			  aria-label="AI Assistant"
			>
			  <BotIcon size={28} />
			</button>
  
			{/* User Profile with Dropdown */}
			<div className="relative user-menu">
			  <button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className="flex items-center space-x-2 hover:text-orange-500 transition"
				aria-label="User menu"
				aria-expanded={isDropdownOpen}
				aria-haspopup="true"
			  >
				<div className="bg-orange-300 w-8 h-8 rounded-full flex items-center justify-center text-orange-800 font-bold text-sm">
				  {volunteer?.firstName && volunteer?.lastName
					? `${volunteer.firstName.charAt(0)}${volunteer.lastName.charAt(0)}`
					: "V"}
				</div>
				<div className="hidden md:block">
				  <h3 className="text-sm font-medium">{volunteer?.firstName || "Volunteer"}</h3>
				  <p className="text-xs text-gray-500">Volunteer</p>
				</div>
			  </button>
  
			  {/* Dropdown Menu */}
			  {isDropdownOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
				  <Link
					to="/volunteer/reviews"
					className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
				  >
					<MessageSquare className="h-4 w-4 mr-2" />
					My Reviews
				  </Link>
				  <Link
					to="/volunteer/profile"
					className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
				  >
					<User className="h-4 w-4 mr-2" />
					My Profile
				  </Link>
				  <button
					onClick={handleLogout}
					className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
				  >
					<LogOut className="h-4 w-4 mr-2" />
					Logout
				  </button>
				</div>
			  )}
			</div>
  
			{/* Mobile Menu Button */}
			<button
			  className="md:hidden"
			  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			  aria-label="Toggle mobile menu"
			  aria-expanded={isSidebarOpen}
			>
			  <svg
				className="w-6 h-6 text-gray-600"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				viewBox="0 0 24 24"
				stroke="currentColor"
			  >
				{isSidebarOpen ? (
				  <path d="M6 18L18 6M6 6l12 12" />
				) : (
				  <path d="M4 6h16M4 12h16M4 18h16" />
				)}
			  </svg>
			</button>
		  </div>
		</div>
  
		{/* Mobile Sidebar */}
		{isSidebarOpen && (
		  <div className="md:hidden mt-4 pb-4">
			<div className="flex flex-col space-y-4">
			  {links.map((link) => (
				<Link
				  key={link.name}
				  to={link.path}
				  className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
				  onClick={() => setIsSidebarOpen(false)}
				>
				  {link.icon}
				  <span>{link.name}</span>
				</Link>
			  ))}
			  <Link
				to="/volunteer/reviews"
				className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
				onClick={() => setIsSidebarOpen(false)}
			  >
				<MessageSquare size={18} />
				<span>My Reviews</span>
			  </Link>
			  <Link
				to="/volunteer/profile"
				className="flex items-center space-x-2 text-gray-600 hover:text-orange-500"
				onClick={() => setIsSidebarOpen(false)}
			  >
				<User size={18} />
				<span>My Profile</span>
			  </Link>
			  <button
				onClick={() => {
				  handleLogout();
				  setIsSidebarOpen(false);
				}}
				className="flex items-center space-x-2 text-red-500 hover:text-red-600"
			  >
				<LogOut size={18} />
				<span>Logout</span>
			  </button>
			</div>
		  </div>
		)}
	  </header>
	);
  };
  
  export default VolHeader;