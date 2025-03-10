import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	forgotUserPassword,
	resetUserPassword,
	changeUserPassword,
} from "../../redux/Actions/userAction";
import toastOptions from "../../constants/toast";

const ForgotPassword = () => {
	const [step, setStep] = useState(1);
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, message, error, id } = useSelector((state) => state.user);

	useEffect(() => {
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });

			if (message.includes("OTP sent")) {
				// Ensure it's an OTP success message
				setStep(2);
				navigate(`/forgot-password/${id}`);
			} else if (message.includes("OTP verified")) {
				setStep(3);
				navigate(`/changepassword/${id}`);
			} else if (step === 3) {
				navigate(`/login`);
			} else {
				setStep((prev) => prev + 1);
			}
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [message, error, dispatch, navigate, step, id]);


	const handleEmailSubmit = (e) => {
		e.preventDefault();
		dispatch(forgotUserPassword(email));
	};

	const handleOtpSubmit = (e) => {
		e.preventDefault();
		dispatch(resetUserPassword(id, otp));
	};

	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return toast.error("Passwords do not match", toastOptions);
		}
		dispatch(changeUserPassword(id, password));
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-8 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-6 border border-gray-300 rounded-md p-10">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Reset Your Password
					</h2>
				</div>

				{step === 1 && (
					<form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Enter your email address"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
						>
							{loading ? "Sending..." : "Send OTP"}
						</button>
					</form>
				)}

				{step === 2 && (
					<form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
						<div className="space-y-4">
							<input
								type="email"
								value={email}
								disabled
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-900 focus:outline-none sm:text-sm"
							/>
							<input
								type="text"
								required
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Enter OTP"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
						>
							{loading ? "Verifying..." : "Verify OTP"}
						</button>
					</form>
				)}

				{step === 3 && (
					<form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
						<div className="space-y-4">
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="New Password"
							/>
							<input
								type="password"
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
								placeholder="Confirm New Password"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
						>
							{loading ? "Updating..." : "Update Password"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default ForgotPassword;


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
// 	forgotUserPassword,
// 	resetUserPassword,
// 	changeUserPassword,
// } from "../redux/Actions/userAction";
// import toastOptions from "../constants/toast";

// const ForgotPassword = () => {
// 	const [step, setStep] = useState(1);
// 	const [email, setEmail] = useState("");
// 	const [otp, setOtp] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [confirmPassword, setConfirmPassword] = useState("");

// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	const { loading, message, error, id } = useSelector((state) => state.user);

// 	useEffect(() => {
// 		if (message) {
// 			toastr.success(message, toastOptions);
// 			dispatch({ type: "CLEAR_MESSAGE" });

// 			if (message.includes("OTP sent")) {
// 				setStep(2);
// 				navigate(`/forgot-password/${id}`);
// 			} else if (message.includes("OTP verified")) {
// 				setStep(3);
// 				navigate(`/changepassword/${id}`);
// 			} else if (step === 3) {
// 				navigate(`/login`);
// 			} else {
// 				setStep((prev) => prev + 1);
// 			}
// 		}
// 		if (error) {
// 			toast.error(error, toastOptions);
// 			dispatch({ type: "CLEAR_ERROR" });
// 		}
// 	}, [message, error, dispatch, navigate, step, id]);

// 	const handleEmailSubmit = (e) => {
// 		e.preventDefault();
// 		dispatch(forgotUserPassword(email));
// 	};

// 	const handleOtpSubmit = (e) => {
// 		e.preventDefault();
// 		dispatch(resetUserPassword(id, otp));
// 	};

// 	const handlePasswordSubmit = (e) => {
// 		e.preventDefault();
// 		if (password !== confirmPassword) {
// 			return toast.error("Passwords do not match", toastOptions);
// 		}
// 		dispatch(changeUserPassword(id, password));
// 	};

// 	return (
// 		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-8 sm:px-6 lg:px-8">
// 			<div className="max-w-lg w-full space-y-8 border border-gray-300 rounded-lg p-12">
// 				<div>
// 					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// 						Reset Your Password
// 					</h2>
// 				</div>

// 				{step === 1 && (
// 					<form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
// 						<div>
// 							<label htmlFor="email" className="sr-only">
// 								Email address
// 							</label>
// 							<input
// 								id="email"
// 								name="email"
// 								type="email"
// 								required
// 								value={email}
// 								onChange={(e) => setEmail(e.target.value)}
// 								className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
// 								placeholder="Enter your email address"
// 							/>
// 						</div>
// 						<button
// 							type="submit"
// 							disabled={loading}
// 							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
// 						>
// 							{loading ? "Sending..." : "Send OTP"}
// 						</button>
// 					</form>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default ForgotPassword;
