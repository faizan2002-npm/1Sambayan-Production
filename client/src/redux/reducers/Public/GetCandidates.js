import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    candidates: [],
    error: "",
};

const slice = createSlice({
    name: "CANDIDATES",
    initialState,
    reducers: {
        loadingCandidates: (state, action) => {
            state.loading = action.payload;
        },
        setCandidates: (state, action) => {
            state.candidates = action.payload;
        },
        getCandidatesError: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        },
    },
});

export default slice.reducer;
export const { loadingCandidates, setCandidates, getCandidatesError } = slice.actions;