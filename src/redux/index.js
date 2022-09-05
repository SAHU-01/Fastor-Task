import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/authslice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
  },
});
