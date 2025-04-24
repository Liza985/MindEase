import {
	faUser,
	faEye,
	faEyeSlash,
	faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../constants/toast";

const AdminLogin = () => {
	const [showPasskey, setShowPasskey] = useState(false);
	const [loginForm, setLoginForm] = useState({
		name: "",
		passkey: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.admin);

	const togglePasskey = () => {
		setShowPasskey(!showPasskey);
	};

	const handleChange = (e) => {
		setLoginForm({
			...loginForm,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: Implement admin login action
		// dispatch(adminLogin(loginForm));
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl border border-gray-100">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Login</h1>
					<p className="text-sm text-gray-600">
						Welcome back! Please sign in to your account
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<FontAwesomeIcon
							icon={faUser}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
						/>
						<input
							type="text"
							name="name"
							value={loginForm.name}
							onChange={handleChange}
							placeholder="Admin Name"
							className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							required
						/>
					</div>

					<div className="relative">
						<FontAwesomeIcon
							icon={faKey}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
						/>
						<input
							type={showPasskey ? "text" : "password"}
							name="passkey"
							value={loginForm.passkey}
							onChange={handleChange}
							placeholder="Passkey"
							className="bg-gray-100 border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
							required
						/>
						<button
							type="button"
							onClick={togglePasskey}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
						>
							<FontAwesomeIcon icon={showPasskey ? faEyeSlash : faEye} />
						</button>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-orange-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-orange-600 transition-all duration-200 flex items-center justify-center"
					>
						{loading ? (
							<span className="flex items-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Signing in...
							</span>
						) : (
							"Sign In"
						)}
					</button>
				</form>

				{error && (
					<p className="mt-4 text-sm text-red-500 text-center">{error}</p>
				)}
			</div>
		</div>
	);
};

export default AdminLogin;
