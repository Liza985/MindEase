import jwt from "jsonwebtoken";
import { Response } from "../utils/response.js";
import { message } from "../utils/message.js";
import Volunteer from "../models/volunteer.js";

export const isVolAuthenticated = async (req, res, next) => {
	try {
		//parsing cookies
		const { token } = req.cookies;
		
		if (!token) {
			return Response(res, 401, false, message.unAuthorized);
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const volunteer = await Volunteer.findById(decoded.id);

		if (!volunteer) {
			return Response(res, 400, false, message.unAuthorized);
		}


		req.volunteer = volunteer;
		
		next();
	} catch (error) {
		console.log(error);
		Response(res, 500, false, error.message);
	}
};
