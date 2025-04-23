import Activity from "../models/Activity.js";
import { Response } from "./../utils/response.js";
import { message } from "./../utils/message.js";
import cloudinary from "cloudinary"; // adjust if located differently

export const addContent = async (req, res) => {
	try {
		const { title, description, category, link, contentType } = req.body;

		if (!title || !description || !category || !contentType) {
			return Response(res, 400, false, message.missingFieldMessage);
		}

		let media = { public_id: "", url: "" };

		// Upload media to cloudinary if file is present
		if (req.file) {
			const uploadResult = await cloudinary.uploader.upload(req.file.path, {
				folder: "activity-content",
			});
			media.public_id = uploadResult.public_id;
			media.url = uploadResult.secure_url;
		}

		const newContent = await Activity.create({
			title,
			description,
			category,
			link,
			contentType,
			media,
			author: "admin", // fixed author
		});

		Response(res, 201, true, message.contentCreated, newContent);
	} catch (error) {
		console.log(error.message);
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
		const content = await Activity.find(); // removed populate
		Response(res, 200, true, message.contentFetchSuccessfully, content);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getContentByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		const content = await Activity.find({ category });

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
