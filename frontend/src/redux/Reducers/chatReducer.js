import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {};

const createChatRequest = createAction("CREATE_CHAT_REQUEST");
const createChatSuccess = createAction("CREATE_CHAT_SUCCESS");
const createChatFailure = createAction("CREATE_CHAT_FAILURE");

const getUserChatRequest = createAction("GET_USER_CHAT_REQUEST");
const getUserChatSuccess = createAction("GET_USER_CHAT_SUCCESS");
const getUserChatFailure = createAction("GET_USER_CHAT_FAILURE");

const getVolunteerChatRequest = createAction("GET_VOLUNTEER_CHAT_REQUEST");
const getVolunteerChatSuccess = createAction("GET_VOLUNTEER_CHAT_SUCCESS");
const getVolunteerChatFailure = createAction("GET_VOLUNTEER_CHAT_FAILURE");

const getChatByIdRequest = createAction("GET_CHAT_BY_ID_REQUEST");
const getChatByIdSuccess = createAction("GET_CHAT_BY_ID_SUCCESS");
const getChatByIdFailure = createAction("GET_CHAT_BY_ID_FAILURE");

const updateChatStatusRequest = createAction("UPDATE_CHAT_STATUS_REQUEST");
const updateChatStatusSuccess = createAction("UPDATE_CHAT_STATUS_SUCCESS");
const updateChatStatusFailure = createAction("UPDATE_CHAT_STATUS_FAILURE");

const getAllChatsRequest = createAction("GET_ALL_CHATS_REQUEST");
const getAllChatsSuccess = createAction("GET_ALL_CHATS_SUCCESS");
const getAllChatsFailure = createAction("GET_ALL_CHATS_FAILURE");

const deleteChatRequest = createAction("DELETE_CHAT_REQUEST");
const deleteChatSuccess = createAction("DELETE_CHAT_SUCCESS");
const deleteChatFailure = createAction("DELETE_CHAT_FAILURE");

const clearError = createAction("CLEAR_ERROR");
const clearMessage = createAction("CLEAR_MESSAGE");

export const chatReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(createChatRequest, (state) => {
			state.loading = true;
		})
		.addCase(createChatSuccess, (state, action) => {
			state.loading = false;
			state.chat = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(createChatFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getUserChatRequest, (state) => {
			state.loading = true;
		})
		.addCase(getUserChatSuccess, (state, action) => {
			state.loading = false;
			state.userChats = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getUserChatFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getVolunteerChatRequest, (state) => {
			state.loading = true;
		})
		.addCase(getVolunteerChatSuccess, (state, action) => {
			state.loading = false;
			state.volunteerChats = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getVolunteerChatFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(getChatByIdRequest, (state) => {
			state.loading = true;
		})
		.addCase(getChatByIdSuccess, (state, action) => {
			state.loading = false;
			state.chatDetails = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getChatByIdFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})
		.addCase(updateChatStatusRequest, (state) => {
			state.loading = true;
		})
		.addCase(updateChatStatusSuccess, (state, action) => {
			state.loading = false;
			state.chatStatus = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(updateChatStatusFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(getAllChatsRequest, (state) => {
			state.loading = true;
		})
		.addCase(getAllChatsSuccess, (state, action) => {
			state.loading = false;
			state.allChats = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(getAllChatsFailure, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		})

		.addCase(deleteChatRequest, (state) => {
			state.loading = true;
		})
		.addCase(deleteChatSuccess, (state, action) => {
			state.loading = false;
			state.deletedChat = action.payload.data;
			state.message = action.payload.message;
		})
		.addCase(deleteChatFailure, (state, action) => {
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
