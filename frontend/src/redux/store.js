import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { volunteerReducer } from "./Reducers/volunteerReducer";
import { blogReducer } from "./Reducers/blogReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    volunteer: volunteerReducer,
    blog:blogReducer,
  }
});

export default store;