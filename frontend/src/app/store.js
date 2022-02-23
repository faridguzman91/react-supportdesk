import { configureStore } from "@reduxjs/toolkit";
// // import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/Auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});
