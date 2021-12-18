import { combineReducers } from "redux";
import GetPosts from "./Public/GetPosts";
import GetEvents from "./Public/GetEvents";
import GetMemberOrganizations from "./Public/GetMemberOrganizations";
import GetChapters from "./Public/GetChapters";
import GetConvenors from "./Public/GetConvenors";
import GetCandidates from "./Public/GetCandidates";
export const reducers = combineReducers({
    POSTS: GetPosts,
    EVENTS: GetEvents,
    PARTIES: GetMemberOrganizations,
    CHAPTERS: GetChapters,
    CONVENORS: GetConvenors,
    CANDIDATES: GetCandidates,
});