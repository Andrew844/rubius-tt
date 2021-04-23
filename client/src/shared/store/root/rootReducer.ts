import { combineReducers } from "redux";
import { usersReducer } from "../../../pages/usersPage/store/reducer";
import { organisationsReducer } from "../organisationsStore/reducer";

export const rootReducer = combineReducers({
  users: usersReducer,
  organisations: organisationsReducer,
});
