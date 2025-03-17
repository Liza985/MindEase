import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

///backend_url imported from constants
const url = BACKEND_URL + "api/v1/blog";

export const createBlog = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "CREATE_BLOG_REQUEST",
		});
		const { data } = await axios.post(`${url}/create`, details, {
			headers: {
				"content-Type": "application/json",
			},
			withCredentials: true,
		});
		dispatch({
			type: "CREATE_BLOG_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "CREATE_BLOG_FAILURE",
			payload: error.response?.data?.message|| "Something went wrong",
		});
	}
};

export const getAllBlogs = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ALL_BLOGS_REQUEST",
		});

		const { data } = await axios.get(`${url}/all`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_ALL_BLOGS_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ALL_BLOGS_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const getBlogsById = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_BLOGS_BY_ID_REQUEST",
		});

		const { data } = await axios.get(`${url}/${id}`, {
			withCredentials: true,
		});
		dispatch({
			type: "GET_BLOGS_BY_ID_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_BLOGS_BY_ID_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const getBlogsByVolunteer = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_BLOGS_BY_VOLUNTEER_REQUEST",
		});

		const { data } = await axios.get(`${url}/volunteer`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_BLOGS_BY_VOLUNTEER_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_BLOGS_BY_VOLUNTEER_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const deleteBlog = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "DELETE_BLOG_REQUEST",
		});
		const { data } = await axios.delete(`${url}/delete/${id}`, {
			withCredentials: true,
		});
		dispatch({
			type: "DELETE_BLOG_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "DELETE_BLOG_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const getBlogByTopic = (topic) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_BLOGS_BY_TOPIC_REQUEST",
		});

		const { data } = await axios.get(`${url}/${topic}`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_BLOGS_BY_TOPIC_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_BLOGS_BY_TOPIC_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};

export const updateBlog = (id,details) => async (dispatch) => {
	try {
		dispatch({
			type: "UPDATE_BLOG_REQUEST",
		});

		const { data } = await axios.put(`${url}/update/${id}`,details, {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		});

		dispatch({
			type: "UPDATE_BLOG_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_BLOG_FAILURE",
			payload: error?.response?.data?.message|| "Something went wrong",
		});
	}
};
