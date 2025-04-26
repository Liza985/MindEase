import { Bell, Globe, Info, Lock, Mail, Save, User, X } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/AdminSideBar";
import {
	getSettings,
	updateSettings,
} from "../../redux/Actions/settingsAction";
import toastOptions from "../../constants/toast";

const Settings = () => {
	const dispatch = useDispatch();
	const { settings, loading, error, message } = useSelector(
		(state) => state.settings,
	);
	const [activeTab, setActiveTab] = React.useState("general");

	// Load settings on component mount
	useEffect(() => {
		dispatch(getSettings());
	}, [dispatch]);

	// Handle notifications
	useEffect(() => {
		if (error) {
			toast.error(error, toastOptions);
			dispatch({ type: "CLEAR_SETTINGS_ERROR" });
		}
		if (message) {
			toast.success(message, toastOptions);
			dispatch({ type: "CLEAR_SETTINGS_MESSAGE" });
		}
	}, [error, message, dispatch]);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateSettings(settings));
	};

	// Handle input changes
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		dispatch({
			type: "GET_SETTINGS_SUCCESS",
			payload: {
				settings: {
					...settings,
					[name]: type === "checkbox" ? checked : value,
				},
			},
		});
	};

	// Handle cancel
	const handleCancel = () => {
		dispatch(getSettings());
		toast.info("Changes discarded", toastOptions);
	};

	if (!settings) {
		return (
			<div className="flex min-h-screen bg-gray-100">
				<AdminSidebar />
				<div className="ml-64 flex-grow p-6">
					<div className="flex justify-center items-center h-full">
						<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-gray-100">
			<AdminSidebar />

			<div className="ml-64 flex-grow p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
					<div className="flex space-x-3">
						<button
							onClick={handleCancel}
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
						>
							<X size={16} />
							Cancel
						</button>
						<button
							onClick={handleSubmit}
							className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
						>
							<Save size={16} />
							Save Changes
						</button>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md">
					{/* Tabs navigation */}
					<div className="flex border-b border-gray-200">
						<button
							className={`px-6 py-3 text-sm font-medium ${
								activeTab === "general"
									? "text-orange-600 border-b-2 border-orange-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("general")}
						>
							<div className="flex items-center gap-2">
								<Globe size={16} />
								General
							</div>
						</button>
						<button
							className={`px-6 py-3 text-sm font-medium ${
								activeTab === "users"
									? "text-orange-600 border-b-2 border-orange-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("users")}
						>
							<div className="flex items-center gap-2">
								<User size={16} />
								Users
							</div>
						</button>
						<button
							className={`px-6 py-3 text-sm font-medium ${
								activeTab === "notifications"
									? "text-orange-600 border-b-2 border-orange-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("notifications")}
						>
							<div className="flex items-center gap-2">
								<Bell size={16} />
								Notifications
							</div>
						</button>
						<button
							className={`px-6 py-3 text-sm font-medium ${
								activeTab === "privacy"
									? "text-orange-600 border-b-2 border-orange-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("privacy")}
						>
							<div className="flex items-center gap-2">
								<Lock size={16} />
								Privacy
							</div>
						</button>
						<button
							className={`px-6 py-3 text-sm font-medium ${
								activeTab === "email"
									? "text-orange-600 border-b-2 border-orange-600"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setActiveTab("email")}
						>
							<div className="flex items-center gap-2">
								<Mail size={16} />
								Email
							</div>
						</button>
					</div>

					{/* Form content */}
					<div className="p-6">
						<form>
							{/* General Settings */}
							{activeTab === "general" && (
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											General Settings
										</h3>
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
											<div>
												<label
													htmlFor="siteName"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Site Name
												</label>
												<input
													type="text"
													name="siteName"
													id="siteName"
													value={settings.siteName}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div>
												<label
													htmlFor="tagline"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Tagline
												</label>
												<input
													type="text"
													name="tagline"
													id="tagline"
													value={settings.tagline}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div className="sm:col-span-2">
												<label
													htmlFor="siteDescription"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Site Description
												</label>
												<textarea
													name="siteDescription"
													id="siteDescription"
													rows="3"
													value={settings.siteDescription}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div>
												<label
													htmlFor="timezone"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Timezone
												</label>
												<select
													name="timezone"
													id="timezone"
													value={settings.timezone}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												>
													<option value="America/New_York">
														Eastern Time (US & Canada)
													</option>
													<option value="America/Chicago">
														Central Time (US & Canada)
													</option>
													<option value="America/Denver">
														Mountain Time (US & Canada)
													</option>
													<option value="America/Los_Angeles">
														Pacific Time (US & Canada)
													</option>
													<option value="UTC">UTC</option>
												</select>
											</div>
											<div>
												<label
													htmlFor="dateFormat"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Date Format
												</label>
												<select
													name="dateFormat"
													id="dateFormat"
													value={settings.dateFormat}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												>
													<option value="MM/DD/YYYY">MM/DD/YYYY</option>
													<option value="DD/MM/YYYY">DD/MM/YYYY</option>
													<option value="YYYY-MM-DD">YYYY-MM-DD</option>
												</select>
											</div>
										</div>
									</div>
									<div className="border-t border-gray-200 pt-4">
										<div className="flex items-center">
											<Info size={16} className="text-blue-500 mr-2" />
											<p className="text-sm text-gray-500">
												These settings control how your site appears to users
												and how basic functionality works.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* User Settings */}
							{activeTab === "users" && (
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											User Account Settings
										</h3>
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
											<div className="flex items-center">
												<input
													type="checkbox"
													name="registrationEnabled"
													id="registrationEnabled"
													checked={settings.registrationEnabled}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="registrationEnabled"
													className="ml-2 block text-sm text-gray-700"
												>
													Allow new user registrations
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="requireEmailVerification"
													id="requireEmailVerification"
													checked={settings.requireEmailVerification}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="requireEmailVerification"
													className="ml-2 block text-sm text-gray-700"
												>
													Require email verification
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="allowGuestMessages"
													id="allowGuestMessages"
													checked={settings.allowGuestMessages}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="allowGuestMessages"
													className="ml-2 block text-sm text-gray-700"
												>
													Allow guest messages
												</label>
											</div>
											<div>
												<label
													htmlFor="defaultUserRole"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Default Role for New Users
												</label>
												<select
													name="defaultUserRole"
													id="defaultUserRole"
													value={settings.defaultUserRole}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												>
													<option value="user">Regular User</option>
													<option value="contributor">Contributor</option>
													<option value="editor">Editor</option>
												</select>
											</div>
											<div>
												<label
													htmlFor="inactiveUserDays"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Mark Users Inactive After (Days)
												</label>
												<input
													type="number"
													name="inactiveUserDays"
													id="inactiveUserDays"
													value={settings.inactiveUserDays}
													onChange={handleChange}
													min="30"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
										</div>
									</div>
									<div className="border-t border-gray-200 pt-4">
										<div className="flex items-center">
											<Info size={16} className="text-blue-500 mr-2" />
											<p className="text-sm text-gray-500">
												These settings determine how user accounts function on
												your platform.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Notification Settings */}
							{activeTab === "notifications" && (
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Notification Settings
										</h3>
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
											<div className="flex items-center">
												<input
													type="checkbox"
													name="adminNotifications"
													id="adminNotifications"
													checked={settings.adminNotifications}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="adminNotifications"
													className="ml-2 block text-sm text-gray-700"
												>
													Admin notifications
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="newUserNotifications"
													id="newUserNotifications"
													checked={settings.newUserNotifications}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="newUserNotifications"
													className="ml-2 block text-sm text-gray-700"
												>
													New user notifications
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="newMessageNotifications"
													id="newMessageNotifications"
													checked={settings.newMessageNotifications}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="newMessageNotifications"
													className="ml-2 block text-sm text-gray-700"
												>
													New message notifications
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="systemAlerts"
													id="systemAlerts"
													checked={settings.systemAlerts}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="systemAlerts"
													className="ml-2 block text-sm text-gray-700"
												>
													System alerts
												</label>
											</div>
											<div>
												<label
													htmlFor="emailDigest"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Email Digest Frequency
												</label>
												<select
													name="emailDigest"
													id="emailDigest"
													value={settings.emailDigest}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												>
													<option value="never">Never</option>
													<option value="daily">Daily</option>
													<option value="weekly">Weekly</option>
													<option value="monthly">Monthly</option>
												</select>
											</div>
										</div>
									</div>
									<div className="border-t border-gray-200 pt-4">
										<div className="flex items-center">
											<Info size={16} className="text-blue-500 mr-2" />
											<p className="text-sm text-gray-500">
												Control which notifications are sent and how frequently.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Privacy Settings */}
							{activeTab === "privacy" && (
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Privacy Settings
										</h3>
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
											<div>
												<label
													htmlFor="privacyPolicyUpdated"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Privacy Policy Last Updated
												</label>
												<input
													type="date"
													name="privacyPolicyUpdated"
													id="privacyPolicyUpdated"
													value={settings.privacyPolicyUpdated}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div>
												<label
													htmlFor="dataRetentionDays"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Data Retention Period (Days)
												</label>
												<input
													type="number"
													name="dataRetentionDays"
													id="dataRetentionDays"
													value={settings.dataRetentionDays}
													onChange={handleChange}
													min="30"
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="allowDataDownload"
													id="allowDataDownload"
													checked={settings.allowDataDownload}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="allowDataDownload"
													className="ml-2 block text-sm text-gray-700"
												>
													Allow users to download their data
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="anonymizeInactiveUsers"
													id="anonymizeInactiveUsers"
													checked={settings.anonymizeInactiveUsers}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="anonymizeInactiveUsers"
													className="ml-2 block text-sm text-gray-700"
												>
													Anonymize inactive users after retention period
												</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													name="showUserOnlineStatus"
													id="showUserOnlineStatus"
													checked={settings.showUserOnlineStatus}
													onChange={handleChange}
													className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
												/>
												<label
													htmlFor="showUserOnlineStatus"
													className="ml-2 block text-sm text-gray-700"
												>
													Show user online status
												</label>
											</div>
										</div>
									</div>
									<div className="border-t border-gray-200 pt-4">
										<div className="flex items-center">
											<Info size={16} className="text-yellow-500 mr-2" />
											<p className="text-sm text-gray-500">
												These settings help ensure compliance with privacy
												regulations like GDPR and CCPA.
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Email Settings */}
							{activeTab === "email" && (
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium text-gray-900 mb-4">
											Email Configuration
										</h3>
										<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
											<div>
												<label
													htmlFor="smtpHost"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													SMTP Host
												</label>
												<input
													type="text"
													name="smtpHost"
													id="smtpHost"
													value={settings.smtpHost}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div>
												<label
													htmlFor="smtpPort"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													SMTP Port
												</label>
												<input
													type="number"
													name="smtpPort"
													id="smtpPort"
													value={settings.smtpPort}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div>
												<label
													htmlFor="smtpUser"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													SMTP Username
												</label>
												<input
													type="text"
													name="smtpUser"
													id="smtpUser"
													value={settings.smtpUser}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div>
												<label
													htmlFor="smtpEncryption"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													Encryption
												</label>
												<select
													name="smtpEncryption"
													id="smtpEncryption"
													value={settings.smtpEncryption}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												>
													<option value="None">None</option>
													<option value="SSL">SSL</option>
													<option value="TLS">TLS</option>
												</select>
											</div>
											<div>
												<label
													htmlFor="senderEmail"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													From Email Address
												</label>
												<input
													type="email"
													name="senderEmail"
													id="senderEmail"
													value={settings.senderEmail}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
											<div>
												<label
													htmlFor="senderName"
													className="block text-sm font-medium text-gray-700 mb-1"
												>
													From Name
												</label>
												<input
													type="text"
													name="senderName"
													id="senderName"
													value={settings.senderName}
													onChange={handleChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
												/>
											</div>
										</div>
									</div>
									<div className="border-t border-gray-200 pt-4">
										<div className="flex items-center">
											<Info size={16} className="text-blue-500 mr-2" />
											<p className="text-sm text-gray-500">
												Configure email server settings for sending
												notifications and system emails.
											</p>
										</div>
									</div>
									<div className="mt-4">
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
										>
											Test Email Configuration
										</button>
									</div>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
