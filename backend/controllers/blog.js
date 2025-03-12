import Blog from "../models/Blog";
import { Response } from "../utils/response";
import { message } from "./../utils/message";

export const createBlog = async (req, res) => {
	try {
		const { image, title, topic, description, body } = req.body;
		if (!image || !title || !topic || !description || !body) {
			return Response(res, 400, false, message.missingFieldMessage);
		}
		let res;
		if (image) {
			res = await cloudinary.v2.uploader.upload(image, {
				folder: "blog",
			});
		}

		const newBlog = await Blog.create({
            volunteerId:req.volunteer._id,
			image: {
				public_id: res?.public_id,
				url: res?.secure_url,
			},
			title,
			topic,
			description,
			body,
		});
        Response(res,201,true,message.createBlogMessage,newBlog)
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllBlogs = async (req, res) => {
	try {
        const blogs=await Blog.find();

        Response(res,200,true,message.blogsFetchSuccessfulMessage,blogs)

	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getBlogsById = async (req, res) => {
	try {

        const {id}=req.params;
        if(!id){
            return Response(res,400,false,message.idNotFound)
        }
        const blog=await Blog.findById(id);
        if(!blog){
            return Response(res,404,false,message.blogNotFoundMessage)
        }
        Response(res,200,true,message.blogsFetchSuccessfulMessage,blog)
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getBlogsByVolunteer = async (req, res) => {
	try {
        const {id}=req.volunteer._id;
        const blogs=await Blog.find({volunteerId:id});
        if(!blogs){
            return Response(res,404,false,message.blogNotFoundMessage)
        }
        Response(res,200,true,message.blogsFetchSuccessfulMessage,blogs)
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const deleteBlog = async (req, res) => {
	try {
        const {id}=req.params;
        if(!id){
            return Response(res,400,false,message.idNotFound);
        }
        const {volId} = req.volunteer._id;
        
        const blog =await Blog.findById(id);
        if(!blog){
            return Response(res,404,false,message.blogNotFoundMessage)
        }
        if(blog.volunteerId.toString()!==volId.toString()){
            return Response(res,401,false,message.unAuthorized)
        }
        const deletedBlog=await Blog.findByIdAndDelete(id);
        Response(res,200,true,message.blogDeletedMessage)
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getBlogByTopic = async (req, res) => {
	try {
        const {topic}=req.params;
        if(!topic){
            return Response(res,400,false,message.missingFieldMessage)
        }
        const blogs=await Blog.find({topic:topic});
        if(!blogs){
            return Response(res,404,false,message.blogNotFoundMessage)
        }

        Response(res,200,true,message.blogsFetchSuccessfulMessage,blogs)
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
//yet to make
export const updateBlog = async (req, res) => {
	try {
        const {id}=req.params;
       
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};


