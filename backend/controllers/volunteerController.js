import { sendEMail } from "../middlewares/sendMail.js";
import User from "../models/user.js";
import Volunteer from "../models/volunteer.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerVolunteer = async (req, res) => {
	try {
		const {
			firstName,
			middleName,
			lastName,
			email,
			password,
			dateOfBirth,
			gender,
			phoneNumber,
			expertiseAreas,
			availability,
		} = req.body;

		// Check required fields
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!dateOfBirth ||
			!gender ||
			!phoneNumber
		) {
			return res
				.status(400)
				.json({ success: false, message: message.missingFieldMessage });
		}

		// Check if user already exists in either collection
		const [volunteer, user] = await Promise.all([
			Volunteer.findOne({ email }),
			User.findOne({ email }),
		]);

		if (volunteer) {
			return res
				.status(400)
				.json({ success: false, message: message.volunteerAlreadyExist });
		}

		// Create volunteer entry
		let newVolunteer = await Volunteer.create({ ...req.body });

		// Associate with existing user if found
		if (user) {
			newVolunteer.userId = user._id;
			await newVolunteer.save();
		}

		// Generate OTP for verification
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(Date.now() + 5 * 60 * 1000);
		newVolunteer.registerOtp = otp;
		newVolunteer.registerOtpExpire = otpExpire;

		await newVolunteer.save();

		// Generate token
		const token = await newVolunteer.generateToken();

		// Read email template
		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);

		const subject = "Verify your volunteer account";
		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			newVolunteer._id.toString()
		);

		// Send verification email
		try {
			await sendEMail({ email, subject, html: emailTemplate });
		} catch (emailError) {
			console.error("Email sending failed:", emailError);
		}

		// Send response
		return res.status(200).json({
			success: true,
			message: message.volunteerCreated,
			newVolunteer,
			token,
		});
	} catch (error) {
		console.error(error.message);
		return Response(res, 500, false, error.message);
	}
};

export const verifyVolunteer = async (req, res) => {
	try {
		// fetching id and otp
		const { id } = req.params;
		let { otp } = req.body;

		// checking id
		if (!id) {
			return Response(res, 404, false, message.idNotFound);
		}

		// finding volunteer
		const volunteer = await Volunteer.findById(id);

		// check volunteer
		if (!volunteer) {
			return Response(res, 404, false, message.volunteerNotFound);
		}

		// already verified
		if (volunteer.isVerified) {
			return Response(res, 400, false, message.volunteerAlreadyVerified);
		}

		//otp attempt lock or not

		if (volunteer.registerOtpLockUntil > Date.now()) {
			volunteer.registerOtp = undefined;
			volunteer.registerOtpExpire = undefined;
			volunteer.registerOtpAttempts = 0;
			await volunteer.save();
			return Response(
				res,
				400,
				false,
				`Try again after ${Math.floor(
					(volunteer.registerOtpLockUntil - Date.now()) % (60 * 1000)
				)} minutes and ${Math.floor(
					(volunteer.registerOtpLockUntil - DESTRUCTION.now()) % 1000
				)} seconds`
			);
		}

		// checking otp attempts
		if (volunteer.registerOtpAttempts >= 3) {
			volunteer.registerOtp = undefined;
			volunteer.registerOtpExpire = undefined;
			volunteer.registerOtpAttempts = 0;
			volunteer.registerOtpLockUntil =
				Date.now() + process.env.REGISTER_OTP_LOCK * 60 * 1000;
			await volunteer.save();
			await volunteer.save();
			return Response(res, 400, false, message.otpAttemptsExceed);
		}

		// check otp
		if (!otp) {
			volunteer.registerOtpAttempts += 1;
			await volunteer.save();
			return Response(res, 400, false, message.otpNotFound);
		}

		// check otp expire

		if (volunteer.registerOtpExpire < Date.now()) {
			volunteer.registerOtp = undefined;
			volunteer.registerOtpAttempts = 0;
			volunteer.registerOtpLockUntil = undefined;
			await volunteer.save();
			return Response(res, 400, false, message.otpExpire);
		}

		console.log("Working");
		// update volunteer
		volunteer.isVerified = true;
		volunteer.registerOtp = undefined;
		volunteer.registerOtpExpire = undefined;
		volunteer.registerOtpAttempts = 0;
		volunteer.registerOtpLockUntil = undefined;
		await volunteer.save();

		//authenticate volunteer
		const token = await volunteer.generateToken();
		const options = {
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		};
		//sending response
		res.status(200).cookie("token", token, options).json({
			success: true,
			message: message.volunteerAlreadyVerified,
			data: volunteer,
		});
	} catch (error) {
		console.log(error.message);
		return Response(res, 500, false, error.message);
	}
};

