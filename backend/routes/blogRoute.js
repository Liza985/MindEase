import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogByTopic, getBlogsById, getBlogsByVolunteer, updateBlog } from "../controllers/blog.js";
import { isVolAuthenticated } from './../middlewares/volAuth.js';
import { isAuthenticated } from './../middlewares/auth.js';


const blogRouter = express.Router();

blogRouter.post("/create",isVolAuthenticated,createBlog);
blogRouter.get("/all",isAuthenticated,getAllBlogs);
blogRouter.get("/volunteer",isVolAuthenticated,getBlogsByVolunteer);
blogRouter.get("/:id",getBlogsById);
blogRouter.delete("/delete/:id",isVolAuthenticated,deleteBlog);
blogRouter.get("/:topic",isAuthenticated,getBlogByTopic);
blogRouter.put("/update/:id",isVolAuthenticated,updateBlog);

export default blogRouter;
