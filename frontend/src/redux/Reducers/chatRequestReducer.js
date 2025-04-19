import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	message: null,
	requests: [],
	request: null,
};

const createChatRequest = createAction("CREATE_CHAT_REQUEST");
const createChatSuccess = createAction("CREATE_CHAT_SUCCESS");
const createChatFailure = createAction("CREATE_CHAT_FAILURE");

const getAllRequestsRequest = createAction("GET_ALL_REQUESTS_REQUEST");
const getAllRequestsSuccess = createAction("GET_ALL_REQUESTS_SUCCESS");
const getAllRequestsFailure = createAction("GET_ALL_REQUESTS_FAILURE");

const getRequestByUserIdRequest = createAction(
	"GET_REQUEST_BY_USER_ID_REQUEST",
);
const getRequestByUserIdSuccess = createAction(
	"GET_REQUEST_BY_USER_ID_SUCCESS",
);
const getRequestByUserIdFailure = createAction(
	"GET_REQUEST_BY_USER_ID_FAILURE",
);

const updateRequestRequest = createAction("UPDATE_REQUEST_REQUEST");
const updateRequestSuccess = createAction("UPDATE_REQUEST_SUCCESS");
const updateRequestFailure = createAction("UPDATE_REQUEST_FAILURE");

const getRequestByCategoryRequest = createAction(
	"GET_REQUEST_BY_CATEGORY_REQUEST",
);
const getRequestByCategorySuccess = createAction(
	"GET_REQUEST_BY_CATEGORY_SUCCESS",
);
const getRequestByCategoryFailure = createAction(
	"GET_REQUEST_BY_CATEGORY_FAILURE",
);

const getRequestByIdRequest = createAction("GET_REQUEST_BY_ID_REQUEST");
const getRequestByIdSuccess = createAction("GET_REQUEST_BY_ID_SUCCESS");
const getRequestByIdFailure = createAction("GET_REQUEST_BY_ID_FAILURE");

const deleteRequestRequest = createAction("DELETE_REQUEST_REQUEST");
const deleteRequestSuccess = createAction("DELETE_REQUEST_SUCCESS");
const deleteRequestFailure = createAction("DELETE_REQUEST_FAILURE");

const acceptRequestRequest = createAction("ACCEPT_REQUEST_REQUEST");
const acceptRequestSuccess = createAction("ACCEPT_REQUEST_SUCCESS");
const acceptRequestFailure = createAction("ACCEPT_REQUEST_FAILURE");

const getRequestsByVolunteerCategoryRequest = createAction(
	"GET_REQUESTS_BY_VOLUNTEER_CATEGORY_REQUEST",
);
const getRequestsByVolunteerCategorySuccess = createAction(
	"GET_REQUESTS_BY_VOLUNTEER_CATEGORY_SUCCESS",
);
const getRequestsByVolunteerCategoryFailure = createAction(
	"GET_REQUESTS_BY_VOLUNTEER_CATEGORY_FAILURE",
);

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const chatRequestReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(createChatRequest, (state) => {
			state.loading = true;
		})
		.addCase(createChatSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.chatRequest = action.payload.data;
		})
		.addCase(createChatFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getAllRequestsRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllRequestsSuccess, (state, action) => {
			state.loading = false;
			state.requests = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getAllRequestsFailure, (state) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getRequestByUserIdRequest, (state) => {
			state.loading = true;
		})
		.addCase(getRequestByUserIdSuccess, (state, action) => {
			state.loading = false;
			state.requestByUser = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getRequestByUserIdFailure, (state) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(updateRequestRequest, (state) => {
			state.loading = true;
		})
		.addCase(updateRequestSuccess, (state, action) => {
			state.loading = false;
			state.request = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(updateRequestFailure, (state) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getRequestByCategoryRequest, (state) => {
			state.loading = true;
		})
		.addCase(getRequestByCategorySuccess, (state, action) => {
			state.loading = false;
			state.requestByCategory = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getRequestByCategoryFailure, (state) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getRequestByIdRequest, (state) => {
			state.loading = true;
		})
		.addCase(getRequestByIdSuccess, (state, action) => {
			state.loading = false;
			state.requestById = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getRequestByIdFailure, (state) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(deleteRequestRequest, (state) => {
			state.loading = true;
		})
		.addCase(deleteRequestSuccess, (state, action) => {
			state.loading = false;
			state.request = null;
			state.message = action.payload.message;
		})
		.addCase(deleteRequestFailure, (state) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(acceptRequestRequest, (state) => {
			state.loading = true;
		})
		.addCase(acceptRequestSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
		})
		.addCase(acceptRequestFailure, (state) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getRequestsByVolunteerCategoryRequest, (state) => {
			state.loading = true;
		})
		.addCase(getRequestsByVolunteerCategorySuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.requests = action.payload.data;
		})
		.addCase(getRequestsByVolunteerCategoryFailure, (state, action) => {
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