export const resendVolunteer = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 400, false, message.idNotFound);
		}
		let volunteer = await Volunteer.findById(id);
		if (!volunteer) {
			return Response(res, 400, false, message.volunteerNotFound);
		}

		if (volunteer.isVerified) {
			return Response(res, 400, false, message.volunteerAlreadyVerified);
		}

		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.REGISTER_OTP_EXPIRE * 15 * 60 * 1000
		);

		volunteer.registerOtp = otp;
		volunteer.registerOtpExpire = otpExpire;
		volunteer.registerOtpAttempts = 0;
		await volunteer.save();

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);

		const subject = "Verify your account";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			volunteer._id.toString()
		);
		await sendEMail({ email: volunteer.email, subject, html: emailTemplate });

		Response(res, 200, true, message?.otpSendMessage);
	} catch (error) {
		console.log(error.message);
		Response(res, 500, false, error.message);
	}
};

export const loginVolunteer = async (req, res) => {
	try {
		//params and body
		const { email, password } = req.body;

		// check email and password
		if (!email || !password) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		// find volunteer
		const volunteer = await Volunteer.findOne({ email }).select("+password");

		// check volunteer
		if (!volunteer) {
			return Response(res, 400, false, message.volunteerNotFound);
		}

		// verified or not
		if (!volunteer.isVerified) {
			return Response(res, 400, false, message.volunteerNotVerified);
		}
		//login attempt locked or not
		if (volunteer.lockUntil < Date.now()) {
			volunteer.loginAttempts = 0;
			await volunteer.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}
		//login attempt exceeded or not
		if (volunteer.loginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
			volunteer.loginAttempts = 0;
			volunteer.lockUntil = new Date(
				Date.now() + process.env.MAX_LOGIN_ATTEMPTS_EXPIRE * 60 * 1000
			);
			await volunteer.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}

		//check password
		const isMatch = await volunteer.matchPassword(password);
		if (!isMatch) {
			volunteer.loginAttempts += 1;
			await volunteer.save();
			return Response(res, 400, false, message.badAuthMessage);
		}

		volunteer.loginAttempts = 0;
		volunteer.lockUntil = undefined;
		await volunteer.save();
		// console.log("Final working");

		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(Date.now() + 5 * 60 * 1000);
		volunteer.loginOtp = otp;
		volunteer.loginOtpExpire = otpExpire;

		await volunteer.save();

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);

		const subject = "Verify your volunteer account";
		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			volunteer._id.toString()
		);

		// Send verification email
		try {
			await sendEMail({ email, subject, html: emailTemplate });
		} catch (emailError) {
			console.error("Email sending failed:", emailError);
		}

		//authenticate user
		const token = await volunteer.generateToken();
		const options = {
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		};

		//sending response
		res.status(200).cookie("token", token, options).json({
			success: true,
			message: message.loginSuccessful,
			data: volunteer,
		});
	} catch (error) {
		console.log(error.message);
		Response(res, 500, false, error.message);
	}
};

