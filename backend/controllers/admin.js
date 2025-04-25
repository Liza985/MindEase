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
