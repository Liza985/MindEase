import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
	verifyRegisterOtp,
	resendRegisterOtp,
} from "../../redux/Actions/userAction";
import toastOptions, { successToastOptions } from "../../constants/toast";

const VerifyOtp = () => {
	const [otp, setOtp] = useState("");
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, message, error, isAuthenticated } = useSelector(
		(state) => state.user
	);

	useEffect(() => {
		if (!id) {
			navigate(`/register`);
		}
	}, [id, navigate]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate(`/survey`);
		}
	}, [isAuthenticated, navigate]);

	// useEffect(() => {
	// 	if (message) {
	// 		toast.success(message, successToastOptions);
	// 		dispatch({ type: "CLEAR_MESSAGE" });
	// 		navigate("/survey");
	// 	}
	// 	if (error) {
	// 		toast.error(error, toastOptions);
	// 		dispatch({ type: "CLEAR_ERROR" });
	// 	}
	// }, [message, error, dispatch, navigate]);

	useEffect(() => {
		if (message) {
			toast.success(message, successToastOptions);
	
			if (message === "OTP verified successfully") {
				navigate("/survey", { state: { fromOtp: true } });
			}
			
	
			dispatch({ type: "CLEAR_MESSAGE" });
		}
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
	}, [message, error, dispatch, navigate]);
	

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!id) {
			toast.error("Invalid verification link", toastOptions);
			return;
		}
		dispatch(verifyRegisterOtp(id, otp));
	};

	const handleResendOtp = () => {
		if (!id) {
			toast.error("Invalid verification link", toastOptions);
			return;
		}
		dispatch(resendRegisterOtp(id));
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Verify Your Account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Please enter the OTP sent to your email
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<input
							type="text"
							required
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
							placeholder="Enter OTP"
						/>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
						>
							{loading ? "Verifying..." : "Verify OTP"}
						</button>
					</div>

					<div className="text-center">
						<button
							type="button"
							onClick={handleResendOtp}
							className="text-orange-500 hover:text-orange-600 cursor-pointer"
						>
							Resend OTP
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default VerifyOtp;