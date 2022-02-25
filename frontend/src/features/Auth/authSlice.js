/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

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

//get user from local storage

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//pass in user form, and thunk API

//register new userss

//try catch return

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // console.log(user)

    try {
      return await authService.register(user);
    } catch (error) {
      //look for error messages in:
      //call error when errors in requesting

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // rejectWithValue: a utility that helps customize the contents of a rejected action if the thunk receives an error.

      //state.message = payload: rejectWithValue(message)

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login users

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  // console.log(user)
   try {
     return await authService.login(user);
   } catch (error) {
     //look for error messages in:
     //call error when errors in requesting

     const message =
       (error.response && error.response.data && error.response.data.message) ||
       error.message ||
       error.toString();

     // rejectWithValue: a utility that helps customize the contents of a rejected action if the thunk receives an error.

     //state.message = payload: rejectWithValue(message)

     return thunkAPI.rejectWithValue(message);
   }

});

export const logout = createAsyncThunk('auth/logout' , async () => {
  await authService.logout()

} )

export const authSlice = createSlice({
  name: "auth",
  initialState,

  //create reset for auth

  // default states to default
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  //how to change state when registering is done

  //catch Actions whenever they happen

  //docs

  //https://redux-toolkit.js.org/api/createslice#the-extrareducers-builder-callback-notation

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //user state went wrong, default
        //reject with value
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        //user state went wrong, default
        //reject with value
        state.message = action.payload;
        state.user = null;
      }).addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

//when you create an action , export is as actions
export const { reset } = authSlice.actions;

export default authSlice.reducer;
