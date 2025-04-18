import Blog from "../models/Blog.js";
import Volunteer from "../models/volunteer.js";
import { Response } from "../utils/response.js";
import { message } from "./../utils/message.js";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
	try {
		const { image, title, topic, description, body } = req.body;
		if (!title || !topic || !description || !body) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		let result;
		if (image) {
			result = await cloudinary.v2.uploader.upload(image, {
				folder: "blog",
			});
		}
		const newBlog = await Blog.create({
			volunteerId: req.volunteer._id,
			image: {
				public_id: result?.public_id,
				url: result?.secure_url,
			},
			title,
			topic,
			description,
			body,
		});
		Volunteer.findByIdAndUpdate(req.volunteer._id, {
			$push: { blogs: newBlog._id },
		}).exec();
		Response(res, 201, true, message.createBlogMessage, newBlog);
	} catch (error) {
		console.log(error);
		Response(res, 500, false, error.message);
	}
};

export const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find().populate(
			"volunteerId",
			"firstName lastName"
		);

		Response(res, 200, true, message.blogsFetchSuccessfulMessage, blogs);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getBlogsById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 400, false, message.idNotFound);
		}
		const blog = await Blog.findById(id).populate(
			"volunteerId",
			"firstName lastName"
		);
		if (!blog) {
			return Response(res, 404, false, message.blogNotFoundMessage);
		}
		Response(res, 200, true, message.blogsFetchSuccessfulMessage, blog);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getBlogsByVolunteer = async (req, res) => {
	try {
		const blogs = await Blog.find({ volunteerId: req.volunteer._id }).populate(
			"volunteerId",
			"firstName lastName"
		);
		if (!blogs) {
			return Response(res, 404, false, message.blogNotFoundMessage);
		}
		Response(res, 200, true, message.blogsFetchSuccessfulMessage, blogs);
	} catch (error) {
		console.log(error.message);
		Response(res, 500, false, error.message);
	}
};

export const deleteBlog = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return Response(res, 400, false, message.idNotFound);
		}

		const volId = req.volunteer._id;

		const blog = await Blog.findById(id);
		if (!blog) {
			return Response(res, 404, false, message.blogNotFoundMessage);
		}

		if (blog.volunteerId.toString() !== volId.toString()) {
			return Response(res, 401, false, message.unAuthorized);
		}

		// Extract image public ID from Cloudinary URL
		const imageUrl = blog.image; // Assuming blog.image stores the Cloudinary image URL
		if (imageUrl) {
			const publicId = imageUrl.public_id;
			await cloudinary.v2.uploader.destroy(publicId);
		}

		await Blog.findByIdAndDelete(id);
		Response(res, 200, true, message.blogDeletedMessage);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getBlogByTopic = async (req, res) => {
	try {
		const { topic } = req.params;
		if (!topic) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		const blogs = await Blog.find({ topic: topic }).populate(
			"volunteerId",
			"firstName lastName"
		);
		if (!blogs) {
			return Response(res, 404, false, message.blogNotFoundMessage);
		}

		Response(res, 200, true, message.blogsFetchSuccessfulMessage, blogs);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
//yet to make
export const updateBlog = async (req, res) => {
	try {
		const { id } = req.params;
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
