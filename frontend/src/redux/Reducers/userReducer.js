import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {};

const userLoginRequest = createAction("USER_LOGIN_REQUEST");
const userLoginSuccess = createAction("USER_LOGIN_SUCCESS");
const userLoginFailure = createAction("USER_LOGIN_FAILURE");

const userRegisterRequest = createAction("USER_REGISTER_REQUEST");
const userRegisterSuccess = createAction("USER_REGISTER_SUCCESS");
const userRegisterFailure = createAction("USER_REGISTER_FAILURE");

const RegisterOtpRequest = createAction("REGISTER_OTP_REQUEST");
const RegisterOtpSuccess = createAction("REGISTER_OTP_SUCCESS");
const RegisterOtpFailure = createAction("REGISTER_OTP_FAILURE");

const ResendRegisterOtpRequest = createAction("RESEND_REGISTER_OTP_REQUEST");
const ResendRegisterOtpSuccess = createAction("RESEND_REGISTER_OTP_SUCCESS");
const ResendRegisterOtpFailure = createAction("RESEND_REGISTER_OTP_FAILURE");

const forgotUserPasswordRequest = createAction("FORGOT_USER_PASSWORD_REQUEST");
const forgotUserPasswordSuccess = createAction("FORGOT_USER_PASSWORD_SUCCESS");
const forgotUserPasswordFailure = createAction("FORGOT_USER_PASSWORD_FAILURE");

const resetUserPasswordRequest = createAction("RESET_USER_PASSWORD_REQUEST");
const resetUserPasswordSuccess = createAction("RESET_USER_PASSWORD_SUCCESS");
const resetUserPasswordFailure = createAction("RESET_USER_PASSWORD_FAILURE");

const changeUserPasswordRequest = createAction("CHANGE_USER_PASSWORD_REQUEST");
const changeUserPasswordSuccess = createAction("CHANGE_USER_PASSWORD_SUCCESS");
const changeUserPasswordFailure = createAction("CHANGE_USER_PASSWORD_FAILURE");

const logoutUserRequest = createAction("LOGOUT_USER_REQUEST");
const logoutUserSuccess = createAction("LOGOUT_USER_SUCCESS");
const logoutUserFailure = createAction("LOGOUT_USER_FAILURE");

const getAllUsersRequest = createAction("GET_ALL_USERS_REQUEST");
const getAllUsersSuccess = createAction("GET_ALL_USERS_SUCCESS");
const getAllUsersFailure = createAction("GET_ALL_USERS_FAILURE");

const getUserProfileRequest = createAction("GET_USER_PROFILE_REQUEST");
const getUserProfileSuccess = createAction("GET_USER_PROFILE_SUCCESS");		
const getUserProfileFailure = createAction("GET_USER_PROFILE_FAILURE");

const adminLoginRequest = createAction("ADMIN_LOGIN_REQUEST");
const adminLoginSuccess = createAction("ADMIN_LOGIN_SUCCESS");
const adminLoginFailure = createAction("ADMIN_LOGIN_FAILURE");

const adminLogoutRequest = createAction("ADMIN_LOGOUT_REQUEST");
const adminLogoutSuccess = createAction("ADMIN_LOGOUT_SUCCESS");
const adminLogoutFailure = createAction("ADMIN_LOGOUT_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const userReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(userLoginRequest, (state) => {
			state.loading = true;
		})
		.addCase(userLoginSuccess, (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(userLoginFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(userRegisterRequest, (state) => {
			state.loading = true;
		})
		.addCase(userRegisterSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(userRegisterFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(RegisterOtpRequest, (state) => {
			state.loading = true;
		})
		.addCase(RegisterOtpSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
			state.isAuthenticated = true;
		})
		.addCase(RegisterOtpFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(ResendRegisterOtpRequest, (state) => {
			state.loading = true;
		})
		.addCase(ResendRegisterOtpSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(ResendRegisterOtpFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(forgotUserPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(forgotUserPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(forgotUserPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(resetUserPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(resetUserPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(resetUserPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(changeUserPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(changeUserPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(changeUserPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(logoutUserRequest, (state) => {
			state.loading = true;
		})
		.addCase(logoutUserSuccess, (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.message = action.payload;
		})
		.addCase(logoutUserFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getAllUsersRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllUsersSuccess, (state, action) => {
			state.loading = false;
			state.users = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getAllUsersFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(clearError, (state) => {
			state.error = null;
		})
		.addCase(clearMessage, (state) => {
			state.message = null;
		})

		.addCase("UPDATE_PROFILE_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("UPDATE_PROFILE_SUCCESS", (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.data;
		})
		.addCase("UPDATE_PROFILE_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase("DELETE_USER_REQUEST", (state) => {
			state.loading = true;
		})
		.addCase("DELETE_USER_SUCCESS", (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
			state.message = action.payload;
		})
		.addCase("DELETE_USER_FAILURE", (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getUserProfileRequest, (state) => {
			state.loading = true;
		})
		.addCase(getUserProfileSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.user = action.payload.data;
			state.isAuthenticated = true;
		})
		.addCase(getUserProfileFailure, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.error = action.payload;
			state.isAuthenticated = false;
		})
		.addCase(adminLoginRequest, (state) => {
			state.loading = true;
		})
		.addCase(adminLoginSuccess, (state, action) => {
			state.loading = false;
			state.isadminAuthenticated = true;
			state.message = action.payload.message;
			state.admin = action.payload.admin;
		})
		.addCase(adminLoginFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(adminLogoutRequest, (state) => {
			state.loading = true;
		})
		.addCase(adminLogoutSuccess, (state) => {
			state.loading = false;
			state.isadminAuthenticated = false;
			state.admin = null;
		})
		.addCase(adminLogoutFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
});
