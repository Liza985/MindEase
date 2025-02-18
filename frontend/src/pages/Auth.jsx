import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebookF,
	faGooglePlusG,
	faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import { faUser, faEnvelope, faLock, faCalendar, faVenusMars, faPhone, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
	const [isRightPanelActive, setIsRightPanelActive] = useState(false);
	const [showSignupPassword, setShowSignupPassword] = useState(false);
	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const location = useLocation();

	useEffect(() => {
		// Check if the current path is /signup
		if (location.pathname === "/signup") {
			setIsRightPanelActive(true);
		} else {
			setIsRightPanelActive(false);
		}
	}, [location]);

	const handleSignUpClick = () => {
		setIsRightPanelActive(true);
	};

	const handleSignInClick = () => {
		setIsRightPanelActive(false);
	};
	
	const toggleSignupPassword = () => {
		setShowSignupPassword(!showSignupPassword);
	};

	const toggleLoginPassword = () => {
		setShowLoginPassword(!showLoginPassword);
	};

	return (
		<Layout>
			<div className="flex justify-center items-center overflow-hidden min-h-screen py-10">
				<div
					className={`relative bg-white rounded-xl shadow-2xl overflow-hidden w-[1024px] max-w-full min-h-[600px] ${
						isRightPanelActive ? "right-panel-active" : ""
					}`}
					id="container"
				>
					{/* Sign Up Form */}
					<div
						className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 ease-in-out ${
							isRightPanelActive
								? "translate-x-full opacity-100 z-50"
								: "opacity-0 z-10"
						}`}
					>
						<form className="bg-white flex flex-col items-center justify-center h-full px-12 text-center py-8">
							<h1 className="font-bold text-2xl mb-4">Create Account</h1>
							<div className="flex space-x-4 mb-6">
								<a
									href="#"
									className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
								>
									<FontAwesomeIcon icon={faFacebookF} />
								</a>
								<a
									href="#"
									className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
								>
									<FontAwesomeIcon icon={faGooglePlusG} />
								</a>
								<a
									href="#"
									className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
								>
									<FontAwesomeIcon icon={faLinkedinIn} />
								</a>
							</div>
							<span className="text-xs mb-4">
								or use your email for registration
							</span>
							<div className="flex gap-4 w-full mb-4">
								<div className="relative w-full">
									<FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										placeholder="First Name"
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									/>
								</div>
								<div className="relative w-full">
									<FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										placeholder="Middle Name"
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									/>
								</div>
								<div className="relative w-full">
									<FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type="text"
										placeholder="Last Name" 
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									/>
								</div>
							</div>
							<div className="flex gap-4 w-full mb-4">
								<div className="relative w-full">
									<FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type="email"
										placeholder="Email"
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									/>
								</div>
								<div className="relative w-full">
									<FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type={showSignupPassword ? "text" : "password"}
										placeholder="Password"
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									/>
									<button 
										type="button"
										onClick={toggleSignupPassword}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
									>
										<FontAwesomeIcon icon={showSignupPassword ? faEyeSlash : faEye} />
									</button>
								</div>
							</div>
							<div className="flex gap-4 w-full mb-4">
								<div className="relative w-full">
									<FontAwesomeIcon icon={faCalendar} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type="date"
										placeholder="Date of Birth"
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									/>
								</div>
								<div className="relative w-full">
									<FontAwesomeIcon icon={faVenusMars} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<select
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									>
										<option value="">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div className="relative w-full">
									<FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
									<input
										type="tel"
										placeholder="Phone Number"
										className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									/>
								</div>
							</div>
							<button className="bg-[#FF4B2B] text-white text-xs font-bold py-3 px-12 rounded-2xl border border-[#FF4B2B] uppercase tracking-wider">
								Sign Up
							</button>
						</form>
					</div>

					{/* Sign In Form */}
					<div
						className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-600 ease-in-out z-20 ${
							isRightPanelActive ? "translate-x-full" : ""
						}`}
					>
						<form className="bg-white flex flex-col items-center justify-center h-full px-12 text-center">
							<h1 className="font-bold text-2xl mb-4">Sign in</h1>
							<div className="flex space-x-4 mb-6">
								<a
									href="#"
									className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
								>
									<FontAwesomeIcon icon={faFacebookF} />
								</a>
								<a
									href="#"
									className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
								>
									<FontAwesomeIcon icon={faGooglePlusG} />
								</a>
								<a
									href="#"
									className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center"
								>
									<FontAwesomeIcon icon={faLinkedinIn} />
								</a>
							</div>
							<span className="text-xs mb-4">or use your account</span>
							<div className="relative w-full mb-4">
								<FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									type="email"
									placeholder="Email"
									className="bg-gray-100 border-none p-3 pl-10 w-full"
								/>
							</div>
							<div className="relative w-full mb-4">
								<FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									type={showLoginPassword ? "text" : "password"}
									placeholder="Password"
									className="bg-gray-100 border-none p-3 pl-10 w-full"
								/>
								<button 
									type="button"
									onClick={toggleLoginPassword}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
								>
									<FontAwesomeIcon icon={showLoginPassword ? faEyeSlash : faEye} />
								</button>
							</div>
							<a href="#" className="text-xs text-gray-600 mb-6">
								Forgot your password?
							</a>
							<button className="bg-[#FF4B2B] text-white text-xs font-bold py-3 px-12 rounded-2xl border border-[#FF4B2B] uppercase tracking-wider">
								Sign In
							</button>
						</form>
					</div>

					{/* Overlay Container */}
					<div
						className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out ${
							isRightPanelActive ? "-translate-x-full" : ""
						}`}
					>
						<div
							className={`relative -left-full h-full w-[200%] bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white transition-transform duration-600 ease-in-out ${
								isRightPanelActive ? "translate-x-1/2" : ""
							}`}
						>
							{/* Overlay Left Panel */}
							<div
								className={`absolute top-0 h-full w-1/2 flex flex-col items-center justify-center px-12 text-center transition-transform duration-600 ease-in-out ${
									isRightPanelActive ? "translate-x-0" : "-translate-x-20"
								}`}
							>
								<h1 className="font-bold text-2xl mb-4">Welcome Back!</h1>
								<p className="text-sm mb-6">
									To keep connected with us please login with your personal info
								</p>
								<button
									onClick={handleSignInClick}
									className="bg-transparent border border-white text-white text-xs font-bold py-3 px-12 rounded-2xl uppercase tracking-wider"
								>
									Sign In
								</button>
							</div>

							{/* Overlay Right Panel */}
							<div
								className={`absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center px-12 text-center transition-transform duration-600 ease-in-out ${
									isRightPanelActive ? "translate-x-20" : "translate-x-0"
								}`}
							>
								<h1 className="font-bold text-2xl mb-4">Hello, Friend!</h1>
								<p className="text-sm mb-6">
									Enter your personal details and start your journey with us
								</p>
								<button
									onClick={handleSignUpClick}
									className="bg-transparent border border-white text-white text-xs font-bold py-3 px-12 rounded-2xl uppercase tracking-wider"
								>
									Sign Up
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Auth;
