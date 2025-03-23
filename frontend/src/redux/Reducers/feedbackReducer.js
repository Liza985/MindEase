import { createAction, createReducer } from "@reduxjs/toolkit";

const initialFeedbackState = {};

const createUserFeedbackRequest = createAction("CREATE_USER_FEEDBACK_REQUEST");
const createUserFeedbackSuccess = createAction("CREATE_USER_FEEDBACK_SUCCESS"); 
const createUserFeedbackFailure = createAction("CREATE_USER_FEEDBACK_FAILURE");

const getAllUserFeedbacksRequest = createAction("GET_ALL_USER_FEEDBACKS_REQUEST");
const getAllUserFeedbacksSuccess = createAction("GET_ALL_USER_FEEDBACKS_SUCCESS");
const getAllUserFeedbacksFailure = createAction("GET_ALL_USER_FEEDBACKS_FAILURE");

const clearFeedbackError = createAction("CLEAR_FEEDBACK_ERROR");
const clearFeedbackMessage = createAction("CLEAR_FEEDBACK_MESSAGE");

export const feedbackReducer = createReducer(initialFeedbackState, (builder) => {
	builder
		.addCase(createUserFeedbackRequest, (state) => {
			state.loading = true;
		})
		.addCase(createUserFeedbackSuccess, (state, action) => {
			state.loading = false;
			state.userFeedback = action.payload.data;
			state.feedbackMessage = action.payload.message;
		})
		.addCase(createUserFeedbackFailure, (state, action) => {
			state.loading = false;
			state.feedbackError = action.payload;
		})
		.addCase(getAllUserFeedbacksRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllUserFeedbacksSuccess, (state, action) => {
			state.loading = false;
			state.userFeedbacks = action.payload.data;
			state.feedbackMessage = action.payload.message;
		})
		.addCase(getAllUserFeedbacksFailure, (state, action) => {
			state.loading = false;
			state.feedbackError = action.payload;
		})
		.addCase(clearFeedbackError, (state) => {
			state.feedbackError = null;
		})
		.addCase(clearFeedbackMessage, (state) => {
			state.feedbackMessage = null;
		});
});
