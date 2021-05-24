import { combineReducers } from "redux";
import userFileReducer from "./userFileReducer";

export const rootReducer = combineReducers({
  userFileReducer,
});
