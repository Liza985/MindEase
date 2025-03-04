import {
	faFacebookF,
	faGooglePlusG,
	faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import {
	faCalendar,
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
	faPhone,
	faUser,
	faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../constants/toast";
import { loginUser, registerUser } from "../redux/Actions/userAction";

const Auth = () => {
	const [isRightPanelActive, setIsRightPanelActive] = useState(false);
	const [showRegisterPassword, setShowRegisterPassword] = useState(false);
	const [showLoginPassword, setShowLoginPassword] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, message, error, id, isAuthenticated } = useSelector(
		(state) => state.user
	);

	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const [registerForm, setRegisterForm] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		password: "",
		dateOfBirth: "",
		gender: "",
		phoneNumber: "",
	});

	useEffect(() => {
		// Check if the current path is /register
		if (location.pathname === "/register") {
			setIsRightPanelActive(true);
		} else {
			setIsRightPanelActive(false);
		}
	}, [location]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	useEffect(() => {
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			if (message.includes("Login Successful")) {
				navigate("/");
			} else if (id?._id) {
				navigate(`/verify/${id._id}`);
			}
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [message, error, dispatch, navigate, id]);

	const handleRegisterClick = () => {
		setIsRightPanelActive(true);
		navigate("/register");
	};

	const handleSignInClick = () => {
		setIsRightPanelActive(false);
		navigate("/login");
	};

	const toggleRegisterPassword = () => {
		setShowRegisterPassword(!showRegisterPassword);
	};

	const toggleLoginPassword = () => {
		setShowLoginPassword(!showLoginPassword);
	};

	const handleRegisterChange = (e) => {
		setRegisterForm({
			...registerForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleLoginChange = (e) => {
		setLoginForm({
			...loginForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		// Dispatch register action
		console.log("working1");
		dispatch(registerUser(registerForm));
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		// Dispatch login action
		dispatch(loginUser(loginForm));
	};

	const handleForgotPassword = () => {
		navigate("/forgot-password");
	};

	return (
		<div className="flex justify-center items-center min-h-screen px-4">
			{/* Navigation Buttons - Now fixed at the top */}
			<div className="md:hidden fixed top-20 left-0 right-0 flex justify-center z-[100] px-4">
				<div className="bg-white rounded-full shadow-lg p-1 flex gap-2">
					<button
						onClick={handleSignInClick}
						className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
							!isRightPanelActive ? "bg-[#FF4B2B] text-white" : "text-gray-500"
						}`}
					>
						Sign In
					</button>
					<button
						onClick={handleRegisterClick}
						className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
							isRightPanelActive ? "bg-[#FF4B2B] text-white" : "text-gray-500"
						}`}
					>
						Register
					</button>
				</div>
			</div>

			<div
				className={`relative bg-white rounded-xl shadow-2xl overflow-y-auto overflow-x-hidden w-full max-w-[1024px] min-h-[600px] max-h-[90vh] md:max-h-none mt-16 md:mt-0 ${
					isRightPanelActive ? "right-panel-active" : ""
				}`}
				id="container"
			>
				{/* Register Form */}
				<div
					className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-600 ease-in-out overflow-y-auto ${
						isRightPanelActive
							? "md:translate-x-full opacity-100 z-50"
							: "opacity-0 z-10"
					}`}
				>
					<form
						onSubmit={handleRegisterSubmit}
						className="bg-white flex flex-col items-center justify-center min-h-full px-4 md:px-12 text-center py-8"
					>
						<h1 className="font-bold text-xl md:text-2xl mb-4">
							Create Account
						</h1>
						<div className="flex space-x-4 mb-6">
							<a
								href="#"
								className="border border-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faFacebookF}
									className="text-sm md:text-base"
								/>
							</a>
							<a
								href="#"
								className="border border-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faGooglePlusG}
									className="text-sm md:text-base"
								/>
							</a>
							<a
								href="#"
								className="border border-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faLinkedinIn}
									className="text-sm md:text-base"
								/>
							</a>
						</div>
						<span className="text-xs mb-4">
							or use your email for registration
						</span>
						<div className="flex flex-col md:flex-row gap-4 w-full mb-4">
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faUser}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="text"
									name="firstName"
									value={registerForm.firstName}
									onChange={handleRegisterChange}
									placeholder="First Name"
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
								/>
							</div>
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faUser}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="text"
									name="middleName"
									value={registerForm.middleName}
									onChange={handleRegisterChange}
									placeholder="Middle Name"
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
								/>
							</div>
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faUser}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="text"
									name="lastName"
									value={registerForm.lastName}
									onChange={handleRegisterChange}
									placeholder="Last Name"
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
								/>
							</div>
						</div>
						<div className="flex flex-col md:flex-row gap-4 w-full mb-4">
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="email"
									name="email"
									value={registerForm.email}
									onChange={handleRegisterChange}
									placeholder="Email"
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
								/>
							</div>
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faLock}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type={showRegisterPassword ? "text" : "password"}
									name="password"
									value={registerForm.password}
									onChange={handleRegisterChange}
									placeholder="Password"
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
								/>
								<button
									type="button"
									onClick={toggleRegisterPassword}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
								>
									<FontAwesomeIcon
										icon={showRegisterPassword ? faEyeSlash : faEye}
									/>
								</button>
							</div>
						</div>
						<div className="flex flex-col md:flex-row gap-4 w-full mb-4">
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faCalendar}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="date"
									name="dateOfBirth"
									value={registerForm.dateOfBirth}
									onChange={handleRegisterChange}
									placeholder="Date of Birth"
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
								/>
							</div>
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faVenusMars}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<select
									name="gender"
									value={registerForm.gender}
									onChange={handleRegisterChange}
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
									defaultValue=""
								>
									<option value="" disabled>
										Select Gender
									</option>
									<option value="male">♂ Male</option>
									<option value="female">♀ Female</option>
									<option value="other">⚥ Other</option>
								</select>
							</div>
							<div className="relative w-full">
								<FontAwesomeIcon
									icon={faPhone}
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
								/>
								<input
									type="tel"
									name="phoneNumber"
									value={registerForm.phoneNumber}
									onChange={handleRegisterChange}
									placeholder="Phone Number"
									className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="bg-orange-500 text-white text-xs font-bold py-3 px-8 md:px-12 rounded-2xl border border-orange-500 uppercase tracking-wider mb-4"
						>
							Register
						</button>
					</form>
				</div>

				{/* Sign In Form */}
				<div
					className={`absolute top-0 left-0 h-full w-full md:w-1/2 transition-all duration-600 ease-in-out z-20 overflow-y-auto ${
						isRightPanelActive ? "md:translate-x-full" : ""
					}`}
				>
					<form
						onSubmit={handleLoginSubmit}
						className="bg-white flex flex-col items-center justify-center min-h-full px-4 md:px-12 text-center py-8"
					>
						<h1 className="font-bold text-xl md:text-2xl mb-4">Sign in</h1>
						<div className="flex space-x-4 mb-6">
							<a
								href="#"
								className="border border-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faFacebookF}
									className="text-sm md:text-base"
								/>
							</a>
							<a
								href="#"
								className="border border-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faGooglePlusG}
									className="text-sm md:text-base"
								/>
							</a>
							<a
								href="#"
								className="border border-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
							>
								<FontAwesomeIcon
									icon={faLinkedinIn}
									className="text-sm md:text-base"
								/>
							</a>
						</div>
						<span className="text-xs mb-4">or use your account</span>
						<div className="relative w-full mb-4">
							<FontAwesomeIcon
								icon={faEnvelope}
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={loginForm.email}
								onChange={handleLoginChange}
								className="bg-gray-100 border-none p-3 pl-10 w-full"
							/>
						</div>
						<div className="relative w-full mb-4">
							<FontAwesomeIcon
								icon={faLock}
								className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							/>
							<input
								type={showLoginPassword ? "text" : "password"}
								name="password"
								placeholder="Password"
								value={loginForm.password}
								onChange={handleLoginChange}
								className="bg-gray-100 border-none p-3 pl-10 w-full"
							/>
							<button
								type="button"
								onClick={toggleLoginPassword}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
							>
								<FontAwesomeIcon
									icon={showLoginPassword ? faEyeSlash : faEye}
								/>
							</button>
						</div>
						<div className="text-sm mb-4">
							<button
								type="button"
								onClick={handleForgotPassword}
								className="text-orange-00 hover:text-orange-600 cursor-pointer"
							>
								Forgot Password?
							</button>
						</div>
						<button
							type="submit"
							className="bg-orange-500 text-white text-xs font-bold py-3 px-8 md:px-12 rounded-2xl border border-orange-500 uppercase tracking-wider mb-4 cursor-pointer"
						>
							Sign In
						</button>
					</form>
				</div>

				{/* Overlay Container */}
				<div
					className={`absolute top-0 left-0 md:left-1/2 w-full md:w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out ${
						isRightPanelActive ? "md:-translate-x-full" : ""
					} hidden md:block`}
				>
					<div
						className={`relative -left-full h-full w-[200%] bg-gradient-to-r from-orange-500 to-orange-600 text-white transition-transform duration-600 ease-in-out ${
							isRightPanelActive ? "translate-x-1/2" : ""
						}`}
					>
						{/* Overlay Left Panel */}
						<div
							// className={`relative -left-full h-full w-[200%] bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white transition-transform duration-600 ease-in-out ${
							className={`absolute top-0 h-full w-1/2 flex flex-col items-center justify-center px-4 md:px-12 text-center transition-transform duration-600 ease-in-out ${
								isRightPanelActive ? "translate-x-0" : "-translate-x-20"
							}`}
						>
							<h1 className="font-bold text-xl md:text-2xl mb-4">
								Welcome Back!
							</h1>
							<p className="text-xs md:text-sm mb-6">
								To keep connected with us please login with your personal info
							</p>
							<button
								onClick={handleSignInClick}
								className="bg-transparent border border-white text-white text-xs font-bold py-3 px-8 md:px-12 rounded-2xl uppercase tracking-wider"
							>
								Sign In
							</button>
						</div>

						{/* Overlay Right Panel */}
						<div
							className={`absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center px-4 md:px-12 text-center transition-transform duration-600 ease-in-out ${
								isRightPanelActive ? "translate-x-20" : "translate-x-0"
							}`}
						>
							<h1 className="font-bold text-xl md:text-2xl mb-4">
								Hello, Friend!
							</h1>
							<p className="text-xs md:text-sm mb-6">
								Enter your personal details and start your journey with us
							</p>
							<button
								onClick={handleRegisterClick}
								className="bg-transparent border border-white text-white text-xs font-bold py-3 px-8 md:px-12 rounded-2xl uppercase tracking-wider"
							>
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
