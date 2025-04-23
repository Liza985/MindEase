import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const addContentRequest = createAction("ADD_CONTENT_REQUEST");
const addContentSuccess = createAction("ADD_CONTENT_SUCCESS");
const addContentFailure = createAction("ADD_CONTENT_FAILURE");

const deleteContentRequest = createAction("DELETE_CONTENT_REQUEST");
const deleteContentSuccess = createAction("DELETE_CONTENT_SUCCESS");
const deleteContentFailure = createAction("DELETE_CONTENT_FAILURE");

const updateContentRequest = createAction("UPDATE_CONTENT_REQUEST");
const updateContentSuccess = createAction("UPDATE_CONTENT_SUCCESS");
const updateContentFailure = createAction("UPDATE_CONTENT_FAILURE");

const getAllContentRequest = createAction("GET_ALL_CONTENT_REQUEST");
const getAllContentSuccess = createAction("GET_ALL_CONTENT_SUCCESS");
const getAllContentFailure = createAction("GET_ALL_CONTENT_FAILURE");

const getContentByIdRequest = createAction("GET_CONTENT_BY_ID_REQUEST");
const getContentByIdSuccess = createAction("GET_CONTENT_BY_ID_SUCCESS");
const getContentByIdFailure = createAction("GET_CONTENT_BY_ID_FAILURE");

const getContentByCategoryRequest = createAction(
	"GET_CONTENT_BY_CATEGORY_REQUEST",
);
const getContentByCategorySuccess = createAction(
	"GET_CONTENT_BY_CATEGORY_SUCCESS",
);
const getContentByCategoryFailure = createAction(
	"GET_CONTENT_BY_CATEGORY_FAILURE",
);

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const contentReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(addContentRequest, (state) => {
			state.loading = true;
		})
		.addCase(addContentSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.contentItems.push(action.payload.data);
		})
		.addCase(addContentFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(deleteContentRequest, (state) => {
			state.loading = true;
		})
		.addCase(deleteContentSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload;
			state.contentItems = state.contentItems.filter(
				(item) => item._id !== action.payload,
			);
		})
		.addCase(deleteContentFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(updateContentRequest, (state) => {
			state.loading = true;
		})
		.addCase(updateContentSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.contentItems = state.contentItems.map((item) =>
				item._id === action.payload.data._id ? action.payload.data : item,
			);
		})
		.addCase(updateContentFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getAllContentRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllContentSuccess, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.contentItems = action.payload.data;
		})
		.addCase(getAllContentFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getContentByIdRequest, (state) => {
			state.loading = true;
		})
		.addCase(getContentByIdSuccess, (state, action) => {
			state.loading = false;
			state.contentById = action.payload.data;
		})
		.addCase(getContentByIdFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getContentByCategoryRequest, (state) => {
			state.loading = true;
		})
		.addCase(getContentByCategorySuccess, (state, action) => {
			state.loading = false;
			state.contentByCategory = action.payload.data;
		})
		.addCase(getContentByCategoryFailure, (state, action) => {
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
