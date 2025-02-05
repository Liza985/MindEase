import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const volunteerSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		firstName: {
			type: String,
			required: true,
		},
		middleName: {
			type: String,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
			minlength: [8, "Password must be of at least 8 characters"],
		},
		dateOfBirth: {
			type: Date,
			required: true,
			default: Date.now,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female", "other"],
		},
		PhoneNumber: {
			type: Number,
			minlength: 10,
		},
		expertiseAreas: [{ type: String }],
		availability: {
			daysAvailable: [{ type: String }],
			timeSlots: [
				{
					start: { type: String },
					end: { type: String },
				},
			],
		},
		ratings: [
			{
				userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
				rating: { type: Number, min: 1, max: 5 },
				feedback: { type: String },
			},
		],
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPassword: {
			type: Number,
		},
		resetPasswordExpire: {
			type: Date,
		},
		resetPasswordAttempts: {
			type: Number,
			default: 0,
		},
		resetPasswordLock: {
			type: Date,
		},
		registerOtp: {
			type: Number,
		},
		registerOtpExpire: {
			type: Date,
		},
		registerOtpAttempts: {
			type: Number,
			default: 0,
		},
		registerOtpLockUntil: {
			type: Date,
		},
		loginOtp: {
			type: Number,
		},
		loginOtpAttempts: {
			type: Number,
			default: 0,
		},
		loginOtpAttemptsExpire: {
			type: Date,
		},
		lockUntil: {
			type: Date,
		},
		loginOtpExpire: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

volunteerSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = bcrypt.hash(this.password, salt);
	next();
});

volunteerSchema.methods.generateToken = async function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

volunteerSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
