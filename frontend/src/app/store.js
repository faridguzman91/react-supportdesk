import { configureStore } from "@reduxjs/toolkit";
// // import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/Auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
  },
});
