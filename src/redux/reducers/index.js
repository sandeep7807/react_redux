import { combineReducers } from "redux";
import films from "./films";
// We can combine mutiple reducers using combineReducers
export default combineReducers({ films });
