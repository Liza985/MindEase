import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {};

const volunteerLoginRequest = createAction("VOLUNTEER_LOGIN_REQUEST");
const volunteerLoginSuccess = createAction("VOLUNTEER_LOGIN_SUCCESS");
const volunteerLoginFailure = createAction("VOLUNTEER_LOGIN_FAILURE");

const volunteerRegisterRequest = createAction("VOLUNTEER_REGISTER_REQUEST");
const volunteerRegisterSuccess = createAction("VOLUNTEER_REGISTER_SUCCESS");
const volunteerRegisterFailure = createAction("VOLUNTEER_REGISTER_FAILURE");

const volunteerRegisterOtpRequest = createAction(
	"VOLUNTEER_REGISTER_OTP_REQUEST",
);
const volunteerRegisterOtpSuccess = createAction(
	"VOLUNTEER_REGISTER_OTP_SUCCESS",
);
const volunteerRegisterOtpFailure = createAction(
	"VOLUNTEER_REGISTER_OTP_FAILURE",
);

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
	"FORGOT_VOLUNTEER_PASSWORD_REQUEST",
);
const forgotVolunteerPasswordSuccess = createAction(
	"FORGOT_VOLUNTEER_PASSWORD_SUCCESS",
);
const forgotVolunteerPasswordFailure = createAction(
	"FORGOT_VOLUNTEER_PASSWORD_FAILURE",
);

const resetVolunteerPasswordRequest = createAction(
	"RESET_VOLUNTEER_PASSWORD_REQUEST",
);
const resetVolunteerPasswordSuccess = createAction(
	"RESET_VOLUNTEER_PASSWORD_SUCCESS",
);
const resetVolunteerPasswordFailure = createAction(
	"RESET_VOLUNTEER_PASSWORD_FAILURE",
);

const changeVolunteerPasswordRequest = createAction(
	"CHANGE_VOLUNTEER_PASSWORD_REQUEST",
);
const changeVolunteerPasswordSuccess = createAction(
	"CHANGE_VOLUNTEER_PASSWORD_SUCCESS",
);
const changeVolunteerPasswordFailure = createAction(
	"CHANGE_VOLUNTEER_PASSWORD_FAILURE",
);

const logoutVolunteerRequest = createAction("LOGOUT_VOLUNTEER_REQUEST");
const logoutVolunteerSuccess = createAction("LOGOUT_VOLUNTEER_SUCCESS");
const logoutVolunteerFailure = createAction("LOGOUT_VOLUNTEER_FAILURE");

const updateVolunteerProfileRequest = createAction(
	"UPDATE_VOLUNTEER_PROFILE_REQUEST",
);
const updateVolunteerProfileSuccess = createAction(
	"UPDATE_VOLUNTEER_PROFILE_SUCCESS",
);
const updateVolunteerProfileFailure = createAction(
	"UPDATE_VOLUNTEER_PROFILE_FAILURE",
);

const getVolunteerProfileRequest = createAction(
	"GET_VOLUNTEER_PROFILE_REQUEST",
);
const getVolunteerProfileSuccess = createAction(
	"GET_VOLUNTEER_PROFILE_SUCCESS",
);
const getVolunteerProfileFailure = createAction(
	"GET_VOLUNTEER_PROFILE_FAILURE",
);

const getAllVolunteersRequest = createAction("GET_ALL_VOLUNTEERS_REQUEST");
const getAllVolunteersSuccess = createAction("GET_ALL_VOLUNTEERS_SUCCESS");
const getAllVolunteersFailure = createAction("GET_ALL_VOLUNTEERS_FAILURE");



const deleteVolunteerRequest = createAction("DELETE_VOLUNTEER_REQUEST");
const deleteVolunteerSuccess = createAction("DELETE_VOLUNTEER_SUCCESS");
const deleteVolunteerFailure = createAction("DELETE_VOLUNTEER_FAILURE");

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
			state.message = action.payload.message;
			state.id = action.payload.id;
			state.isVolAuthenticated = true;
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
			state.isVolAuthenticated = true;
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
			state.isVolAuthenticated = false;
			state.volunteer = null;
		})
		.addCase(logoutVolunteerFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(updateVolunteerProfileRequest, (state) => {
			state.loading = true;
		})
		.addCase(updateVolunteerProfileSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.volunteer = action.payload.data;
		})
		.addCase(updateVolunteerProfileFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getVolunteerProfileRequest, (state) => {
			state.loading = true;
		})
		.addCase(getVolunteerProfileSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.isVolAuthenticated = true;
			state.volunteer = action.payload.data;
		})
		.addCase(getVolunteerProfileFailure, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.error = action.payload;
		})

		.addCase(getAllVolunteersRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllVolunteersSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.volunteers = action.payload.data;
		})
		.addCase(getAllVolunteersFailure, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.error = action.payload;
		})

		.addCase(deleteVolunteerRequest, (state) => {
			state.loading = true;
		})
		.addCase(deleteVolunteerSuccess, (state, action) => {
			state.loading = false;
			state.volunteer = null;
			state.message = action.payload;
		})
		.addCase(deleteVolunteerFailure, (state, action) => {
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
