import { Response } from "../utils/response.js";
import Survey from "../models/Survey.js";

export const createSurvey = async (req, res) => {
    try {
        const {questions, result } = req.body;
        
        if (!questions || !result) {
            return Response(res, 400, false, "Missing required fields");
        }
		
        const survey = await Survey.create({
            userId: req.user._id,
            questions,
            result
        });
		req.user.surveyResponses.push(survey._id);
		await req.user.save();
        return Response(res, 201, true, "Survey created successfully", survey);
    } catch (error) {
        Response(res, 500, false, error.message);
    }
};

export const getAllSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find()
            .sort({ createdAt: -1 });
        
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
