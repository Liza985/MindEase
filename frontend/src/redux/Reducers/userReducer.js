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


const clearError = createAction("CLEAR_ERROR");
const clearAuthError = createAction("CLEAR_AUTH_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");


export const userReducer=createReducer(initialState,(builder)=>{
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
			.addCase(clearError, (state) => {
				state.error = null;
			})
			.addCase(clearMessage, (state) => {
				state.message = null;
			});
    
})