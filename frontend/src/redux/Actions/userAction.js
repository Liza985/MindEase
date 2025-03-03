import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

///backend_url imported from constants
const URL = BACKEND_URL + "api/v1/user";

export const loginUser = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_LOGIN_REQUEST",
		});

		const { data } = await axios.post(
			`${URL}/login`,
			details,
			{
				headers: {
					"content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		console.log(data);

		dispatch({
			type: "USER_LOGIN_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "USER_LOGIN_FAILURE",
			payload: error.response?.data?.message,
		});
	}
};

export const registerUser = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_REGISTER_REQUEST",
		});
		console.log("working2");
		console.log(details);
		const { data } = await axios.post(`${URL}/register`, details, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});
		console.log(data);
		dispatch({
			type: "USER_REGISTER_SUCCESS",
			payload: {
				message: data.message,
				id: data.data._id,
			},
		});
	} catch (error) {
		console.log(error?.response?.data?.message);
		dispatch({
			type: "USER_REGISTER_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const verifyRegisterOtp = (id, otp) => async (dispatch) => {
	try {
		dispatch({
			type: "REGISTER_OTP_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/verify/${id}`,
			{ otp },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "REGISTER_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "REGISTER_OTP_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const resendRegisterOtp = (id) => async (dispatch) => {
	try {
		dispatch({
			type: "RESEND_REGISTER_OTP_REQUEST",
		});
		// console.log(id)
		const { data } = await axios.get(`${URL}/resend/${id}`);
		dispatch({
			type: "RESEND_REGISTER_OTP_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESEND_REGISTER_OTP_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const forgotUserPassword = (email) => async (dispatch) => {
	try {
		dispatch({
			type: "FORGOT_USER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/forgetPassword`,
			{ email },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "FORGOT_USER_PASSWORD_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "FORGOT_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const resetUserPassword = (id, otp) => async (dispatch) => {
	try {
		dispatch({
			type: "RESET_USER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/resetPassword/${id}`,
			{ otp },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		dispatch({
			type: "RESET_USER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "RESET_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const changeUserPassword = (id, password) => async (dispatch) => {
	try {
		dispatch({
			type: "CHANGE_USER_PASSWORD_REQUEST",
		});
		const { data } = await axios.post(
			`${URL}/changePassword/${id}`,
			{ password },
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		console.log(data);
		dispatch({
			type: "CHANGE_USER_PASSWORD_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "CHANGE_USER_PASSWORD_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};
