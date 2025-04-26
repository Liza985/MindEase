import { createAction, createReducer } from "@reduxjs/toolkit";
const initialState = {};

const surveyCreateRequest = createAction("CREATE_SURVEY_REQUEST");
const surveyCreateSuccess = createAction("CREATE_SURVEY_SUCCESS");
const surveyCreateFailure = createAction("CREATE_SURVEY_FAILURE");

const getAllSurveysRequest = createAction("GET_ALL_SURVEYS_REQUEST");
const getAllSurveysSuccess = createAction("GET_ALL_SURVEYS_SUCCESS");
const getAllSurveysFailure = createAction("GET_ALL_SURVEYS_FAILURE");

const getSurveyByIdRequest = createAction("GET_SURVEY_BY_ID_REQUEST");
const getSurveyByIdSuccess = createAction("GET_SURVEY_BY_ID_SUCCESS");
const getSurveyByIdFailure = createAction("GET_SURVEY_BY_ID_FAILURE");

const getSurveyByUserIdRequest = createAction("GET_SURVEY_BY_USER_ID_REQUEST");
const getSurveyByUserIdSuccess = createAction("GET_SURVEY_BY_USER_ID_SUCCESS");
const getSurveyByUserIdFailure = createAction("GET_SURVEY_BY_USER_ID_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const surveyReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(surveyCreateRequest, (state) => {
			state.loading = true;
		})
		.addCase(surveyCreateSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.survey = action.payload.data;
		})
		.addCase(surveyCreateFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getAllSurveysRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllSurveysSuccess, (state, action) => {
			state.loading = false;
			state.surveys = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getAllSurveysFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getSurveyByIdRequest, (state) => {
			state.loading = true;
		})
		.addCase(getSurveyByIdSuccess, (state, action) => {
			state.loading = false;
			state.surveyById = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getSurveyByIdFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getSurveyByUserIdRequest, (state) => {
			state.loading = true;
		})
		.addCase(getSurveyByUserIdSuccess, (state, action) => {
			state.loading = false;
			state.surveysByUser = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getSurveyByUserIdFailure, (state, action) => {
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