export const verifyVolunteerLogin = async (req, res) => {
	try {
		const { id } = req.params;
		let { otp } = req.body;

		if (!id) {
			return Response(res, 400, false, message.idNotFound);
		}

		let volunteer = await Volunteer.findById(id);

		if (!volunteer) {
			return Response(res, 400, false, message.volunteerNotFound);
		}

		if (!volunteer.isVerified) {
			return Response(Response, 400, false, message.volunteerNotVerified);
		}

		if (volunteer.loginOtpAttemptsExpire > Date.now()) {
			return Response(res, 400, false, message.loginLockedMessage);
		}

		if (volunteer.loginOtpAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
			return Response(res, 400, false, message.otpAttemptsExceed);
		}

		if (!otp) {
			volunteer.loginOtpAttempts += 1;
			await volunteer.save();
			return Response(res, 400, false, message.otpNotFound);
		}

		if (volunteer.loginOtpExpire < Date.now()) {
			return Response(res, 400, false, message.otpExpire);
		}

		otp = Number(otp);
		if (volunteer.loginOtp !== otp) {
			volunteer.loginOtpAttempts += 1;
			await volunteer.save();
			return Response(res, 400, false, message.invalidOtp);
		}
		volunteer.loginOtp = undefined;
		volunteer.loginOtpAttempts = 0;
		volunteer.loginOtpAttemptsExpire = undefined;
		volunteer.loginOtpExpire = undefined;
		await volunteer.save();

		const token = await volunteer.generateToken();

		const options = {
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		};

		res.status(200).cookie("token", token, options).json({
			success: true,
			message: message.loginSuccessful,
			data: volunteer,
		});
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const resendVerifyVolunteerLogin = async (req, res) => {
	try {
		//parsing params
		const { id } = req.params;

		//checking it
		if (!id) {
			return Response(res, 400, false, message.idNotFound);
		}
		//checking volunteer
		let volunteer = await Volunteer.findById(id);

		if (!volunteer) {
			return Response(res, 400, false, message.volunteerNotFound);
		}
		//generating otp and saving
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.LOGIN_OTP_EXPIRE * 15 * 60 * 1000
		);

		volunteer.loginOtp = otp;
		volunteer.loginOtpAttempts = 0;
		volunteer.loginOtpAttemptsExpire = undefined;
		volunteer.loginOtpExpire = otpExpire;
		await volunteer.save();

		//send mail

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Two step verification";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			volunteer._id.toString()
		);

		const email = volunteer.email;

		await sendEMail({ email, subject, html: emailTemplate });

		Response(res, 200, true, message.otpSendMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const logoutVolunteer = async (req, res) => {
	try {
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		Response(res, 200, true, message.logoutMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const forgetVolunteerPassword = async (req, res) => {
	try {
		const { email } = req.body;

		if (!email) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		const volunteer = await Volunteer.findOne({ email });
		if (!volunteer) {
			return Response(res, 400, false, message.volunteerNotFound);
		}

		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.OTP_EXPIRE * 15 * 60 * 1000
		);

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Reset your volunteer password";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace(
			"{{USER_ID}}",
			volunteer._id.toString()
		);

		await sendEMail({ email: volunteer.email, subject, html: emailTemplate });

		volunteer.resetPassword = otp;
		volunteer.resetPasswordExpire = otpExpire;
		await volunteer.save();

		Response(res, 200, true, message.otpSendMessage, volunteer._id);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const resetVolunteerPassword = async (req, res) => {
	try {
		const { id } = req.params;
		let { otp } = req.body;

		if (!id) {
			return Response(res, 400, false, message.volunteerNotFound);
		}

		const volunteer = await Volunteer.findById(id);
		if (!volunteer) {
			return Response(res, 400, false, message.volunteerNotFound);
		}

		if (volunteer.resetPasswordLock > Date.now()) {
			volunteer.resetPassword = undefined;
			volunteer.resetPasswordExpire = undefined;
			volunteer.resetPasswordAttempts = 0;
			await volunteer.save();
			return Response(res, 400, false, message.otpAttemptsExceed);
		}

		if (volunteer.resetPasswordExpire < Date.now()) {
			volunteer.resetPassword = undefined;
			volunteer.resetPasswordExpire = undefined;
			volunteer.resetPasswordAttempts = 0;
			await volunteer.save();
			return Response(res, 400, false, message.otpExpire);
		}

		if (volunteer.resetPasswordAttempts >= process.env.MAX_RESET_ATTEMPTS) {
			volunteer.resetPassword = undefined;
			volunteer.resetPasswordExpire = undefined;
			volunteer.resetPasswordAttempts = 0;
			volunteer.resetPasswordLock = new Date(
				Date.now() + process.env.MAX_RESET_LOCK * 60 * 1000
			);
			await volunteer.save();
			return Response(res, 400, false, message.otpAttemptsExceed);
		}

		if (!otp) {
			return Response(res, 400, false, message.otpNotFound);
		}

		otp = Number(otp);

		if (volunteer.resetPassword !== otp) {
			volunteer.resetPasswordAttempts += 1;
			await volunteer.save();

			return Response(res, 400, false, message.invalidOtp);
		}

		volunteer.resetPassword = undefined;
		volunteer.resetPasswordAttempts = 0;
		volunteer.resetPasswordExpire = undefined;
		await volunteer.save();

		return Response(res, 200, true, message.otpVerified);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const changeVolunteerPassword = async (req, res) => {
	try {
		//params and cookie
		const { id } = req.params;
		const { password } = req.body;
		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFound);
		}
		//checking body data
		if (!password) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		let volunteer = await Volunteer.findById(id).select("+password");
		if (!volunteer) {
			return Response(res, 400, false, message.volunteerNotFound);
		}
		volunteer.password = password;
		await volunteer.save();
		//doing token null for logout
		res.cookie("token", null, {
			expires: new Date(Date.now()),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});

		Response(res, 200, true, message.passwordChange);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getVolunteerProfile = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const updateVolunteerProfile = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getVolunteerChats = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getChatsById = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getVolunteerRatings = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

// controller is for getting the requests from users
export const getRequestsOfUsers = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const deleteVolunteer = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
