import { sendEMail } from "../middlewares/sendMail";
import User from "../models/user";
import { message } from "../utils/message";
import { Response } from "../utils/response";
import fs from "fs"
import path from "path"


export const registerUser = async (req,res) => {
    try{
        const{
            firstName,
            middleName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
            PhoneNumber,
            isVolunteer, 
        } = req.body;

        //check body data 
        console.log("workig");
        if(
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !dateOfBirth ||
            !gender ||
            !PhoneNumber 
        ) {
            return Response(res, 400, false, message.missingFieldMessage);
        }

        //checking user
        let user = await User.findOne({email});
        if(user){
            return Response(res, 400, false, message.userAlreadyExist)
        }

        user = await User.findOne({username});
        user = await User.create({ ...req.body })

        //generating otp
        const otp = Math.floor(100000 + Math.random() * 900000)
        const otpExpire = new Date(Date.now() + 5 * 60 * 1000)
        user.registerOtp = otp
        user.registerOtpExpire = otpExpire

        //save user 
        await user.save()

        //verification email
        let emailTemplate = fs.readFileSync(
            path.join(__dirname, "../templates/mail.html"),
            "utf-8"
        );
        const subject = "Verify your account";
        emailTemplate = emailTemplate.replace("{{OTP_CODE}}",otp);
        emailTemplate = emailTemplate.replaceAll("{{MAIL}}",process.env.SMTP_USER);
        emailTemplate = emailTemplate.replace("{{PORT}}",process.env.PORT);
        emailTemplate = emailTemplate.replace("{{USER_ID}}",user._id.toString());
        await sendEMail({ email, subject, html: emailTemplate});

        //create user
        Response(res, 200, true, message?.userCreatedMessage, user);

        //send response
    } catch(error){
        Response(res,500,error?.message);
    }
};

export const verifyUser = async(req, res) => {
    try{
        //fetching id and otp 
        const{ id } = req.params
        let { otp } = req.body

        //checking id
        if(!id){
            return Response(res, 404, false, message.idNotFound);
        }
        //finding user
        let user = await User.findById(id);
        //if user exist or not
        if(!user){
            return Response(res, 404, false, message.userNotFound);
        }
        // user already verified 
        if(user.isVerified){
            return Response(res, 400, false, message.userAlreadyVerified);
        }

        // otp attempt lock or not 
        if(user.registerOtpLockUntil > Date.now()) {
            user.registerOtp = undefined;
            user.registerOtpExpire = undefined;
            user.registerOtpAttempts = 0;
            await user.save()
            return Response(
                res,
                400,
                false,
                `Try again after ${Math.floor(
                    (user.registerOtpLockUntil -Date.now()) % (60 *1000)
                )} minutes and ${Math.floor(
                    (user.registerOtpLockUntil - DESTRUCTION.now()) % 1000
                )} seconds`
            );
        }

        // checking otp attempts
        if (user.registerOtpAttempts >= 3) {
            user.registerOtp = undefined;
            user.registerOtpExpire = undefined;
            user.registerOtpAttempts = 0;
            user.registerOtpLockUntil = 
                Date.now() + process.env.REGISTER_OTP_LOCK * 60 *1000;
                await user.save();
                return Response(res, 400, false, message.otpAttemptsExceed);
        }
        // check otp 
        if(!otp){
            user.registerOtpAttempts +=1;
            await user.save();
            return Response(res, 400, false, message.otpNotFound);
        }
        // check otp expire 
        if (user.registerOtpExpire < Date.now()) {
			user.registerOtp = undefined;
			user.registerOtpAttempts = 0;
			user.registerOtpLockUntil = undefined;
			await user.save();
			return Response(res, 400, false, message.otpExpire);
		}
        // update user 
        user.isVerified = true;
        user.registerOtp = undefined;
		user.registerOtpExpire = undefined;
		user.registerOtpAttempts = 0;
		user.registerOtpLockUntil = undefined;
		await user.save();
        // authenticate user
        const token = await user.generateToken();
		const options = {
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			sameSite: "none",
			secure: true,
		};
        // sending response 
        res.status(200).cookie("token", token, options).json({
            success: true,
            message: message.userVerified,
            data: user,
        });
    } catch(error){
        return Response(res, 500, false, error.message);
    }
};

