import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

const slice = createSlice({
  name: "POSTS",
  initialState,
  reducers: {
    loadingPosts: (state, action) => {
      state.loading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    getPostsError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { loadingPosts, setPosts, getPostsError } = slice.actions;