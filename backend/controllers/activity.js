import Activity from "../models/Activity.js";
import { Response } from "./../utils/response.js";
import { message } from "./../utils/message.js";

export const addContent = async (req, res) => {
	try {
		const { title, description, category, link, contentType, media } = req.body;
		if (!title || !description || !category || !contentType) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		const newContent = await Activity.create({
			title,
			description,
			category,
			author: req.user._id,
			link,
			contentType,
			media,
		});
		await newContent.save();
		Response(res, 201, true, message.contentCreated, newContent);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const deleteContent = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 400, false, message.invalidId);
		}

		const deletedActivity = await Activity.findByIdAndDelete(id);

		if (!deletedActivity) {
			return Response(res, 404, false, message.contentNotFound);
		}
		Response(res, 200, true, message.contentDeleted);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const updateById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 400, false, message.invalidId);
		}
		const updatedContent = await Activity.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedContent) {
			return Response(res, 404, false, message.contentNotFound);
		}
		Response(
			res,
			200,
			true,
			message.contentUpdatedSuccessfully,
			updatedContent
		);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllContent = async (req, res) => {
	try {
		const content = await Activity.find().populate("author", "_id username");
		Response(res, 200, true, message.contentFetchSuccessfully, content);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getContentByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		const content = await Activity.find({ category: category }).populate(
			"author",
			"_id username"
		);
		if (!content || content.length === 0) {
			return Response(res, 404, false, message.contentNotFound);
		}
		Response(res, 200, true, message.contentFetchSuccessfully, content);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getContentById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 400, false, message.invalidId);
		}
		const content = await Activity.findById(id);

		if (!content) {
			return Response(res, 404, false, message.contentNotFound);
		}
		Response(res, 200, true, message.contentFetchSuccessfully, content);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
