import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { updateVolunteerProfile } from "../../redux/Actions/volunteerAction";
import toastOptions from "../../constants/toast";
import Select from "react-select";
import VolHeader from "../../components/VolHeader";

const Profile = () => {
	const dispatch = useDispatch();
	const {
		id: volunteer,
		loading,
		error,
		message,
	} = useSelector((state) => state.volunteer);
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

	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		dateOfBirth: "",
		gender: "",
		expertiseArea: "",
		availability: {
			daysAvailable: [],
			timeSlots: { start: "", end: "" },
		},
	});

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
				expertiseArea: volunteer.expertiseArea || "",
				availability: volunteer.availability || {
					daysAvailable: [],
					timeSlots: { start: "", end: "" },
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

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateVolunteerProfile(formData));
	};

	return (
		<>
			<VolHeader title="Profile" />
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

								{/* Basic Information */}
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

								<div className="form-group">
									<label className="block text-gray-700 mb-2">
										Area of Expertise
									</label>
									<select
										name="expertiseArea"
										value={formData.expertiseArea}
										onChange={handleChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									>
										<option value="">Select Expertise</option>
										<option value="education">Education</option>
										<option value="healthcare">Healthcare</option>
										<option value="technology">Technology</option>
										<option value="environment">Environment</option>
										<option value="social-services">Social Services</option>
										<option value="arts-culture">Arts & Culture</option>
										<option value="sports-recreation">
											Sports & Recreation
										</option>
										<option value="other">Other</option>
									</select>
								</div>

								{/* Availability Section */}
								<div className="md:col-span-2">
									<label className="block text-gray-700 mb-2">
										Available Days
									</label>
									<Select
										isMulti
										isDisabled={!isEditing}
										name="daysAvailable"
										options={dayOptions}
										value={dayOptions.filter((day) =>
											formData.availability.daysAvailable.includes(day.value)
										)}
										onChange={handleDaysChange}
										className="mb-4"
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">Start Time</label>
									<input
										type="time"
										name="start"
										value={formData.availability.timeSlots.start}
										onChange={handleTimeChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									/>
								</div>

								<div className="form-group">
									<label className="block text-gray-700 mb-2">End Time</label>
									<input
										type="time"
										name="end"
										value={formData.availability.timeSlots.end}
										onChange={handleTimeChange}
										disabled={!isEditing}
										className={`w-full p-2 border rounded ${
											isEditing ? "bg-white" : "bg-gray-50"
										}`}
									/>
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
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
