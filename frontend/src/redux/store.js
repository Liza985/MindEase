import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { volunteerReducer } from "./Reducers/volunteerReducer";
import { blogReducer } from "./Reducers/blogReducer";
import { reviewReducer } from "./Reducers/reviewReducer";
import { feedbackReducer } from "./Reducers/feedbackReducer";
import { chatRequestReducer } from "./Reducers/chatRequestReducer";

const store = configureStore({
	reducer: {
		user: userReducer,
		volunteer: volunteerReducer,
		blog: blogReducer,
		review: reviewReducer,
		feedback: feedbackReducer,
		chatRequest:chatRequestReducer
	},
});

export default store;
