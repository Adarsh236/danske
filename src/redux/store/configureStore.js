import thunk from "redux-thunk";
//import logger from "redux-logger";
import { rootReducer } from "../reducers/index";
import { createStore, applyMiddleware, compose } from "redux";

const preloadedState = {};

let middleware = applyMiddleware(thunk);

const configureStore = () => {
  return {
    ...createStore(rootReducer, preloadedState, compose(middleware)),
  };
};

export default configureStore;
