import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import { initialState } from "./initialState";
import thunk from "redux-thunk";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
