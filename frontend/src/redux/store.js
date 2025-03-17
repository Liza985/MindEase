import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { volunteerReducer } from "./Reducers/volunteerReducer";
import { blogReducer } from "./Reducers/blogReducer";
import { reviewReducer } from './Reducers/reviewReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    volunteer: volunteerReducer,
    blog:blogReducer,
    review:reviewReducer,
    
  }
});

export default store;