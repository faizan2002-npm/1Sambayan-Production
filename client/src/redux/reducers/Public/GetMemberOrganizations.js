import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  parties: [],
  error: "",
};

const slice = createSlice({
  name: "PARTIES",
  initialState,
  reducers: {
    loadingParties: (state, action) => {
      state.loading = action.payload;
    },
    setParties: (state, action) => {
      state.parties = action.payload;
    },
    getPartiesError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { loadingParties, setParties, getPartiesError } = slice.actions;