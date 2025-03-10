import feedback from "../models/feedback";
import { message } from "../utils/message";
import { Response } from "../utils/response";

export const CreateFeedBack = async (req, res) => {
	try {
		const { rating, feedback } = req.body;
		if (!rating || !feedback) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		const newFeedBack = await feedback.create({
			userId: req.user._id,
			rating,
			feedback,
		});
		Response(res, 201, true, message.createFeedBackMessage, newFeedBack);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllFeedBacks = async (req, res) => {
	try {
		const feedbacks = await feedback.find();
		Response(res, 200, true, message.feedBackFetchSuccessfulMessage, feedbacks);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const deleteFeedBack = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 400, false, message.idNotFound);
		}
		const feedBack = await feedback.findByIdAndDelete(id);
		if (!feedBack) {
			return Response(res, 404, false, message.feedBackNotFoundMessage);
		}
		Response(res, 200, true, message.feedBackDeleteMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
