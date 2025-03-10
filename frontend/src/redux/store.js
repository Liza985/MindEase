import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { volunteerReducer } from "./Reducers/volunteerReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here
    volunteer: volunteerReducer,
  }
});

export default store;