import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

const url = BACKEND_URL + "api/v1/feedback";

export const createUserFeedback = (feedbackData) => async (dispatch) => {
	try {
		dispatch({
			type: "CREATE_USER_FEEDBACK_REQUEST",
		});

		const { data } = await axios.post(`${url}/create`, feedbackData, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		dispatch({
			type: "CREATE_USER_FEEDBACK_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "CREATE_USER_FEEDBACK_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const getAllUserFeedbacks = () => async (dispatch) => {
	try {
		dispatch({
			type: "GET_ALL_USER_FEEDBACKS_REQUEST",
		});

		const { data } = await axios.get(`${url}/all`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_ALL_USER_FEEDBACKS_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ALL_USER_FEEDBACKS_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};
