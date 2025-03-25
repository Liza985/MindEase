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
			<div className="container mx-auto px-4 py-8 pt-24">
				<div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
					{/* Profile Header */}
					<div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
						<div className="flex items-center justify-between">
							<h1 className="text-2xl font-bold text-white">My Profile</h1>
							<button
								onClick={() => setIsEditing(!isEditing)}
								className="text-white hover:text-orange-200"
							>
								<FontAwesomeIcon
									icon={isEditing ? faTimes : faEdit}
									className="mr-2"
								/>
								{isEditing ? "Cancel" : "Edit Profile"}
							</button>
						</div>
					</div>

					{/* Profile Content */}
					<div className="p-6">
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Profile Picture */}
								<div className="md:col-span-2 flex justify-center mb-6">
									<div className="relative">
										<div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center text-4xl font-bold text-orange-500">
											{formData.firstName.charAt(0)}
										</div>
									</div>
								</div>

								{/* Form Fields */}
								<div className="form-group">
									<label className="block text-gray-700 mb-2">First Name</label>
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">
										Middle Name
									</label>
									<input
										type="text"
										name="middleName"
										value={formData.middleName}
										onChange={handleChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">Last Name</label>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">Email</label>
									<input
										type="email"
										name="email"
										value={formData.email}
										disabled
										className="w-full p-2 border rounded bg-gray-50"
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">
										Phone Number
									</label>
									<input
										type="tel"
										name="phoneNumber"
										value={formData.phoneNumber}
										onChange={handleChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">
										Date of Birth
									</label>
									<input
										type="date"
										name="dateOfBirth"
										value={formData.dateOfBirth}
										onChange={handleChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">Gender</label>
									<select
										name="gender"
										value={formData.gender}
										onChange={handleChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									>
										<option value="">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Other</option>
									</select>
								</div>
							</div>

							{/* Submit Button */}
							{isEditing && (
								<div className="mt-6 flex justify-end">
									<button
										type="submit"
										disabled={loading}
										className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
									>
										<FontAwesomeIcon icon={faCheck} className="mr-2" />
										{loading ? "Saving..." : "Save Changes"}
									</button>
								</div>
							)}
						</form>

						{/* Action Buttons */}
                        {!isEditing && (<div className="mt-8 flex justify-center gap-4">
                            <Link
                                to="/connect"
                                className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center"
                            >
                                <FontAwesomeIcon icon={faLink} className="mr-2" />
                                Connect
                            </Link>
                            <Link
                                to="/survey"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                            >
                                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                                Take Survey
                            </Link>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                            >
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                Delete Account
                            </button>
                        </div>)}
					</div>

					{isModalOpen && (
						<div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
							<div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 max-w-md w-full">
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
									Are you sure you want to delete your account? This action
									cannot be undone.
								</p>

								<div className="flex justify-end gap-4">
									<button
										onClick={handleDeleteAccount}
										className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
									>
										Confirm
									</button>
									<button
										onClick={() => setIsModalOpen(false)}
										className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
