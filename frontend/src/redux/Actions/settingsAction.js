import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

const URL = BACKEND_URL + "api/v1/admin";

export const getSettings = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_SETTINGS_REQUEST" });

		const { data } = await axios.get(`${URL}/settings`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_SETTINGS_SUCCESS",
			payload: {
				settings: data.settings,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_SETTINGS_FAILURE",
			payload: error.response?.data?.message || "Failed to fetch settings",
		});
	}
};

export const updateSettings = (settings) => async (dispatch) => {
	try {
		dispatch({ type: "UPDATE_SETTINGS_REQUEST" });

		const { data } = await axios.put(`${URL}/settings`, settings, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		dispatch({
			type: "UPDATE_SETTINGS_SUCCESS",
			payload: {
				settings: data.settings,
				message: data.message,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_SETTINGS_FAILURE",
			payload: error.response?.data?.message || "Failed to update settings",
		});
	}
};
