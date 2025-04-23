import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faCheck,
	faTimes,
	faStar,
	faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import {
	updateVolunteerProfile,
	getVolunteerProfile,
} from "../../redux/Actions/volunteerAction";
import toastOptions from "../../constants/toast";
import Select from "react-select";
import VolHeader from "../../components/VolHeader";
import { Link } from "react-router-dom";

const Profile = () => {
	const dispatch = useDispatch();
	const { volunteer, loading, error, message } = useSelector(
		(state) => state.volunteer
	);
	const [isEditing, setIsEditing] = useState(false);
	
	const dayOptions = [
		{ value: "monday", label: "Monday" },
		{ value: "tuesday", label: "Tuesday" },
		{ value: "wednesday", label: "Wednesday" },
		{ value: "thursday", label: "Thursday" },
		{ value: "friday", label: "Friday" },
		{ value: "saturday", label: "Saturday" },
		{ value: "sunday", label: "Sunday" },
	];

	const expertiseOptions = [
		{ value: "depression", label: "Depression" },
		{ value: "stress", label: "Stress" },
		{ value: "relationships", label: "Relationships" },
		{ value: "grief", label: "Grief" },
		{ value: "trauma", label: "Trauma" },
		{ value: "addiction", label: "Addiction" },
		{ value: "eating-disorders", label: "Eating Disorders" },
		{ value: "self-esteem", label: "Self-Esteem" },
		{ value: "anger", label: "Anger Management" },
		{ value: "sleep", label: "Sleep Issues" },
		{ value: "other", label: "Other" },
	];

	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		dateOfBirth: "",
		gender: "",
		expertiseArea: [],
		availability: {
			daysAvailable: [],
			timeSlots: { start: "", end: "" },
		},
	});

	useEffect(() => {
		dispatch(getVolunteerProfile());
	}, [dispatch]);
	useEffect(() => {
		if (volunteer) {
			setFormData({
				firstName: volunteer.firstName || "",
				middleName: volunteer.middleName || "",
				lastName: volunteer.lastName || "",
				email: volunteer.email || "",
				phoneNumber: volunteer.phoneNumber || "",
				dateOfBirth: volunteer.dateOfBirth
					? new Date(volunteer.dateOfBirth).toISOString().split("T")[0]
					: "",
				gender: volunteer.gender || "",
				expertiseArea: Array.isArray(volunteer.expertiseArea)
					? volunteer.expertiseArea
					: volunteer.expertiseArea
					? [volunteer.expertiseArea]
					: [],
				availability: {
					daysAvailable: volunteer.availability?.daysAvailable || [],
					timeSlots: {
						start: volunteer.availability?.timeSlots?.start || "",
						end: volunteer.availability?.timeSlots?.end || "",
					},
				},
			});
		}
	}, [volunteer]);
	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_ERROR" });
		}
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_MESSAGE" });
			setIsEditing(false);
		}
	}, [error, message, dispatch]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleDaysChange = (selectedOptions) => {
		setFormData((prev) => ({
			...prev,
			availability: {
				...prev.availability,
				daysAvailable: selectedOptions.map((option) => option.value),
			},
		}));
	};

	const handleTimeChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			availability: {
				...prev.availability,
				timeSlots: {
					...prev.availability.timeSlots,
					[name]: value,
				},
			},
		}));
	};

	const handleExpertiseChange = (selectedOptions) => {
		setFormData((prev) => ({
			...prev,
			expertiseArea: selectedOptions.map((option) => option.value),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create a copy of the form data to modify
		const dataToSubmit = {
			...formData,
			// Ensure expertiseArea is properly formatted
			expertiseArea: Array.isArray(formData.expertiseArea)
				? formData.expertiseArea
				: typeof formData.expertiseArea === "string"
				? [formData.expertiseArea]
				: [],
		};

		dispatch(updateVolunteerProfile(dataToSubmit));
		setIsEditing(false);
	};

	const renderStars = (rating) => {
		return [...Array(5)].map((_, index) => (
			<FontAwesomeIcon
				key={index}
				icon={index < rating ? faStar : regularStar}
				className={index < rating ? "text-yellow-400" : "text-gray-300"}
			/>
		));
	};

	// Get latest 2 reviews
	const latestReviews = volunteer?.ratings?.slice(0, 2) || [];

	return (
		<>
			<VolHeader />
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
									<p className="text-orange-500 font-medium mb-4 capitalize">
										{Array.isArray(formData.expertiseArea)
											? formData.expertiseArea.join(", ")
											: formData.expertiseArea}
									</p>
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
										<div className="p-4 bg-orange-50 rounded-xl">
											<h3 className="text-sm font-semibold text-gray-700 mb-3">
												Availability
											</h3>
											<div className="space-y-2">
												<div className="text-sm text-gray-600">
													<p className="mb-2">
														{formData.availability.daysAvailable.length > 0
															? formData.availability.daysAvailable
																	.map(
																		(day) =>
																			day.charAt(0).toUpperCase() + day.slice(1)
																	)
																	.join(", ")
															: "No days set"}
													</p>
													<p className="font-medium text-orange-500">
														{formData.availability.timeSlots.start &&
														formData.availability.timeSlots.end
															? `${formData.availability.timeSlots.start} - ${formData.availability.timeSlots.end}`
															: "No time set"}
													</p>
												</div>
											</div>
										</div>
									</div>
									<button
										onClick={() => setIsEditing(!isEditing)}
										className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
									>
										<FontAwesomeIcon
											icon={isEditing ? faTimes : faEdit}
											className="mr-2"
										/>
										{isEditing ? "Cancel Editing" : "Edit Profile"}
									</button>
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className="lg:col-span-2 space-y-8">
							{/* Profile Form */}
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
								<div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-4">
									<h2 className="text-xl font-bold text-white">
										Profile Details
									</h2>
								</div>
								<div className="p-6">
									<form onSubmit={handleSubmit}>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{/* Form inputs with updated styling */}
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
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Area of Expertise
												</label>
												<Select
													isMulti
													isDisabled={!isEditing}
													name="expertiseArea"
													options={expertiseOptions}
													value={expertiseOptions.filter((option) =>
														Array.isArray(formData.expertiseArea)
															? formData.expertiseArea.includes(option.value)
															: formData.expertiseArea === option.value
													)}
													onChange={handleExpertiseChange}
													className={`w-full rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												/>
											</div>
											<div className="md:col-span-2">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Available Days
												</label>
												<Select
													isMulti
													isDisabled={!isEditing}
													name="daysAvailable"
													options={dayOptions}
													value={dayOptions.filter((day) =>
														formData.availability.daysAvailable.includes(
															day.value
														)
													)}
													onChange={handleDaysChange}
													className="mb-4"
												/>
											</div>
											<div className="form-group">
												<label className="block text-gray-700 text-sm font-medium mb-2">
													Start Time
												</label>
												<input
													type="time"
													name="start"
													value={formData.availability?.timeSlots?.start || ""}
													onChange={handleTimeChange}
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
													End Time
												</label>
												<input
													type="time"
													name="end"
													value={formData.availability?.timeSlots?.end || ""}
													onChange={handleTimeChange}
													disabled={!isEditing}
													className={`w-full p-3 border rounded-xl transition-colors duration-200 ${
														isEditing
															? "bg-white border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
															: "bg-gray-50 border-gray-200"
													}`}
												/>
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

							{/* Reviews Section */}
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
								<div className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-4">
									<div className="flex items-center justify-between">
										<h2 className="text-xl font-bold text-white">
											Recent Reviews
										</h2>
										<Link
											to="/volunteer/reviews"
											className="text-white hover:text-orange-100 flex items-center transition-colors duration-200"
										>
											View All
											<FontAwesomeIcon icon={faArrowRight} className="ml-2" />
										</Link>
									</div>
								</div>

								<div className="p-6">
									{latestReviews.length > 0 ? (
										<div className="space-y-6">
											{latestReviews.map((review, index) => (
												<div
													key={index}
													className="p-4 rounded-xl bg-orange-50 last:mb-0"
												>
													<div className="flex items-center mb-3">
														<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold text-lg shadow-sm">
															{review.userId?.firstName?.[0] || "U"}
														</div>
														<div className="ml-4">
															<h3 className="font-semibold text-gray-800">
																{review.userId?.firstName}{" "}
																{review.userId?.lastName}
															</h3>
															<div className="flex items-center">
																<div className="flex mr-2">
																	{renderStars(review.rating)}
																</div>
																<span className="text-sm text-gray-500">
																	{new Date(
																		review.createdAt
																	).toLocaleDateString()}
																</span>
															</div>
														</div>
													</div>
													<p className="text-gray-600 text-sm bg-white p-4 rounded-lg">
														{review.feedback}
													</p>
												</div>
											))}
										</div>
									) : (
										<div className="text-center py-8 text-gray-500">
											<div className="text-5xl mb-4">📝</div>
											No reviews yet
										</div>
									)}

									{volunteer?.ratings?.length > 2 && (
										<div className="mt-6 text-center">
											<Link
												to="/volunteer/reviews"
												className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
											>
												See all {volunteer.ratings.length} reviews
												<FontAwesomeIcon icon={faArrowRight} className="ml-2" />
											</Link>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
