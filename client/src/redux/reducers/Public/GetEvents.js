import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  events: [],
  error: "",
};

const slice = createSlice({
  name: "EVENTS",
  initialState,
  reducers: {
    loadingEvents: (state, action) => {
      state.loading = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    getEventsError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { loadingEvents, setEvents, getEventsError } = slice.actions;