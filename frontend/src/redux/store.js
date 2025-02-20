import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here
  }
});

export default store;