export const resendOtp = async (req, res) => {
	try {
		//params and body
		const { id } = req.params;
		//checking id
		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}
		//user exist or not
		let user = await User.findById(id);
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}

		//user already verified
		if (user.isVerified) {
			return Response(res, 400, false, message.userAlreadyVerified);
		}
		//generate new otp
		const otp = Math.floor(100000 + Math.random() * 900000);
		const otpExpire = new Date(
			Date.now() + process.env.REGISTER_OTP_EXPIRE * 15 * 60 * 1000
		);
		//save otp
		user.registerOtp = otp;
		user.registerOtpExpire = otpExpire;
		user.registerOtpAttempts = 0;
		await user.save();
		//send otp

		let emailTemplate = fs.readFileSync(
			path.join(__dirname, "../templates/mail.html"),
			"utf-8"
		);
		const subject = "Verify your account";

		emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
		emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace("{{USER_ID}}", user._id.toString());

		await sendEMail({ email: user.email, subject, html: emailTemplate });
		//send response
		Response(res, 200, true, message.otpSendMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const loginUser = async (req, res) => {
	try {
		//params and body
		const { email, password } = req.body;
		//checking data
		if (!email || !password) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		//find user
		let user = await User.findOne({ email }).select("+password");
		//user exist aur not
		if (!user) {
			return Response(res, 400, false, message.userNotFoundMessage);
		}

		//user is verified or not
		if (!user.isVerified) {
			return Response(res, 400, false, message.userNotVerified);
		}
		//login attempt locked or not
		if (user.lockUntil < Date.now()) {
			user.loginAttempts = 0;
			await user.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}
		//login attempt exceeded or not
		if (user.loginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
			user.loginAttempts = 0;
			user.lockUntil = new Date(
				Date.now() + process.env.MAX_LOGIN_ATTEMPTS_EXPIRE * 60 * 1000
			);
			await user.save();
			return Response(res, 400, false, message.loginLockedMessage);
		}
		//check password
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			user.loginAttempts += 1;
			await user.save();
			return Response(res, 400, false, message.badAuthMessage);
		}

		user.loginAttempts = 0;
		user.lockUntil = undefined;
		await user.save();
		//authenticate user
		const token = await user.generateToken();
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
			message: message.loginSuccessfull,
			data: user,
		});
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const forgetPassword = async(req, res) => {
    try{
        // parse data 
        const { email } = req.body;

        //checking data
        if(!email){
            return Response(res, 400, false, message.missingFieldMessage);
        }

        //checking user
        let user = await User.findOne({email});
        if(!user){
            return Response(res, 400, false, message.userNotFound);
        }

        //generate otp for reset 
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpire = new Date(
            Date.now() + process.env.OTP_EXPIRE * 15 * 60 * 1000
        );

        let emailTemplate = fs.readFileSync(
            path.join(__dirname, "../templates/mail.html"),
        );
        const subject = "Reset your password";
        //const body = `Your OTP is ${otp}`;

        emailTemplate = emailTemplate.replace("{{OTP_CODE}}", otp);
        emailTemplate = emailTemplate.replaceAll("{{MAIL}}", process.env.SMTP_USER);
		emailTemplate = emailTemplate.replace("{{PORT}}", process.env.PORT);
		emailTemplate = emailTemplate.replace("{{USER_ID}}", user._id.toString());

        await sendEMail({ email: user.email , subject, html: emailTemplate});

        //save values
        user.resetPassword = otp;
        user.resetPasswordExpire = otpExpire;
        await user.save();

        //send response 
        Response(res, 200, true, message.otpSendMessage, user._id);

    } catch (error){
        Response(res, 500, false, error.message);
    }
};

export const resetPassword = async (req, res) => {
	try {
		//parsing the data
		const { id } = req.params;
		let { otp } = req.body;
		//checking the id
		if (!id) {
			return Response(res, 400, false, message.userNotFound);
		}

		//checking user
		let user = await User.findById(id);
		if (!user) {
			return Response(res, 400, false, message.userNotFound);
		}
		// otp check
		if (user.resetPasswordLock < Date.now()) {
			user.resetPassword = undefined;
			user.resetPasswordExpire = undefined;
			user.resetPasswordAttempts = 0;
			await user.save();
			return Response(res, 400, false, message.otpAttemptsExceed);
		}

		if (user.resetPasswordExpire < Date.now()) {
			user.resetPassword = undefined;
			user.resetPasswordExpire = undefined;
			user.resetPasswordAttempts = 0;
			await user.save();
			return Response(res, 400, false, message.otpExpire);
		}

		if (user.resetPasswordAttempts >= process.env.MAX_RESET_ATTEMPTS) {
			user.resetPassword = undefined;
			user.resetPasswordExpire = undefined;
			user.resetPasswordAttempts = 0;
			user.resetPasswordLock = new Date(
				Date.now() + process.env.MAX_RESET_LOCK * 60 * 1000
			);
			await user.save();
			return Response(res, 400, false, message.otpAttemptsExceed);
		}
		5;
		if (!otp) {
			return Response(res, 400, false, message.otpNotFound);
		}

		otp = Number(otp);

		//matching otp
		if (user.resetPassword !== otp) {
			user.resetPasswordAttempts += 1;
			await user.save();

			return Response(res, 400, false, message.invalidOtp);
		}

		user.resetPassword = undefined;
		user.resetPasswordAttempts = 0;
		user.resetPasswordExpire = undefined;
		await user.save();

		return Response(res, 200, true, message.otpVerified);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const changePassword = async (req, res) => {
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
		let user = await User.findById(id).select("+password");
		if (!user) {
			return Response(res, 400, false, message.userNotFound);
		}
		user.password = password;
		await user.save();
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

export const logoutUser = async(req, res) => {
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        Response(res, 200, true, message.logoutMessage);
    } catch(error){
        Response(res, 500, false, error.message);
    }
}