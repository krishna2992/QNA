import { combineReducers } from "redux";
import authReducer from "./auth.js";
import { currentUserReducer } from "./currentUser.js";
import { questionsReducer } from "./Questions.js";
import usersReducer from "./users.js";
import planReducer from "./planReducer.js";

export default combineReducers({authReducer, currentUserReducer, questionsReducer, usersReducer, planReducer})