import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const createBlogRequest = createAction("CREATE_BLOG_REQUEST");
const createBlogSuccess = createAction("CREATE_BLOG_SUCCESS");
const createBlogFailure = createAction("CREATE_BLOG_FAILURE");

const getAllBlogsRequest = createAction("GET_ALL_BLOGS_REQUEST");
const getAllBlogsSuccess = createAction("GET_ALL_BLOGS_SUCCESS");
const getAllBlogsFailure = createAction("GET_ALL_BLOGS_FAILURE");

const getBlogsByIdRequest = createAction("GET_BLOGS_BY_ID_REQUEST");
const getBlogsByIdSuccess = createAction("GET_BLOGS_BY_ID_SUCCESS");
const getBlogsByIdFailure = createAction("GET_BLOGS_BY_ID_FAILURE");

const getBlogsByVolunteerRequest = createAction(
	"GET_BLOGS_BY_VOLUNTEER_REQUEST",
);
const getBlogsByVolunteerSuccess = createAction(
	"GET_BLOGS_BY_VOLUNTEER_SUCCESS",
);
const getBlogsByVolunteerFailure = createAction(
	"GET_BLOGS_BY_VOLUNTEER_FAILURE",
);

const deleteBlogRequest = createAction("DELETE_BLOG_REQUEST");
const deleteBlogSuccess = createAction("DELETE_BLOG_SUCCESS");
const deleteBlogFailure = createAction("DELETE_BLOG_FAILURE");

const getBlogByTopicRequest = createAction("GET_BLOGS_BY_TOPIC_REQUEST");
const getBlogByTopicSuccess = createAction("GET_BLOGS_BY_TOPIC_SUCCESS");
const getBlogByTopicFailure = createAction("GET_BLOGS_BY_TOPIC_FAILURE");

const updateBlogRequest = createAction("UPDATE_BLOG_REQUEST");
const updateBlogSuccess = createAction("UPDATE_BLOG_SUCCESS");
const updateBlogFailure = createAction("UPDATE_BLOG_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const blogReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(createBlogRequest, (state) => {
			state.loading = true;
		})
		.addCase(createBlogSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.blog = action.payload.data;
		})
		.addCase(createBlogFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getAllBlogsRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllBlogsSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.blogs = action.payload.data;
		})
		.addCase(getAllBlogsFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getBlogsByIdRequest, (state) => {
			state.loading = true;
		})
		.addCase(getBlogsByIdSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.blogById = action.payload.data;
		})
		.addCase(getBlogsByIdFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getBlogsByVolunteerRequest, (state) => {
			state.loading = true;
		})
		.addCase(getBlogsByVolunteerSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.volBlogs = action.payload.data;
		})
		.addCase(getBlogsByVolunteerFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(deleteBlogRequest, (state) => {
			state.loading = true;
		})
		.addCase(deleteBlogSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(deleteBlogFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getBlogByTopicRequest, (state) => {
			state.loading = true;
		})
		.addCase(getBlogByTopicSuccess, (state, action) => {
			state.loading = false;
			state.topicBlog = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getBlogByTopicFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(updateBlogRequest, (state) => {
			state.loading = true;
		})
		.addCase(updateBlogSuccess, (state, action) => {
			state.loading = false;
			state.updateBlog = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(updateBlogFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(clearError, (state) => {
			state.error = null;
		})
		.addCase(clearMessage, (state) => {
			state.message = null;
		});
});
