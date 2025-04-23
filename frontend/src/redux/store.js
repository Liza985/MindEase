import { configureStore } from "@reduxjs/toolkit";
import { contentReducer } from "./Reducers/activityReducer";
import { blogReducer } from "./Reducers/blogReducer";
import { chatReducer } from "./Reducers/chatReducer";
import { chatRequestReducer } from "./Reducers/chatRequestReducer";
import { feedbackReducer } from "./Reducers/feedbackReducer";
import { reviewReducer } from "./Reducers/reviewReducer";
import { userReducer } from "./Reducers/userReducer";
import { volunteerReducer } from "./Reducers/volunteerReducer";

const store = configureStore({
	reducer: {
		user: userReducer,
		volunteer: volunteerReducer,
		blog: blogReducer,
		review: reviewReducer,
		feedback: feedbackReducer,
		content: contentReducer,
		chatRequest: chatRequestReducer,
		chat: chatReducer,
	},
});

export default store;
