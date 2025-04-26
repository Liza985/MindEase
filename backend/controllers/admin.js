import dotenv from "dotenv";

export const adminLogin = (req, res) => {
	console.log(req.body);
	const { name, passkey } = req.body;

	// Check if name and password are provided
	if (!name || !passkey) {
		return res.status(400).json({
			success: false,
			message: "Name and passkey are required",
		});
	}

	// Compare the provided password with the one in the environment variables
	if (passkey === process.env.ADMIN_PASSWORD) {
		return res.status(200).json({
			success: true,
			message: "Login successful",
			admin: { name },
		});
	} else {
		return res.status(401).json({
			success: false,
			message: "Invalid credentials",
		});
	}
};

export const adminLogout = (req, res) => {
	// Clear the admin session or token
	res.status(200).json({
		success: true,
		message: "Logout successful",
	});
};

// Get system settings
export const getSettings = (req, res) => {
	try {
		// Read settings from environment variables or database
		const settings = {
			siteName: process.env.SITE_NAME || "MindEase",
			smtpHost: process.env.SMTP_HOST,
			smtpPort: process.env.SMTP_PORT,
			smtpUser: process.env.SMTP_USER,
			smtpEncryption: process.env.SMTP_ENCRYPTION,
			senderEmail: process.env.SENDER_EMAIL,
			senderName: process.env.SENDER_NAME,
			// Add other settings with defaults
			registrationEnabled: process.env.REGISTRATION_ENABLED === "true",
			requireEmailVerification:
				process.env.REQUIRE_EMAIL_VERIFICATION === "true",
			defaultUserRole: process.env.DEFAULT_USER_ROLE || "user",
			dataRetentionDays: parseInt(process.env.DATA_RETENTION_DAYS) || 180,
			timezone: process.env.TIMEZONE || "UTC",
			dateFormat: process.env.DATE_FORMAT || "MM/DD/YYYY",
		};

		return res.status(200).json({
			success: true,
			settings,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error fetching settings",
		});
	}
};

// Update system settings
export const updateSettings = (req, res) => {
	try {
		const newSettings = req.body;

		// In a production environment, you would:
		// 1. Validate the settings
		// 2. Update environment variables or database
		// 3. Update application configuration

		// For demo, we'll just return success
		return res.status(200).json({
			success: true,
			message: "Settings updated successfully",
			settings: newSettings,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Error updating settings",
		});
	}
};
