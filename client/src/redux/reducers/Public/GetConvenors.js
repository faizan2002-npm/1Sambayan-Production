import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  convenors: [],
  error: "",
};

const slice = createSlice({
  name: "CONVENORS",
  initialState,
  reducers: {
    loadingConvenors: (state, action) => {
      state.loading = action.payload;
    },
    setConvenors: (state, action) => {
      state.convenors = action.payload;
    },
    getConvenorsError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { loadingConvenors, setConvenors, getConvenorsError } = slice.actions;