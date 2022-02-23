import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//initial states

//example

//docs:

//https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-createslice

// const initialState = [];

// const todosSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     todoAdded(state, action) {
//       // ✅ This "mutating" code is okay inside of createSlice!
//       state.push(action.payload);
//     },
//     todoToggled(state, action) {
//       const todo = state.find((todo) => todo.id === action.payload);
//       todo.completed = !todo.completed;
//     },
//     todosLoading(state, action) {
//       return {
//         ...state,
//         status: "loading",
//       };
//     },
//   },
// });

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  //how to change state when registering is done

  extraReducers: (builder) => {},
});

export default authSlice.reducer;
