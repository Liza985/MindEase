import { Response } from "../utils/response.js";
import Survey from "../models/Survey.js";

export const createSurvey = async (req, res) => {
	try {
		const { questions, result } = req.body;
		// console.log("Received request body:", req.body);
		// console.log("User ID from auth:", req.user?._id);

		if (!questions || !result) {
			// console.log("Missing required fields:", {
			// 	hasQuestions: !!questions,
			// 	hasResult: !!result,
			// });
			return Response(res, 400, false, "Missing required fields");
		}

		// Validate result structure
		const hasValidStructure =
			result.prediction &&
			typeof result.confidence === "number" &&
			result.categoryScores &&
			typeof result.overallPercentage === "number";

		console.log("Result structure validation:", {
			hasPrediction: !!result.prediction,
			hasConfidence: typeof result.confidence === "number",
			hasCategoryScores: !!result.categoryScores,
			hasOverallPercentage: typeof result.overallPercentage === "number",
		});

		if (!hasValidStructure) {
			return Response(res, 400, false, "Invalid result structure");
		}

		// Check for recent submission (within last 5 minutes)
		const recentSurvey = await Survey.findOne({
			userId: req.user._id,
			createdAt: { $gt: new Date(Date.now() - 5 * 60 * 1000) },
		});

		if (recentSurvey) {
			return Response(
				res,
				429,
				false,
				"Please wait before submitting another survey",
			);
		}

		// Create survey with detailed error catching
		try {
			const survey = await Survey.create({
				userId: req.user._id,
				questions,
				result,
			});
			// console.log("Survey created successfully:", survey._id);

			// Add survey reference to user
			if (!req.user.surveyResponses) {
				req.user.surveyResponses = [];
			}

			// Ensure we don't add duplicate references
			if (!req.user.surveyResponses.includes(survey._id)) {
				req.user.surveyResponses.push(survey._id);
				await req.user.save();
				// console.log("User updated with survey reference");
			}

			return Response(res, 201, true, "Survey created successfully", survey);
		} catch (dbError) {
			console.error("Database error during survey creation:", {
				name: dbError.name,
				message: dbError.message,
				code: dbError.code,
			});
			throw dbError;
		}
	} catch (error) {
		console.error("Survey creation error:", {
			name: error.name,
			message: error.message,
			stack: error.stack,
		});
		return Response(
			res,
			500,
			false,
			error.message || "Failed to create survey",
		);
	}
};

export const getAllSurveys = async (req, res) => {
	try {
		const surveys = await Survey.find().sort({ createdAt: -1 });

		return Response(res, 200, true, "Surveys retrieved successfully", surveys);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getSurveyById = async (req, res) => {
	try {
		const { id } = req.params;

		const survey = await Survey.findById(id);

		if (!survey) {
			return Response(res, 404, false, "Survey not found");
		}

		return Response(res, 200, true, "Survey retrieved successfully", survey);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getSurveyByUserId = async (req, res) => {
	try {
		const surveys = await Survey.find({ userId: req.user._id });

		if (!surveys || surveys.length === 0) {
			return Response(res, 404, false, "No surveys found for this user");
		}

		return Response(res, 200, true, "Surveys retrieved successfully", surveys);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
