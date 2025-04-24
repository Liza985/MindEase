import axios from "axios";
import { BACKEND_URL } from "../../constants/url";

///backend_url imported from constants
const URL = BACKEND_URL + "api/v1/user";

export const loginUser = (details) => async (dispatch) => {
	try {
		dispatch({
			type: "USER_LOGIN_REQUEST",
		});

		const { data } = await axios.post(`${URL}/login`, details, {
			headers: {
				"content-Type": "application/json",
			},
			withCredentials: true,
		});

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

		const { data } = await axios.post(`${URL}/register`, details, {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		});

		dispatch({
			type: "USER_REGISTER_SUCCESS",
			payload: {
				message: data.message,
				id: data.data._id,
			},
		});
	} catch (error) {
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
			},
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
			},
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
			},
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
			},
		);

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

export const logoutUser = () => async (dispatch) => {
	try {
		dispatch({
			type: "LOGOUT_USER_REQUEST",
		});
		const { data } = await axios.post(`${URL}/logout`, {
			withCredentials: true,
		});
		dispatch({
			type: "LOGOUT_USER_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "LOGOUT_USER_FAILURE",
			payload: error?.response?.data?.message,
		});
	}
};

export const updateUserProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: "UPDATE_PROFILE_REQUEST" });

		const { data } = await axios.put(
			`${BACKEND_URL}api/v1/user/profile/update`,
			userData,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			},
		);

		dispatch({
			type: "UPDATE_PROFILE_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "UPDATE_PROFILE_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const deleteUserAccount = (id) => async (dispatch) => {
	try {
		dispatch({ type: "DELETE_USER_REQUEST" });

		const { data } = await axios.delete(`${URL}/delete/${id}`, {
			withCredentials: true,
		});

		dispatch({
			type: "DELETE_USER_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "DELETE_USER_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_ALL_USERS_REQUEST" });

		const { data } = await axios.get(`${URL}/all`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_ALL_USERS_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_ALL_USERS_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const getUserProfile = () => async (dispatch) => {
	try {
		dispatch({ type: "GET_USER_PROFILE_REQUEST" });

		const { data } = await axios.get(`${URL}/profile`, {
			withCredentials: true,
		});

		dispatch({
			type: "GET_USER_PROFILE_SUCCESS",
			payload: {
				message: data.message,
				data: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "GET_USER_PROFILE_FAILURE",
			payload: error.response?.data?.message || "Something went wrong",
		});
	}
};

export const adminLogin= (details) => async (dispatch) => {
	try {
		dispatch({
			type: "ADMIN_LOGIN_REQUEST",
		});

		const { data } = await axios.post(`${BACKEND_URL}api/v1/admin/login`, details, {
			headers: {
				"content-Type": "application/json",
			},
			withCredentials: true,
		});

		dispatch({
			type: "ADMIN_LOGIN_SUCCESS",
			payload: {
				message: data.message,
				id: data.data,
			},
		});
	} catch (error) {
		dispatch({
			type: "ADMIN_LOGIN_FAILURE",
			payload: error.response?.data?.message,
		});
	}
}

export const adminLogout= () => async (dispatch) => {
	try {
		dispatch({
			type: "ADMIN_LOGOUT_REQUEST",
		});
		const { data } = await axios.get(`${BACKEND_URL}api/v1/admin/logout`, {
			withCredentials: true,
		});
		dispatch({
			type: "ADMIN_LOGOUT_SUCCESS",
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: "ADMIN_LOGOUT_FAILURE",
			payload: error.response?.data?.message,
		});
	}
}