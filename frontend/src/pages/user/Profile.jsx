import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faCheck,
	faTimes,
	faTrash,
	faLink,
	faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import {
	updateUserProfile,
	deleteUserAccount,
} from "../../redux/Actions/userAction";
import toastOptions from "../../constants/toast";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		id: user,
		loading,
		error,
		message,
	} = useSelector((state) => state.user);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		dateOfBirth: "",
		gender: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				firstName: user.firstName || "",
				middleName: user.middleName || "",
				lastName: user.lastName || "",
				email: user.email || "",
				phoneNumber: user.phoneNumber || "",
				dateOfBirth: user.dateOfBirth
					? new Date(user.dateOfBirth).toISOString().split("T")[0]
					: "",
				gender: user.gender || "",
			});
		}
	}, [user]);

	// Handle error and success messages
	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });

			// If the message indicates successful deletion, redirect to home
			if (message.toLowerCase().includes("deleted")) {
				navigate("/");
			} else {
				setIsEditing(false);
			}
		}
	}, [error, message, dispatch, navigate]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate required fields
		if (!formData.firstName || !formData.lastName) {
			toast.error("First name and last name are required", toastOptions);
			return;
		}

		// Validate phone number format (optional)
		const phoneRegex = /^\d{10}$/;
		if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
			toast.error("Please enter a valid 10-digit phone number", toastOptions);
			return;
		}

		// Create update data object
		const updateData = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			middleName: formData.middleName,
			phoneNumber: formData.phoneNumber,
			dateOfBirth: formData.dateOfBirth,
			gender: formData.gender,
		};

		dispatch(updateUserProfile(updateData));
	};

	const handleDeleteAccount = () => {
		// Show a modal or confirmation dialog

		dispatch(deleteUserAccount());
	};

	return (
		<Layout>
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-8 pt-24">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{/* Left Column - Profile Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
								<div className="relative">
									<div className="h-32 bg-gradient-to-r from-orange-400 to-orange-600"></div>
									<div className="absolute -bottom-12 inset-x-0 flex justify-center">
										<div className="w-24 h-24 rounded-full bg-white p-2 shadow-md">
											<div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-500">
												{formData.firstName.charAt(0)}
											</div>
										</div>
									</div>
								</div>
								<div className="p-6 pt-16 text-center">
									<h2 className="text-2xl font-bold text-gray-800 mb-1">
										{formData.firstName} {formData.lastName}
									</h2>
									<div className="space-y-4">
										<div className="p-4 bg-orange-50 rounded-xl">
											<h3 className="text-sm font-semibold text-gray-700 mb-3">
												Contact Information
											</h3>
											<div className="space-y-2">
												<p className="text-gray-600 text-sm flex items-center justify-center">
													<span className="material-icons-outlined text-orange-400 mr-2">
														e-mail
													</span>
													{formData.email}
												</p>
												<p className="text-gray-600 text-sm flex items-center justify-center">
													<span className="material-icons-outlined text-orange-400 mr-2">
														phone
													</span>
													{formData.phoneNumber}
												</p>
											</div>
										</div>

										{/* Profile Actions */}
										<div className="space-y-3">
											{!isEditing && (
												<>
													<Link
														to="/connect"
														className="w-full bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-3 rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
													>
														<FontAwesomeIcon icon={faLink} className="mr-2" />
														Connect
													</Link>
													<Link
														to="/survey"
														className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
													>
														<FontAwesomeIcon
															icon={faClipboardList}
															className="mr-2"
														/>
														Take Survey
													</Link>
													<button
														onClick={() => setIsModalOpen(true)}
														className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
													>
														<FontAwesomeIcon icon={faTrash} className="mr-2" />
														Delete Account
													</button>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className="lg:col-span-2">
							{/* Profile Form */}
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
								<div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-4">
									<div className="flex items-center justify-between">
										<h2 className="text-xl font-bold text-white flex items-center">
											<FontAwesomeIcon icon={faEdit} className="mr-3" />
											Profile Details
										</h2>
										<button
											onClick={() => setIsEditing(!isEditing)}
											className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
												isEditing
													? "bg-white/20 text-white hover:bg-white/30"
													: "bg-white text-orange-600 hover:bg-orange-50"
											}`}
										>
											<FontAwesomeIcon
												icon={isEditing ? faTimes : faEdit}
												className="mr-2"
											/>
											{isEditing ? "Cancel" : "Edit"}
										</button>
									</div>
								</div>
								<div className="p-6">
									<form onSubmit={handleSubmit}>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													First Name
												</label>
												<input
													type="text"
													name="firstName"
													value={formData.firstName}
													onChange={handleChange}
													disabled={!isEditing}
													className={`w-full p-3 border rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												/>
											</div>
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Middle Name
												</label>
												<input
													type="text"
													name="middleName"
													value={formData.middleName}
													onChange={handleChange}
													disabled={!isEditing}
													className={`w-full p-3 border rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												/>
											</div>
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Last Name
												</label>
												<input
													type="text"
													name="lastName"
													value={formData.lastName}
													onChange={handleChange}
													disabled={!isEditing}
													className={`w-full p-3 border rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												/>
											</div>
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Email
												</label>
												<input
													type="email"
													name="email"
													value={formData.email}
													disabled
													className="w-full p-3 border rounded-xl bg-gray-50"
												/>
											</div>
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Phone Number
												</label>
												<input
													type="tel"
													name="phoneNumber"
													value={formData.phoneNumber}
													onChange={handleChange}
													disabled={!isEditing}
													className={`w-full p-3 border rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												/>
											</div>
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Date of Birth
												</label>
												<input
													type="date"
													name="dateOfBirth"
													value={formData.dateOfBirth}
													onChange={handleChange}
													disabled={!isEditing}
													className={`w-full p-3 border rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												/>
											</div>
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Gender
												</label>
												<select
													name="gender"
													value={formData.gender}
													onChange={handleChange}
													disabled={!isEditing}
													className={`w-full p-3 border rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												>
													<option value="">Select Gender</option>
													<option value="male">Male</option>
													<option value="female">Female</option>
													<option value="other">Other</option>
												</select>
											</div>
										</div>

										{isEditing && (
											<div className="mt-6 flex justify-end">
												<button
													type="submit"
													disabled={loading}
													className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
												>
													<FontAwesomeIcon icon={faCheck} className="mr-2" />
													{loading ? "Saving..." : "Save Changes"}
												</button>
											</div>
										)}
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Delete Account Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
					<div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800">
								Confirm Account Deletion
							</h2>
							<button
								onClick={() => setIsModalOpen(false)}
								className="text-gray-500 hover:text-gray-700"
							>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						</div>

						<p className="text-gray-700 mb-6">
							Are you sure you want to delete your account? This action cannot
							be undone.
						</p>

						<div className="flex justify-end gap-4">
							<button
								onClick={handleDeleteAccount}
								className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300"
							>
								Confirm
							</button>
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-gray-100 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-200 transition-all duration-300"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Profile;
