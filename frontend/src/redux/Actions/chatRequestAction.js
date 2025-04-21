import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

const url = BACKEND_URL + "api/v1/request";


export const createChatRequest =(category, Topic, description) => async (dispatch) => {
		try {
			dispatch({
				type: "CREATE_CHAT_REQUEST",
			});
			const { data } = await axios.post(
				`${url}/create`,
				{
					category,
					Topic,
					description,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			dispatch({
				type: "CREATE_CHAT_SUCCESS",
				payload: {
					message: data.message,
					data: data.data,
				},
			});
		} catch (error) {
			dispatch({
				type: "CREATE_CHAT_FAILURE",
				payload: error?.response?.data?.message || "Something went wrong",
			});
		}
	};

export const getAllRequests = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ALL_REQUESTS_REQUEST",
		});
		const { data } = await axios.get(`${url}/all`, { withCredentials: true });
		dispatch({
			type: "GET_ALL_REQUESTS_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ALL_REQUESTS_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};

export const getRequestByUserId = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_REQUEST_BY_USER_ID_REQUEST",
		});
		const { data } = await axios.get(`${url}/user/${id}`, {
			withCredentials: true,
		});
        
		dispatch({
			type: "GET_REQUEST_BY_USER_ID_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
           
		});
	} catch (error) {
		dispatch({
			type: "GET_REQUEST_BY_USER_ID_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};

//here we have to add the things which we should send in backend
export const updateRequest = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "UPDATE_REQUEST_REQUEST",
		});
		const { data } = await axios.put(
			`${url}/update/${id}`,
			{},
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		dispatch({
			type: "UPDATE_REQUEST_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_REQUEST_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};

export const getRequestByCategory = (category) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_REQUEST_BY_CATEGORY_REQUEST",
		});

		const { data } = await axios.get(`${url}/category/${category}`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_REQUEST_BY_CATEGORY_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_REQUEST_BY_CATEGORY_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};

export const getRequestById = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "GET_REQUEST_BY_ID_REQUEST",
		});

		const { data } = await axios.get(`${url}/user/${id}`, {
			withCredentials: true,
		});
		dispatch({
			type: "GET_REQUEST_BY_ID_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_REQUEST_BY_ID_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};

export const deleteRequest = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "DELETE_REQUEST_REQUEST",
		});
		const { data } = await axios.delete(`${url}/delete/${id}`, {
			withCredentials: true,
		});
		dispatch({
			type: "DELETE_REQUEST_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "DELETE_REQUEST_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};

export const acceptRequest = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "ACCEPT_REQUEST_REQUEST",
		});
		const { data } = await axios.get(`${url}/accept/${id}`, {
			withCredentials: true,
		});
		dispatch({
			type: "ACCEPT_REQUEST_SUCCESS",
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: "ACCEPT_REQUEST_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};

export const getRequestsByVolunteerCategory = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_REQUESTS_BY_VOLUNTEER_CATEGORY_REQUEST" });

		const { data } = await axios.get(`${url}/volunteer-category`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_REQUESTS_BY_VOLUNTEER_CATEGORY_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_REQUESTS_BY_VOLUNTEER_CATEGORY_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};


export const updateRequestStatus = (id, status) => async (dispatch) => {
	try {
		dispatch({ type: "UPDATE_REQUEST_REQUEST" });

		const { data } = await axios.put(
			`${url}/update/${id}`,
			{ status },
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		dispatch({
			type: "UPDATE_REQUEST_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});

		
	} catch (error) {
		dispatch({
			type: "UPDATE_REQUEST_FAILURE",
			payload: error?.response?.data?.message || "Something went wrong",
		});
	}
};
