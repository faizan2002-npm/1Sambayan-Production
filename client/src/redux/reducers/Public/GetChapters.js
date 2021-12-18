import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  communities: [],
  error: "",
};

const slice = createSlice({
  name: "CHAPTERS",
  initialState,
  reducers: {
    loadingChapters: (state, action) => {
      state.loading = action.payload;
    },
    setChapters: (state, action) => {
      state.communities = action.payload;
    },
    getChaptersError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { loadingChapters, setChapters, getChaptersError } = slice.actions;