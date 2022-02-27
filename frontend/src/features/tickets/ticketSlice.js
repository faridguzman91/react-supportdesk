import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData, thunkAPI) => {
    // console.log(user)

    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
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

//get user tickets

export const getTickets = createAsyncThunk(
  "tickets/getAll",
  async (_, thunkAPI) => {
    // console.log(user)

    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.getTickets(token);
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

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    //state , actions , cases payload
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});



export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
