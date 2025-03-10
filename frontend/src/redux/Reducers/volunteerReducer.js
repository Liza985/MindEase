import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {};

const volunteerLoginRequest = createAction("VOLUNTEER_LOGIN_REQUEST");
const volunteerLoginSuccess = createAction("VOLUNTEER_LOGIN_SUCCESS");
const volunteerLoginFailure = createAction("VOLUNTEER_LOGIN_FAILURE");

const volunteerRegisterRequest = createAction("VOLUNTEER_REGISTER_REQUEST");
const volunteerRegisterSuccess = createAction("VOLUNTEER_REGISTER_SUCCESS");
const volunteerRegisterFailure = createAction("VOLUNTEER_REGISTER_FAILURE");

const volunteerRegisterOtpRequest = createAction("VOLUNTEER_REGISTER_OTP_REQUEST");
const volunteerRegisterOtpSuccess = createAction("VOLUNTEER_REGISTER_OTP_SUCCESS");
const volunteerRegisterOtpFailure = createAction("VOLUNTEER_REGISTER_OTP_FAILURE");

const ResendRegisterOtpRequest = createAction("RESEND_REGISTER_OTP_REQUEST");
const ResendRegisterOtpSuccess = createAction("RESEND_REGISTER_OTP_SUCCESS");
const ResendRegisterOtpFailure = createAction("RESEND_REGISTER_OTP_FAILURE");

const loadVolunteerRequest = createAction("LOAD_VOLUNTEER_REQUEST");
const loadVolunteerSuccess = createAction("LOAD_VOLUNTEER_SUCCESS");
const loadVolunteerFailure = createAction("LOAD_VOLUNTEER_FAILURE");

const volunteerLoginOtpRequest = createAction("VOLUNTEER_LOGIN_OTP_REQUEST");
const volunteerLoginOtpSuccess = createAction("VOLUNTEER_LOGIN_OTP_SUCCESS");
const volunteerLoginOtpFailure = createAction("VOLUNTEER_LOGIN_OTP_FAILURE");


const ResendLoginOtpRequest = createAction("RESEND_LOGIN_OTP_REQUEST");
const ResendLoginOtpSuccess = createAction("RESEND_LOGIN_OTP_SUCCESS");
const ResendLoginOtpFailure = createAction("RESEND_LOGIN_OTP_FAILURE");

const forgotVolunteerPasswordRequest = createAction(
	"FORGOT_VOLUNTEER_PASSWORD_REQUEST"
);
const forgotVolunteerPasswordSuccess = createAction(
	"FORGOT_VOLUNTEER_PASSWORD_SUCCESS"
);
const forgotVolunteerPasswordFailure = createAction(
	"FORGOT_VOLUNTEER_PASSWORD_FAILURE"
);

const resetVolunteerPasswordRequest = createAction(
	"RESET_VOLUNTEER_PASSWORD_REQUEST"
);
const resetVolunteerPasswordSuccess = createAction(
	"RESET_VOLUNTEER_PASSWORD_SUCCESS"
);
const resetVolunteerPasswordFailure = createAction(
	"RESET_VOLUNTEER_PASSWORD_FAILURE"
);

const changeVolunteerPasswordRequest = createAction(
	"CHANGE_VOLUNTEER_PASSWORD_REQUEST"
);
const changeVolunteerPasswordSuccess = createAction(
	"CHANGE_VOLUNTEER_PASSWORD_SUCCESS"
);
const changeVolunteerPasswordFailure = createAction(
	"CHANGE_VOLUNTEER_PASSWORD_FAILURE"
);

const logoutVolunteerRequest = createAction("LOGOUT_VOLUNTEER_REQUEST");
const logoutVolunteerSuccess = createAction("LOGOUT_VOLUNTEER_SUCCESS");
const logoutVolunteerFailure = createAction("LOGOUT_VOLUNTEER_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const volunteerReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(volunteerLoginRequest, (state) => {
			state.loading = true;
		})
		.addCase(volunteerLoginSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(volunteerLoginFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(volunteerRegisterRequest, (state) => {
			state.loading = true;
		})
		.addCase(volunteerRegisterSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(volunteerRegisterFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(volunteerRegisterOtpRequest, (state) => {
			state.loading = true;
		})
		.addCase(volunteerRegisterOtpSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
			state.isAuthenticated = true;
		})
		.addCase(volunteerRegisterOtpFailure, (state, action) => {
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

		.addCase(loadVolunteerRequest, (state) => {
			state.loading = true;
		})
		.addCase(loadVolunteerSuccess, (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.volunteer = action.payload;
		})
		.addCase(loadVolunteerFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(volunteerLoginOtpRequest, (state) => {
			state.loading = true;
		})
		.addCase(volunteerLoginOtpSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
			state.isAuthenticated = true;
		})
		.addCase(volunteerLoginOtpFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(ResendLoginOtpRequest, (state) => {
			state.loading = true;
		})
		.addCase(ResendLoginOtpSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(ResendLoginOtpFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(forgotVolunteerPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(forgotVolunteerPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.id = action.payload.id;
		})
		.addCase(forgotVolunteerPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(resetVolunteerPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(resetVolunteerPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(resetVolunteerPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(changeVolunteerPasswordRequest, (state) => {
			state.loading = true;
		})
		.addCase(changeVolunteerPasswordSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(changeVolunteerPasswordFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(logoutVolunteerRequest, (state) => {
			state.loading = true;
		})
		.addCase(logoutVolunteerSuccess, (state) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.volunteer = null;
		})
		.addCase(logoutVolunteerFailure, (state, action) => {
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
