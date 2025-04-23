import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

///backend_url imported from constants
const url = BACKEND_URL + "api/v1/chat";

//incomplete
export const createChat = (id) => async (dispatch) => {
	try {
		dispatch({ type: "CREATE_CHAT_REQUEST" });

		const { data } = await axios.post(
			`${url}/create`,
			{ id },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);

		dispatch({
			type: "CREATE_CHAT_SUCCESS",
			payload: {
				data: data.data,
				message: data.message,
			},
		});
	} catch (error) {
		dispatch({
			type: "CREATE_CHAT_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const getUserChat = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_USER_CHAT_REQUEST" });

		const { data } = await axios.get(`${url}/user/chats`, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		dispatch({
			type: "GET_USER_CHAT_SUCCESS",
			payload: {
				data: data.data,
				message: data.message,
			},
		});
	} catch (error) {
		console.log(error.response.data.message);
		dispatch({
			type: "GET_USER_CHAT_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const getVolunteerChat = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_VOLUNTEER_CHAT_REQUEST" });

		const { data } = await axios.get(`${url}/volunteer/chats`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_VOLUNTEER_CHAT_SUCCESS",
			payload: {
				data: data.data,
				message: data.message,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_VOLUNTEER_CHAT_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const getChatById = (id) => async (dispatch) => {
	try {
		dispatch({ type: "GET_CHAT_BY_ID_REQUEST" });
		const { data } = await axios.get(`${url}/${id}`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_CHAT_BY_ID_SUCCESS",
			payload: {
				data: data.data,
				message: data.message,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_CHAT_BY_ID_FAILURE",
			payload: error.response.data.message,
		});
	}
};

export const updateChatStatus = (id, status) => async (dispatch) => {
	try {
		dispatch({ type: "UPDATE_CHAT_STATUS_REQUEST" });

		const { data } = await axios.patch(
			`${url}/chat/${id}/status`,
			{ status },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);

		dispatch({
			type: "UPDATE_CHAT_STATUS_SUCCESS",
			payload: {
				data: data.data,
				message: data.message,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_CHAT_STATUS_FAILURE",
			payload: error.response.data.message,
		});
	}
};
